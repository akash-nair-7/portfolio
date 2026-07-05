import hashlib
import json
import os
import re
from pathlib import Path
from typing import Any

import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, PointStruct, VectorParams
from rank_bm25 import BM25Okapi

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
PORTFOLIO_PATH = BASE_DIR / "portfolio.txt"
QDRANT_PATH = BASE_DIR / "qdrant_data"
INDEX_STATE_PATH = QDRANT_PATH / "index_state.json"
COLLECTION_NAME = "portfolio_chunks"

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
CHAT_MODEL = os.getenv("GEMINI_CHAT_MODEL", "gemini-2.5-flash")
EMBEDDING_MODEL = os.getenv("GEMINI_EMBEDDING_MODEL", "gemini-embedding-001")
TOP_K_RETRIEVAL = 8
TOP_K_RERANKED = 4

app = FastAPI(title="Aakash Portfolio RAG API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in os.getenv("CORS_ORIGIN", "http://localhost:8080").split(",")],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

qdrant = QdrantClient(path=str(QDRANT_PATH))
conversations: dict[str, list[dict[str, str]]] = {}
index_ready = False
bm25_ranker: BM25Okapi | None = None
bm25_chunks: list[str] = []


class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=2000)
    session_id: str | None = Field(default=None, alias="sessionId")

    model_config = {"populate_by_name": True}


def require_api_key() -> None:
    if not GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY is not set")


def load_document() -> str:
    if not PORTFOLIO_PATH.exists():
        raise RuntimeError(f"Portfolio document not found: {PORTFOLIO_PATH}")

    return PORTFOLIO_PATH.read_text(encoding="utf-8").strip()


def chunk_document(text: str, chunk_size: int = 900, overlap: int = 150) -> list[str]:
    paragraphs = [paragraph.strip() for paragraph in re.split(r"\n\s*\n", text) if paragraph.strip()]
    chunks: list[str] = []
    current = ""

    for paragraph in paragraphs:
        candidate = f"{current}\n\n{paragraph}".strip() if current else paragraph

        if len(candidate) <= chunk_size:
            current = candidate
            continue

        if current:
            chunks.append(current)
            current = f"{current[-overlap:]}\n\n{paragraph}".strip()

        while len(current) > chunk_size:
            split_at = current.rfind(" ", 0, chunk_size)
            split_at = split_at if split_at > 0 else chunk_size
            chunks.append(current[:split_at].strip())
            current = current[max(0, split_at - overlap):].strip()

    if current:
        chunks.append(current)

    return chunks


def tokenize(text: str) -> list[str]:
    return re.findall(r"[a-z0-9.+#-]+", text.lower())


def initialize_bm25(chunks: list[str]) -> None:
    global bm25_ranker, bm25_chunks
    bm25_chunks = chunks
    bm25_ranker = BM25Okapi([tokenize(chunk) for chunk in chunks])


def gemini_post(model: str, action: str, body: dict[str, Any]) -> dict[str, Any]:
    require_api_key()
    response = requests.post(
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:{action}",
        headers={"Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY},
        json=body,
        timeout=60,
    )
    response.raise_for_status()
    return response.json()


def embed_text(text: str, task_type: str) -> list[float]:
    response = gemini_post(
        EMBEDDING_MODEL,
        "embedContent",
        {
            "taskType": task_type,
            "content": {"parts": [{"text": text}]},
        },
    )
    return response["embedding"]["values"]


def generate_text(prompt: str) -> str:
    response = gemini_post(
        CHAT_MODEL,
        "generateContent",
        {"contents": [{"role": "user", "parts": [{"text": prompt}]}]},
    )
    parts = response.get("candidates", [{}])[0].get("content", {}).get("parts", [])
    text = "".join(part.get("text", "") for part in parts).strip()

    if not text:
        raise RuntimeError("Gemini returned an empty response")

    return text


def document_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def index_is_current(source_hash: str) -> bool:
    if not INDEX_STATE_PATH.exists() or not qdrant.collection_exists(COLLECTION_NAME):
        return False

    try:
        return json.loads(INDEX_STATE_PATH.read_text(encoding="utf-8")).get("source_hash") == source_hash
    except json.JSONDecodeError:
        return False


def build_index() -> int:
    document = load_document()
    source_hash = document_hash(document)
    chunks = chunk_document(document)
    if not chunks:
        raise RuntimeError("No portfolio chunks were created")

    initialize_bm25(chunks)

    if index_is_current(source_hash):
        return qdrant.get_collection(COLLECTION_NAME).points_count

    vectors = [embed_text(chunk, "RETRIEVAL_DOCUMENT") for chunk in chunks]
    qdrant.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=len(vectors[0]), distance=Distance.COSINE),
    )
    qdrant.upsert(
        collection_name=COLLECTION_NAME,
        points=[
            PointStruct(id=index, vector=vector, payload={"text": chunks[index], "chunk_id": index})
            for index, vector in enumerate(vectors)
        ],
    )

    QDRANT_PATH.mkdir(parents=True, exist_ok=True)
    INDEX_STATE_PATH.write_text(json.dumps({"source_hash": source_hash}), encoding="utf-8")
    return len(chunks)


def ensure_index() -> None:
    global index_ready
    source_hash = document_hash(load_document())
    if not index_ready or not index_is_current(source_hash):
        build_index()
        index_ready = True


