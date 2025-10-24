import { Car, Users, TrendingDown, Shield } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary min-h-[60vh] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
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
