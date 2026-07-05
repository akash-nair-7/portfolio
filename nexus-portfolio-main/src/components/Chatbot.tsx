import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { askAI } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b px-6 py-5 pr-12">
          <SheetTitle>Chat with Aakash's AI assistant</SheetTitle>
        </SheetHeader>
        <ScrollArea className="min-h-0 flex-1 px-4 py-5">
          <div className="space-y-3">
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
          className="flex gap-2 border-t p-4"
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
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default Chatbot;
