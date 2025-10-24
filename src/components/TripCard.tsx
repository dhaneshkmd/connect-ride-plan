import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Users, TrendingDown } from "lucide-react";
import { formatAED } from "@/lib/pricing";

export interface TripCardProps {
  id: string;
  driverName: string;
  driverRating: number;
  driverAvatar?: string;
  vehicle: string;
  origin: string;
  destination: string;
  departureTime: string;
  availableSeats: number;
  matchScore: number;
  estimatedPrice: number;
  estimatedSavings: number;
  onRequest: (tripId: string) => void;
}

const TripCard = ({
  id,
  driverName,
  driverRating,
  driverAvatar,
  vehicle,
  origin,
  destination,
  departureTime,
  availableSeats,
  matchScore,
  estimatedPrice,
  estimatedSavings,
  onRequest
}: TripCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        {/* Header: Driver info & match score */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={driverAvatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {driverName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{driverName}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{driverRating.toFixed(1)}</span>
                <span className="mx-1">•</span>
                <span>{vehicle}</span>
              </div>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20"
          >
            {Math.round(matchScore * 100)}% match
          </Badge>
        </div>

        {/* Route info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-medium truncate">{origin}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">To</p>
              <p className="font-medium truncate">{destination}</p>
            </div>
          </div>
        </div>

        {/* Trip details */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 flex-wrap">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{departureTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{availableSeats} seats left</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your estimated share</p>
              <p className="text-2xl font-bold text-primary">{formatAED(estimatedPrice)}</p>
            </div>
            {estimatedSavings > 0 && (
              <div className="text-right">
                <div className="flex items-center gap-1 text-secondary font-semibold">
                  <TrendingDown className="w-5 h-5" />
                  <span>Save {formatAED(estimatedSavings)}</span>
                </div>
                <p className="text-xs text-muted-foreground">vs. solo trip</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full h-12 font-semibold"
          onClick={() => onRequest(id)}
        >
          Request Seat
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TripCard;
