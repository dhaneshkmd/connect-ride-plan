import { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface TripLocation {
  id: string;
  current_lat: number;
  current_lng: number;
  origin: string;
  destination: string;
  status: string;
}

interface RealTimeTrackingProps {
  tripId: string;
}

const RealTimeTracking = ({ tripId }: RealTimeTrackingProps) => {
  const [location, setLocation] = useState<TripLocation | null>(null);

  useEffect(() => {
    // Fetch initial trip location
    const fetchLocation = async () => {
      const { data } = await supabase
        .from('trips')
        .select('*')
        .eq('id', tripId)
        .single();
      
      if (data) setLocation(data);
    };

    fetchLocation();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`trip-${tripId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'trips',
          filter: `id=eq.${tripId}`,
        },
        (payload) => {
          console.log('Trip location updated:', payload);
          setLocation(payload.new as TripLocation);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tripId]);

  if (!location) {
    return <div className="text-center p-4">Loading location...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-primary" />
          Real-Time Tracking
        </CardTitle>
        <CardDescription>
          Track your ride in real-time for added safety
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-1" />
          <div>
            <p className="font-medium">From: {location.origin}</p>
            <p className="text-sm text-muted-foreground">
              Lat: {location.current_lat?.toFixed(6)}, Lng: {location.current_lng?.toFixed(6)}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-secondary mt-1" />
          <div>
            <p className="font-medium">To: {location.destination}</p>
            <p className="text-sm text-muted-foreground">Status: {location.status}</p>
          </div>
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Share this trip with friends and family. They can track your journey in real-time.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeTracking;
