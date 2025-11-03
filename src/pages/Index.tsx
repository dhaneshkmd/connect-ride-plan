import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SearchForm, { SearchParams } from "@/components/SearchForm";
import TripCard from "@/components/TripCard";
import NaturalSearchInput from "@/components/NaturalSearchInput";
import { calculateCostSplit } from "@/lib/pricing";
import { toast } from "sonner";

// Mock data for demonstration
const mockTrips = [
  {
    id: "1",
    driverName: "Ahmed Al-Mansouri",
    driverRating: 4.9,
    vehicle: "Toyota Camry 2023",
    origin: "Dubai Marina",
    destination: "Abu Dhabi Corniche",
    departureTime: "08:30 AM",
    availableSeats: 2,
    matchScore: 0.92,
    totalKm: 140,
    basePrice: 15,
    pricePerKm: 1.2
  },
  {
    id: "2",
    driverName: "Sara Mohammed",
    driverRating: 4.8,
    vehicle: "Honda Accord 2022",
    origin: "Business Bay",
    destination: "Abu Dhabi Marina Mall",
    departureTime: "09:00 AM",
    availableSeats: 3,
    matchScore: 0.85,
    totalKm: 145,
    basePrice: 15,
    pricePerKm: 1.15
  },
  {
    id: "3",
    driverName: "Omar Hassan",
    driverRating: 5.0,
    vehicle: "Tesla Model 3",
    origin: "JBR",
    destination: "Yas Island",
    departureTime: "08:45 AM",
    availableSeats: 1,
    matchScore: 0.78,
    totalKm: 150,
    basePrice: 20,
    pricePerKm: 1.3
  }
];

const Index = () => {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setShowResults(true);
    toast.success(`Searching for trips from ${params.origin} to ${params.destination}...`);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleRequestSeat = (tripId: string) => {
    toast.info("Seat request sent! Driver will be notified.", {
      description: "You'll receive a notification when they respond."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="pt-16">
        <Hero />
      </section>

      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-12 relative z-20 space-y-6">
        <NaturalSearchInput onParsed={(params) => {
          setSearchParams(params);
          setShowResults(true);
        }} />
        <SearchForm onSearch={handleSearch} />
      </div>

      {/* How It Works */}
      <section id="smart-matching" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard 
              number="1"
              title="Search Your Route"
              description="Enter your origin, destination, and travel time. We'll find trips heading your direction."
            />
            <StepCard 
              number="2"
              title="Smart Matching"
              description="Our algorithm calculates route overlap and suggests fair pricing based on your shared journey."
            />
            <StepCard 
              number="3"
              title="Share & Save"
              description="Request a seat, chat with your driver, and enjoy cost savings while traveling together."
            />
          </div>
        </div>
      </section>

      {/* Fair Pricing */}
      <section id="fair-pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Fair Pricing for Everyone</h2>
            <p className="text-xl text-muted-foreground">
              Pay only for the distance you travel, calculated automatically based on route overlap
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FeatureCard 
              title="Distance-Based Pricing"
              description="Our algorithm calculates exactly how much of the driver's route you share, so you only pay for what you use."
            />
            <FeatureCard 
              title="Transparent Breakdown"
              description="See exactly how your price is calculated: base fare + distance traveled. No hidden fees, no surge pricing."
            />
            <FeatureCard 
              title="Save Up to 70%"
              description="Compared to traditional ride services, sharing rides means splitting costs and significant savings for everyone."
            />
            <FeatureCard 
              title="Driver Earnings"
              description="Drivers earn fair compensation while reducing their commute costs. Win-win for the community."
            />
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl text-muted-foreground">
              Thousands of commuters across the UAE trust RideShare for their daily journeys
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StatCard number="10,000+" label="Active Users" />
            <StatCard number="4.8★" label="Average Rating" />
            <StatCard number="50,000+" label="Trips Completed" />
          </div>
        </div>
      </section>

      {/* Secure */}
      <section id="secure" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Your Safety is Our Priority</h2>
            <p className="text-xl text-muted-foreground">
              Multiple layers of verification and security to ensure every ride is safe
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FeatureCard 
              title="Verified Drivers"
              description="All drivers undergo background checks and vehicle inspections before they can offer rides."
            />
            <FeatureCard 
              title="Real-Time Tracking"
              description="Share your trip details with friends and family. They can track your journey in real-time."
            />
            <FeatureCard 
              title="In-App Chat"
              description="Communicate safely without sharing personal phone numbers. All conversations are monitored."
            />
            <FeatureCard 
              title="Emergency Support"
              description="24/7 support team and one-tap emergency assistance available throughout your journey."
            />
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Latest from Our Blog</h2>
            <p className="text-xl text-muted-foreground">
              Tips, stories, and insights from the RideShare community
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <BlogCard 
              title="5 Tips for First-Time Riders"
              date="March 15, 2024"
              excerpt="New to ridesharing? Here's everything you need to know to have a great first experience."
            />
            <BlogCard 
              title="How RideShare Reduces Traffic"
              date="March 10, 2024"
              excerpt="Discover how shared mobility is helping reduce congestion on UAE roads."
            />
            <BlogCard 
              title="Driver Spotlight: Ahmed's Story"
              date="March 5, 2024"
              excerpt="Meet Ahmed, who's been saving 500 AED monthly on his Dubai-Abu Dhabi commute."
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      {showResults && searchParams && (
        <section id="results" className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Available Trips</h2>
              <p className="text-muted-foreground">
                {mockTrips.length} trips found from {searchParams.origin} to {searchParams.destination}
              </p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {mockTrips.map((trip) => {
                // Calculate pricing based on match score
                const pricing = calculateCostSplit({
                  totalKm: trip.totalKm,
                  basePrice: trip.basePrice,
                  pricePerKm: trip.pricePerKm,
                  overlapFraction: trip.matchScore,
                  seatsRequested: searchParams.seats
                });

                return (
                  <TripCard
                    key={trip.id}
                    id={trip.id}
                    driverName={trip.driverName}
                    driverRating={trip.driverRating}
                    vehicle={trip.vehicle}
                    origin={trip.origin}
                    destination={trip.destination}
                    departureTime={trip.departureTime}
                    availableSeats={trip.availableSeats}
                    matchScore={trip.matchScore}
                    estimatedPrice={pricing.riderShare}
                    estimatedSavings={pricing.savings}
                    onRequest={handleRequestSeat}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!showResults && (
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Saving?</h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of commuters sharing rides across the UAE
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-colors">
                Find a Ride
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors border-2 border-white/20">
                Become a Driver
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

const StepCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="text-center">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-2xl font-bold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const StatCard = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center p-8 rounded-xl bg-card border border-border">
    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
      {number}
    </div>
    <div className="text-muted-foreground">{label}</div>
  </div>
);

const BlogCard = ({ title, date, excerpt }: { title: string; date: string; excerpt: string }) => (
  <Link to="/blog">
    <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer">
      <div className="text-sm text-muted-foreground mb-2">{date}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{excerpt}</p>
    </div>
  </Link>
);

export default Index;
