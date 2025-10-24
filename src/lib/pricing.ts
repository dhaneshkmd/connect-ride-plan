// Cost splitting and pricing logic

export interface PricingParams {
  totalKm: number;
  basePrice: number;
  pricePerKm: number;
  overlapFraction: number;
  seatsRequested: number;
}

export interface PricingResult {
  tripCost: number;
  riderShare: number;
  driverShare: number;
  savings: number; // vs. solo trip
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Calculate fair cost split between driver and riders
 */
export function calculateCostSplit(params: PricingParams): PricingResult {
  const { totalKm, basePrice, pricePerKm, overlapFraction, seatsRequested } = params;
  
  // Total trip cost
  const tripCost = basePrice + totalKm * pricePerKm;
  
  // Rider pays proportionally based on overlap and seats
  const riderShare = (tripCost * overlapFraction) / Math.max(1, seatsRequested);
  
  // Driver pays the remainder
  const driverShare = tripCost - riderShare * seatsRequested;
  
  // Calculate savings vs solo trip
  const soloTripCost = tripCost;
  const savings = soloTripCost - riderShare;
  
  return {
    tripCost: round2(tripCost),
    riderShare: round2(riderShare),
    driverShare: round2(driverShare),
    savings: round2(Math.max(0, savings))
  };
}

/**
 * Format currency for display
 */
export function formatAED(amount: number): string {
  return `AED ${amount.toFixed(2)}`;
}

/**
 * Calculate estimated time savings
 */
export function estimateTimeSavings(distanceKm: number, avgSpeedKmh: number = 80): string {
  const hours = distanceKm / avgSpeedKmh;
  const minutes = Math.round(hours * 60);
  
  if (minutes < 60) return `${minutes}min`;
  
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}min`;
}
