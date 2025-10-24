// Geospatial utilities for trip matching

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Route {
  points: LatLng[];
  distanceKm: number;
}

/**
 * Calculate distance between two points using Haversine formula
 */
export function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371; // Earth's radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sLat = toRad(a.lat);
  const sLat2 = toRad(b.lat);
  
  const h = 
    Math.sin(dLat / 2) ** 2 + 
    Math.cos(sLat) * Math.cos(sLat2) * Math.sin(dLng / 2) ** 2;
  
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Calculate overlap score between two routes (0-1)
 * Higher score means better route alignment
 */
export function calculateRouteOverlap(driverRoute: LatLng[], riderRoute: LatLng[]): number {
  if (!driverRoute.length || !riderRoute.length) return 0;
  
  // Sample key points
  const driverMid = driverRoute[Math.floor(driverRoute.length / 2)];
  const riderMid = riderRoute[Math.floor(riderRoute.length / 2)];
  
  // Calculate distances at key points
  const startDist = haversineKm(driverRoute[0], riderRoute[0]);
  const midDist = haversineKm(driverMid, riderMid);
  const endDist = haversineKm(
    driverRoute[driverRoute.length - 1], 
    riderRoute[riderRoute.length - 1]
  );
  
  // Decay function: closer = better score
  const decay = (dist: number) => 1 / (1 + dist);
  
  // Weighted average (mid-route alignment is most important)
  const score = 0.4 * decay(startDist) + 0.3 * decay(midDist) + 0.3 * decay(endDist);
  
  return Math.max(0, Math.min(1, score));
}

/**
 * Calculate total route distance
 */
export function calculateRouteDistance(points: LatLng[]): number {
  if (points.length < 2) return 0;
  
  let totalKm = 0;
  for (let i = 0; i < points.length - 1; i++) {
    totalKm += haversineKm(points[i], points[i + 1]);
  }
  
  return totalKm;
}

/**
 * Simplified polyline encoding (for MVP)
 */
export function encodeRoute(points: LatLng[]): string {
  return JSON.stringify(points);
}

export function decodeRoute(encoded: string): LatLng[] {
  try {
    return JSON.parse(encoded);
  } catch {
    return [];
  }
}
