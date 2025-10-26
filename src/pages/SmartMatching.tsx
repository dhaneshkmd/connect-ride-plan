import Header from "@/components/Header";
import { ArrowLeft, MapPin, Clock, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SmartMatching = () => {
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

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Smart Matching Algorithm
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              AI-powered route overlap detection that saves you money and time
            </p>

            <div className="space-y-8">
              <section className="p-8 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Precision Route Analysis</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Our algorithm analyzes your starting point and destination, then compares it with available trips. 
                      We calculate the exact overlap between routes to ensure you're matched with the most relevant rides.
                    </p>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-secondary/10">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Time-Optimized Matching</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Not just about distance - we factor in departure times, traffic patterns, and typical commute 
                      durations to match you with rides that fit your schedule perfectly.
                    </p>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Match Score System</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Each trip is assigned a match score from 0-100%, indicating how closely your route aligns with 
                      the driver's journey. Higher scores mean more direct routes and better value for your money.
                    </p>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Real-Time Updates</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      As new trips become available or conditions change, our system continuously re-evaluates matches 
                      to show you the best options. You'll always see the most relevant and cost-effective rides.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-12 text-center">
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                  Try Smart Matching Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartMatching;
