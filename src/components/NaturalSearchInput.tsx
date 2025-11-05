import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { SearchParams } from "./SearchForm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface NaturalSearchInputProps {
  onParsed: (params: SearchParams) => void;
}

const NaturalSearchInput = ({ onParsed }: NaturalSearchInputProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm here to help you find a ride. Where would you like to go?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const parseSearchReady = (message: string): SearchParams | null => {
    if (!message.startsWith("SEARCH_READY:")) return null;
    
    const params: any = {};
    const paramsStr = message.replace("SEARCH_READY:", "").trim();
    const pairs = paramsStr.split(",");
    
    pairs.forEach(pair => {
      const [key, value] = pair.split("=").map(s => s.trim());
      params[key] = value;
    });

    return {
      origin: params.origin || "",
      destination: params.destination || "",
      date: params.date || "",
      time: params.time || "",
      seats: parseInt(params.seats) || 1
    };
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-search', {
        body: { messages: updatedMessages }
      });

      if (error) throw error;

      const aiResponse = data.message;
      const searchParams = parseSearchReady(aiResponse);

      if (searchParams) {
        // Search is ready, trigger the search
        onParsed(searchParams);
        toast({
          title: "Search Ready!",
          description: "I found all the information needed. Searching for rides...",
        });
        // Reset conversation
        setMessages([
          { role: "assistant", content: "Hi! I'm here to help you find a ride. Where would you like to go?" }
        ]);
      } else {
        // Continue conversation
        setMessages([...updatedMessages, { role: "assistant", content: aiResponse }]);
      }

    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to process your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-semibold">Ask AI to Search</h3>
        </div>
        
        {/* Chat Messages */}
        <div className="bg-background/50 rounded-lg p-4 min-h-[200px] max-h-[300px] overflow-y-auto space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-4 py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder="E.g., 'I want to go to Dubai'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            size="icon"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NaturalSearchInput;
