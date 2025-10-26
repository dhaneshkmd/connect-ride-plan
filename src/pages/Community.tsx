import Header from "@/components/Header";
import { ArrowLeft, Users, Star, Award, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Community = () => {
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
              Join Our Community
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Thousands of verified drivers and riders trust RideShare for their daily commutes
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-8 rounded-xl bg-card border border-border">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  10,000+
                </div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center p-8 rounded-xl bg-card border border-border">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  4.8★
                </div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center p-8 rounded-xl bg-card border border-border">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  50,000+
                </div>
                <div className="text-muted-foreground">Trips Completed</div>
              </div>
            </div>

            <div className="space-y-8">
              <section className="p-8 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Verified Drivers & Riders</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Every member of our community undergoes thorough verification. Drivers must pass background 
                      checks and vehicle inspections, while all users verify their identity and contact information.
                    </p>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-secondary/10">
                    <Star className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Rating System</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      After each trip, both drivers and riders rate their experience. This transparent rating system 
                      helps maintain high standards and builds trust within the community.
                    </p>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Recognition Program</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Top-rated drivers earn special badges and benefits. Regular riders also get rewarded with 
                      loyalty perks and priority booking options.
                    </p>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Environmental Impact</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Together, our community has saved over 2 million kilograms of CO₂ emissions by sharing rides 
                      instead of driving alone. You're not just saving money - you're helping create a more 
                      sustainable future for the UAE.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-12 text-center">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                  Join Our Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
