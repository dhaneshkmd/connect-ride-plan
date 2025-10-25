import { useEffect, useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  is_system_message: boolean;
  profiles: {
    full_name: string;
  };
}

interface ChatBoxProps {
  tripId: string;
}

const ChatBox = ({ tripId }: ChatBoxProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select(`
          *,
          profiles:sender_id (full_name)
        `)
        .eq('trip_id', tripId)
        .order('created_at', { ascending: true });
      
      if (data) setMessages(data as any);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`messages-${tripId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `trip_id=eq.${tripId}`,
        },
        async (payload) => {
          console.log('New message:', payload);
          // Fetch the full message with profile info
          const { data } = await supabase
            .from('messages')
            .select(`
              *,
              profiles:sender_id (full_name)
            `)
            .eq('id', payload.new.id)
            .single();
          
          if (data) {
            setMessages((prev) => [...prev, data as any]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tripId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    setSending(true);
    const { error } = await supabase
      .from('messages')
      .insert({
        trip_id: tripId,
        sender_id: user.id,
        content: newMessage.trim(),
      });

    if (error) {
      toast.error('Failed to send message');
      console.error(error);
    } else {
      setNewMessage('');
    }
    setSending(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>In-App Chat</CardTitle>
        <CardDescription>
          Communicate safely without sharing phone numbers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 w-full rounded-lg border p-4 mb-4" ref={scrollRef}>
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender_id === user?.id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.is_system_message
                      ? 'bg-muted text-muted-foreground text-center w-full'
                      : msg.sender_id === user?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {!msg.is_system_message && (
                    <p className="text-xs opacity-70 mb-1">
                      {msg.profiles?.full_name || 'Unknown'}
                    </p>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={sending}
          />
          <Button type="submit" size="icon" disabled={sending || !newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatBox;
