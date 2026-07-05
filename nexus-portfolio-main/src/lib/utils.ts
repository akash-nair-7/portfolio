import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function askAI(question: string, sessionId: string) {
  const apiUrl = import.meta.env.VITE_CHAT_API_URL || "http://localhost:8000";

  const res = await fetch(`${apiUrl}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, sessionId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to get AI response");
  }

  return data.answer;
}
