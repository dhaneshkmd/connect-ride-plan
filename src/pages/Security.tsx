import Header from "@/components/Header";
import { ArrowLeft, Shield, MapPin, MessageSquare, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Security = () => {
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
              Your Safety is Our Priority
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Multiple layers of security ensure every ride is safe and protected
            </p>

            <div className="space-y-8">
              <section className="p-8 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Verified Drivers</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      All drivers undergo comprehensive background checks and vehicle inspections before they can 
                      offer rides. We verify:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>UAE driving license and vehicle registration</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Clean driving record and police clearance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Vehicle safety inspection and insurance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Identity verification through Emirates ID</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-secondary/10">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Real-Time Tracking</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Share your trip details with friends and family. They can track your journey in real-time 
                      through a secure link, seeing your current location and estimated arrival time. 
                      GPS tracking is active throughout the entire trip.
                    </p>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">In-App Chat</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Communicate safely without sharing personal phone numbers. All conversations are 
                      monitored by our AI system for inappropriate content, and you can report any issues 
                      instantly. Messages are encrypted and stored securely.
                    </p>
                  </div>
                </div>
              </section>

              <section className="p-8 rounded-xl bg-gradient-to-br from-destructive/5 to-destructive/10 border border-destructive/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-destructive">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Emergency Support</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      24/7 support team and one-tap emergency assistance available throughout your journey. 
                      In case of emergency:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>One-tap emergency button alerts our response team and your emergency contacts</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Automatic location sharing with emergency services</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Direct line to local police and ambulance services</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Trip recording and incident documentation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-12 p-6 rounded-xl bg-muted/30 text-center">
              <p className="text-muted-foreground mb-4">
                Have questions about safety? Our support team is available 24/7
              </p>
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
