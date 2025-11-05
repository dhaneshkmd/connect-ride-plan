import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are a helpful AI assistant for a ride-sharing platform. Your job is to help users find rides by asking follow-up questions to gather all necessary information.

Required information to complete a search:
1. Origin (pickup location)
2. Destination (drop-off location)
3. Date (when they want to travel)
4. Time (departure time)
5. Number of seats needed

Guidelines:
- Be friendly and conversational
- Ask ONE question at a time
- If the user provides partial information, acknowledge it and ask for what's missing
- Once you have ALL required information, respond with ONLY this exact format (no other text):
  SEARCH_READY: origin={location}, destination={location}, date={YYYY-MM-DD}, time={HH:MM}, seats={number}
- Keep responses brief and natural
- If user just says something vague like "I want to go to Dubai", ask follow-up questions like "Where are you traveling from?" or "When would you like to go?"

Example conversations:
User: "I want to go to Dubai"
Assistant: "Great! Where will you be traveling from?"

User: "From Abu Dhabi tomorrow"
Assistant: "Perfect! What time would you like to depart tomorrow?"

User: "Around 2 PM for 2 people"
Assistant: "SEARCH_READY: origin=Abu Dhabi, destination=Dubai, date=${new Date(Date.now() + 86400000).toISOString().split('T')[0]}, time=14:00, seats=2"`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service requires payment. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error('AI Gateway request failed');
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    console.log('AI response:', aiMessage);

    return new Response(
      JSON.stringify({ message: aiMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in chat-search function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});