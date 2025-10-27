const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    console.log('Parse Request - Processing text:', text);

    const schema = {
      type: "object",
      properties: {
        origin: { type: "string" },
        destination: { type: "string" },
        date: { type: "string" },
        time: { type: "string" },
        seats: { type: "integer", minimum: 1, maximum: 3 }
      },
      required: ["origin", "destination", "date", "time", "seats"],
      additionalProperties: false
    };

    const systemPrompt = `Extract structured ride request as JSON. Parse natural language into the schema.
For date, use YYYY-MM-DD format. For time, use HH:MM format. Infer reasonable values if not explicit.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify({ text, schema }) }
        ],
        temperature: 0,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? '{}';
    const parsed = JSON.parse(content);

    console.log('Parse Request - Parsed result:', parsed);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Parse Request error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
