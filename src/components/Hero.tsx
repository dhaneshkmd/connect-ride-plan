import { Car, Users, TrendingDown, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <div className="relative overflow-hidden min-h-[60vh] flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Urban highway with shared journeys" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Share Rides.<br />Split Costs.<br />Save Together.
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90">
            Connect drivers and riders heading the same direction. Fair pricing based on route overlap.
          </p>

          {/* Feature cards */}
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <FeatureCard 
              icon={<Car className="w-8 h-8" />}
              title="Smart Matching"
              description="AI-powered route overlap detection"
            />
            <FeatureCard 
              icon={<TrendingDown className="w-8 h-8" />}
              title="Fair Pricing"
              description="Pay only for your share"
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8" />}
              title="Community"
              description="Verified drivers & riders"
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8" />}
              title="Secure"
              description="Escrow payments & ratings"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
    <div className="text-white mb-3">{icon}</div>
    <h3 className="font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-white/80">{description}</p>
  </div>
);

export default Hero;