def retrieve_semantic(query: str) -> list[dict[str, Any]]:
    query_vector = embed_text(query, "RETRIEVAL_QUERY")
    results = qdrant.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        limit=TOP_K_RETRIEVAL,
        with_payload=True,
    ).points
    return [
        {
            "chunk_id": point.payload["chunk_id"],
            "text": point.payload["text"],
            "vector_score": round(point.score, 4),
        }
        for point in results
    ]


def retrieve_keyword(query: str) -> list[dict[str, Any]]:
    if not bm25_ranker:
        raise RuntimeError("BM25 index is not initialized")

    scores = bm25_ranker.get_scores(tokenize(query))
    ranked_indexes = sorted(range(len(scores)), key=lambda index: scores[index], reverse=True)

    return [
        {
            "chunk_id": index,
            "text": bm25_chunks[index],
            "bm25_score": round(float(scores[index]), 4),
        }
        for index in ranked_indexes[:TOP_K_RETRIEVAL]
        if scores[index] > 0
    ]


def fuse_rankings(
    semantic_results: list[dict[str, Any]], keyword_results: list[dict[str, Any]], k: int = 60
) -> list[dict[str, Any]]:
    fused: dict[int, dict[str, Any]] = {}

    for method, results in (("semantic", semantic_results), ("keyword", keyword_results)):
        for rank, result in enumerate(results, start=1):
            chunk_id = result["chunk_id"]
            candidate = fused.setdefault(
                chunk_id,
                {
                    "chunk_id": chunk_id,
                    "text": result["text"],
                    "vector_score": None,
                    "bm25_score": None,
                    "retrieval_methods": [],
                    "rrf_score": 0.0,
                },
            )
            candidate["rrf_score"] += 1 / (k + rank)
            candidate["retrieval_methods"].append(method)

            if method == "semantic":
                candidate["vector_score"] = result["vector_score"]
            else:
                candidate["bm25_score"] = result["bm25_score"]

    return sorted(fused.values(), key=lambda candidate: candidate["rrf_score"], reverse=True)[:TOP_K_RETRIEVAL]


def retrieve(semantic_query: str, keyword_query: str) -> list[dict[str, Any]]:
    return fuse_rankings(
        retrieve_semantic(semantic_query),
        retrieve_keyword(keyword_query),
    )


def rerank(question: str, candidates: list[dict[str, Any]]) -> list[dict[str, Any]]:
    numbered_chunks = "\n\n".join(
        f"[{index}] {candidate['text']}" for index, candidate in enumerate(candidates)
    )
    prompt = f"""
You are a relevance reranker for a portfolio chatbot.
Rank the candidate passages by how directly they answer the question.
Return only a JSON array containing up to {TOP_K_RERANKED} candidate indexes, ordered most relevant first.

Question:
{question}

Candidate passages:
{numbered_chunks}
"""

    try:
        response = generate_text(prompt)
        match = re.search(r"\[[\s\S]*?\]", response)
        ranked_indexes = json.loads(match.group(0)) if match else []
        ranked_indexes = [index for index in ranked_indexes if isinstance(index, int) and 0 <= index < len(candidates)]

        if ranked_indexes:
            return [candidates[index] for index in ranked_indexes[:TOP_K_RERANKED]]
    except (json.JSONDecodeError, RuntimeError, requests.RequestException):
        pass

    return candidates[:TOP_K_RERANKED]


def trim_history(history: list[dict[str, str]], max_messages: int = 8) -> list[dict[str, str]]:
    return history[-max_messages:]


@app.get("/health")
def health() -> dict[str, Any]:
    try:
        ensure_index()
        return {
            "ok": True,
            "vector_database": "Qdrant",
            "collection": COLLECTION_NAME,
            "chunks": qdrant.get_collection(COLLECTION_NAME).points_count,
        }
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error)) from error


@app.post("/chat")
def chat(request: ChatRequest) -> dict[str, Any]:
    try:
        ensure_index()
        session_id = request.session_id or "default-session"
        history = conversations.setdefault(session_id, [])
        history.append({"role": "user", "content": request.question})
        conversations[session_id] = trim_history(history)

        history_text = "\n".join(
            f"{message['role'].upper()}: {message['content']}" for message in conversations[session_id]
        )
        retrieved = retrieve(
            f"Conversation history:\n{history_text}\n\nQuestion:\n{request.question}",
            request.question,
        )
        reranked = rerank(request.question, retrieved)
        context = "\n\n".join(item["text"] for item in reranked)

        prompt = f"""
You are an AI assistant for Aakash Nair's portfolio.
Answer only from the retrieved portfolio context below. Do not invent details.
If the answer is not supported by the context, respond exactly with:
"I don't have that information in my portfolio."

Conversation history:
{history_text}

Retrieved portfolio context:
{context}

User question:
{request.question}
"""
        answer = generate_text(prompt)
        conversations[session_id].append({"role": "assistant", "content": answer})
        conversations[session_id] = trim_history(conversations[session_id])

        return {
            "answer": answer,
            "sources": [
                {
                    "chunk_id": item["chunk_id"],
                    "vector_score": item["vector_score"],
                    "bm25_score": item["bm25_score"],
                    "retrieval_methods": item["retrieval_methods"],
                }
                for item in reranked
            ],
        }
    except requests.RequestException as error:
        raise HTTPException(status_code=502, detail="Gemini API request failed") from error
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error)) from error
