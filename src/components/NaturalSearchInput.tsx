import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mic, Sparkles, Loader2 } from "lucide-react";
import { parseNaturalRequest, speechToText } from "@/lib/aiClient";
import { useToast } from "@/hooks/use-toast";
import type { SearchParams } from "./SearchForm";

interface NaturalSearchInputProps {
  onParsed: (params: SearchParams) => void;
}

const NaturalSearchInput = ({ onParsed }: NaturalSearchInputProps) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const { toast } = useToast();

  const handleParse = async () => {
    if (!text.trim()) {
      toast({
        title: "Enter a request",
        description: "Please describe your ride needs in natural language.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const parsed = await parseNaturalRequest(text);
      onParsed(parsed);
      toast({
        title: "Request parsed!",
        description: "Your search form has been filled.",
      });
      setText("");
    } catch (error) {
      toast({
        title: "Parse failed",
        description: "Could not understand the request. Try being more specific.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = async () => {
    try {
      setRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        stream.getTracks().forEach(track => track.stop());
        
        try {
          const transcribed = await speechToText(audioBlob);
          setText(transcribed);
          toast({
            title: "Voice recorded",
            description: "Your speech has been transcribed.",
          });
        } catch (error) {
          toast({
            title: "Transcription failed",
            description: "Could not convert speech to text.",
            variant: "destructive"
          });
        }
        setRecording(false);
      };

      mediaRecorder.start();
      
      // Auto-stop after 10 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, 10000);

      toast({
        title: "Recording...",
        description: "Speak your ride request (max 10 seconds)",
      });
    } catch (error) {
      toast({
        title: "Microphone error",
        description: "Could not access microphone.",
        variant: "destructive"
      });
      setRecording(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-semibold">Ask AI to Search</h3>
        </div>
        
        <Textarea
          placeholder="E.g., 'I need a ride from Dubai Marina to Abu Dhabi tomorrow at 2 PM for 2 people'"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        
        <div className="flex gap-2">
          <Button
            onClick={handleParse}
            disabled={loading || !text.trim()}
            className="flex-1"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Parsing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Parse Request
              </>
            )}
          </Button>
          
          <Button
            onClick={handleVoiceInput}
            disabled={recording || loading}
            variant="outline"
            size="icon"
          >
            <Mic className={`w-4 h-4 ${recording ? 'animate-pulse text-red-500' : ''}`} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NaturalSearchInput;
