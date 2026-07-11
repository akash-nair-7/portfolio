import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { askAI } from "@/lib/utils";
import { MessageCircle, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => {
    const storageKey = "portfolio-chat-session";
    const existingId = window.sessionStorage.getItem(storageKey);

    if (existingId) {
      return existingId;
    }

    const newId = crypto.randomUUID();
    window.sessionStorage.setItem(storageKey, newId);
    return newId;
  });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const answer = await askAI(input, sessionId);
      const assistantMessage: Message = { role: "assistant", content: answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = { role: "assistant", content: "Sorry, I couldn't get a response. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[520px] w-full flex-col overflow-hidden rounded-xl border border-primary/20 bg-card/80 text-left shadow-2xl shadow-primary/10 backdrop-blur">
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <MessageCircle size={20} />
          </div>
          <div>
            <h2 className="font-heading text-base font-semibold text-foreground">
              Ask Aakash's AI assistant
            </h2>
            <p className="text-xs text-muted-foreground">
              Portfolio-aware responses from the RAG chatbot
            </p>
          </div>
        </div>
      </div>
      <ScrollArea className="min-h-0 flex-1 px-4 py-5">
        <div className="space-y-3">
          {messages.length === 0 && (
            <div className="mr-6 rounded-lg bg-muted px-3 py-2 text-sm leading-6 text-muted-foreground">
              Ask about Aakash's projects, experience, skills, or background.
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`rounded-lg px-3 py-2 text-sm leading-6 ${
                msg.role === "user" ? "ml-8 bg-primary text-primary-foreground" : "mr-8 bg-muted"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div className="mr-8 rounded-lg bg-muted px-3 py-2 text-sm leading-6">
              Thinking...
            </div>
          )}
        </div>
      </ScrollArea>
      <form
        className="flex gap-2 border-t border-border p-4"
        onSubmit={(event) => {
          event.preventDefault();
          handleSend();
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Aakash's work..."
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default Chatbot;
