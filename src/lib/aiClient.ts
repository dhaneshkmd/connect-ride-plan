import { supabase } from "@/integrations/supabase/client";

export interface RiderParams {
  origin: string;
  destination: string;
  timeFrom: string;
  timeTo: string;
  seats: number;
}

export interface TripCandidate {
  tripId: string;
  depISO: string;
  seatsFree: number;
  baseAED: number;
  perKmAED: number;
  driver: {
    rating: number;
    cancelRate: number;
  };
  meta: {
    overlapPct: number;
    detourKm: number;
  };
}

export interface MatchResult {
  tripId: string;
  score: number;
  explanation: string;
  estRiderShareAED: number;
}

/**
 * Get AI-ranked trip matches
 */
export async function getAiMatches(
  rider: RiderParams,
  candidates: TripCandidate[]
): Promise<MatchResult[]> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-match', {
      body: { rider, candidates }
    });

    if (error) throw error;
    return data?.results || [];
  } catch (error) {
    console.error('AI Match error:', error);
    throw error;
  }
}

/**
 * Parse natural language text into structured search params
 */
export async function parseNaturalRequest(text: string): Promise<any> {
  try {
    const { data, error } = await supabase.functions.invoke('parse-request', {
      body: { text }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Parse Request error:', error);
    throw error;
  }
}

/**
 * Moderate message content before sending
 */
export async function moderateMessage(content: string): Promise<{ ok: boolean; reason?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('moderate-message', {
      body: { content }
    });

    if (error) {
      // Moderation failed
      return { ok: false, reason: data?.reason || 'Message blocked by safety filter.' };
    }

    return data;
  } catch (error) {
    console.error('Moderate Message error:', error);
    throw error;
  }
}

/**
 * Get AI explanation for pricing split
 */
export async function getPricingAdvisory(params: {
  totalKm: number;
  base: number;
  perKm: number;
  overlapFraction: number;
  seatsRequested: number;
  riderShareAED: number;
}): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke('pricing-advisor', {
      body: params
    });

    if (error) throw error;
    return data?.advisoryText || '';
  } catch (error) {
    console.error('Pricing Advisor error:', error);
    return '';
  }
}

/**
 * Convert speech audio to text using Whisper
 */
export async function speechToText(audioBlob: Blob): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');

    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/speech-to-text`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Speech to text failed');
    }

    const data = await response.json();
    return data.text || '';
  } catch (error) {
    console.error('Speech to Text error:', error);
    throw error;
  }
}
