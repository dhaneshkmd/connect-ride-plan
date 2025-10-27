const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { totalKm, base, perKm, overlapFraction, seatsRequested, riderShareAED } = await req.json();
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    console.log('Pricing Advisor - Analyzing pricing');

    const prompt = `In under 180 chars, businesslike, explain a fair cost split for a car-share:
totalKm=${totalKm}, base=${base} AED, perKm=${perKm} AED, overlap=${Math.round(overlapFraction*100)}%, 
seats=${seatsRequested}, riderShareAED=${riderShareAED}. Provide a clear reason without restating inputs verbatim.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 150
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content?.trim() ?? '';
    const advisoryText = text.slice(0, 180);

    console.log('Pricing Advisor - Generated text:', advisoryText);

    return new Response(
      JSON.stringify({ advisoryText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Pricing Advisor error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error', advisoryText: '' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
