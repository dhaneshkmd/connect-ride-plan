import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Users } from "lucide-react";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
}

export interface SearchParams {
  origin: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [formData, setFormData] = useState<SearchParams>({
    origin: "",
    destination: "",
    date: "",
    time: "",
    seats: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <Card className="p-8 shadow-[var(--shadow-card)]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Origin */}
          <div className="space-y-2">
            <Label htmlFor="origin" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              From
            </Label>
            <Input
              id="origin"
              placeholder="Dubai Marina"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              required
              className="h-12"
            />
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <Label htmlFor="destination" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              To
            </Label>
            <Input
              id="destination"
              placeholder="Abu Dhabi"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              required
              className="h-12"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="h-12"
            />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Time (±30 min)
            </Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
              className="h-12"
            />
          </div>

          {/* Seats */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="seats" className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Number of seats
            </Label>
            <Input
              id="seats"
              type="number"
              min={1}
              max={3}
              value={formData.seats}
              onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) || 1 })}
              required
              className="h-12"
            />
            <p className="text-sm text-muted-foreground">Maximum 3 seats per booking</p>
          </div>
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
        >
          Find Matching Trips
        </Button>
      </form>
    </Card>
  );
};

export default SearchForm;
