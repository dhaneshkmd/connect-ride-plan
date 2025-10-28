import { useState } from "react";
import Header from "@/components/Header";
import SearchForm, { SearchParams } from "@/components/SearchForm";
import TripCard from "@/components/TripCard";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getAiMatches, type TripCandidate, type MatchResult } from "@/lib/aiClient";
import { calculateRouteOverlap } from "@/lib/geo";
import { toast } from "sonner";
import { format } from "date-fns";

const SmartMatching = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [matches, setMatches] = useState<Array<MatchResult & { trip: any; driver: any }>>([]);
  const navigate = useNavigate();

  const handleSearch = async (params: SearchParams) => {
    setIsSearching(true);
    setMatches([]);

    try {
      // Parse search time window
      const searchDateTime = new Date(`${params.date}T${params.time}`);
      const timeFrom = new Date(searchDateTime.getTime() - 30 * 60000).toISOString();
      const timeTo = new Date(searchDateTime.getTime() + 30 * 60000).toISOString();

      // Fetch available trips within time window
      const { data: trips, error } = await supabase
        .from('trips')
        .select(`
          *,
          profiles!trips_driver_id_fkey (
            full_name,
            rating,
            avatar_url,
            vehicle_info
          )
        `)
        .eq('status', 'scheduled')
        .gte('available_seats', params.seats)
        .gte('departure_time', timeFrom)
        .lte('departure_time', timeTo);

      if (error) throw error;

      if (!trips || trips.length === 0) {
        toast.info("No trips found for your search criteria");
        setIsSearching(false);
        return;
      }

      // Prepare candidates for AI matching
      const candidates: TripCandidate[] = trips.map(trip => {
        // Calculate basic route overlap (simplified for MVP)
        const driverRoute = [
          { lat: Number(trip.origin_lat), lng: Number(trip.origin_lng) },
          { lat: Number(trip.destination_lat), lng: Number(trip.destination_lng) }
        ];
        // Note: In production, you'd geocode the search params
        // For now, we'll use the trip's route as approximation
        const overlapPct = 0.75; // Simplified overlap calculation

        return {
          tripId: trip.id,
          depISO: trip.departure_time,
          seatsFree: trip.available_seats,
          baseAED: 50,
          perKmAED: Number(trip.price_per_seat) / 100,
          driver: {
            rating: Number(trip.profiles.rating) || 5.0,
            cancelRate: 0.05
          },
          meta: {
            overlapPct,
            detourKm: 2
          }
        };
      });

      // Get AI-ranked matches
      const aiResults = await getAiMatches(
        {
          origin: params.origin,
          destination: params.destination,
          timeFrom,
          timeTo,
          seats: params.seats
        },
        candidates
      );

      // Merge AI results with trip data
      const rankedMatches = aiResults
        .map(result => {
          const trip = trips.find(t => t.id === result.tripId);
          if (!trip) return null;
          return {
            ...result,
            trip,
            driver: trip.profiles
          };
        })
        .filter(Boolean)
        .sort((a, b) => b!.score - a!.score);

      setMatches(rankedMatches as any);
      toast.success(`Found ${rankedMatches.length} matching trips!`);
    } catch (error) {
      console.error('Search error:', error);
      toast.error("Failed to search trips. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleRequestSeat = async (tripId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please sign in to book a trip");
      navigate('/auth');
      return;
    }

    try {
      const { error } = await supabase
        .from('trip_participants')
        .insert({
          trip_id: tripId,
          rider_id: user.id,
          seats_booked: 1,
          status: 'confirmed'
        });

      if (error) throw error;
      
      toast.success("Seat requested successfully!");
      navigate('/');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error("Failed to book seat. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Matching</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Find Your Perfect Ride
              </h1>
              <p className="text-xl text-muted-foreground">
                Our AI analyzes routes, timing, and preferences to match you with the best trips
              </p>
            </div>

            {/* Search Form */}
            <div className="mb-12">
              <SearchForm onSearch={handleSearch} />
            </div>

            {/* Loading State */}
            {isSearching && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <p className="text-lg text-muted-foreground">Analyzing routes and finding best matches...</p>
              </div>
            )}

            {/* Results */}
            {!isSearching && matches.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {matches.length} Matching {matches.length === 1 ? 'Trip' : 'Trips'} Found
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {matches.map((match) => (
                    <TripCard
                      key={match.trip.id}
                      id={match.trip.id}
                      driverName={match.driver.full_name}
                      driverRating={Number(match.driver.rating)}
                      driverAvatar={match.driver.avatar_url}
                      vehicle={match.driver.vehicle_info?.model || "Vehicle"}
                      origin={match.trip.origin}
                      destination={match.trip.destination}
                      departureTime={format(new Date(match.trip.departure_time), 'MMM d, h:mm a')}
                      availableSeats={match.trip.available_seats}
                      matchScore={match.score}
                      estimatedPrice={match.estRiderShareAED}
                      estimatedSavings={30}
                      onRequest={handleRequestSeat}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartMatching;
