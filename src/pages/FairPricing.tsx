import Header from "@/components/Header";
import { ArrowLeft, DollarSign, Calculator, PieChart, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FairPricing = () => {
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
              Fair Pricing for Everyone
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Pay only for your share - transparent, fair, and calculated automatically
            </p>

            <div className="space-y-8">
              <section className="p-8 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Distance-Based Calculation</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Our pricing model is simple and transparent. You pay a small base fare plus a per-kilometer 
                      rate, but only for the distance you actually travel with the driver.
                    </p>
                    <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm">
                      <p>Your Cost = Base Fare + (Distance × Rate × Overlap %)</p>
                      <p className="text-muted-foreground mt-2">Example: 15 AED + (140km × 1.2 AED × 92%) = 169.68 AED</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-secondary/10">
                    <PieChart className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Cost Splitting That Makes Sense</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      When multiple riders share a trip, costs are divided fairly based on each person's journey length. 
                      The driver saves on fuel costs, and riders save compared to solo trips or traditional ride services.
                    </p>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <DollarSign className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">No Hidden Fees</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      What you see is what you pay. No surge pricing during peak hours, no booking fees, 
                      no cancellation charges. Just fair, transparent pricing for your shared journey.
                    </p>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary">
                    <TrendingDown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Save Up to 70%</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Compared to traditional ride-hailing services, ridesharing can save you significant money. 
                      For regular commuters, this adds up to thousands of AED per year.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="p-4 rounded-lg bg-background">
                        <p className="text-sm text-muted-foreground">Traditional Ride</p>
                        <p className="text-2xl font-bold text-destructive">450 AED</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background">
                        <p className="text-sm text-muted-foreground">RideShare</p>
                        <p className="text-2xl font-bold text-primary">135 AED</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-12 text-center">
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                  Calculate Your Savings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FairPricing;
