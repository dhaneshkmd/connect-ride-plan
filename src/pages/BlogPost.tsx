import Header from "@/components/Header";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import blogTips from "@/assets/blog-tips.jpg";
import blogTraffic from "@/assets/blog-traffic.jpg";
import blogDriver from "@/assets/blog-driver.jpg";

const BlogPost = () => {
  const { id } = useParams();

  const posts: Record<string, any> = {
    "first-time-riders": {
      title: "5 Tips for First-Time Riders",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: blogTips,
      content: [
        {
          subtitle: "1. Complete Your Profile",
          text: "Before booking your first ride, make sure your profile is complete with a clear photo and verified phone number. This builds trust with drivers and increases your chances of getting accepted for trips."
        },
        {
          subtitle: "2. Be Ready on Time",
          text: "Drivers appreciate riders who are punctual. Be at your pickup location 5 minutes before the scheduled departure time. This shows respect for everyone's schedule and helps the trip start smoothly."
        },
        {
          subtitle: "3. Communicate Clearly",
          text: "Use the in-app chat to coordinate with your driver. Let them know if you're running late or need to adjust the pickup location slightly. Clear communication prevents misunderstandings."
        },
        {
          subtitle: "4. Respect the Vehicle",
          text: "Treat the driver's car as you would your own. Keep it clean, avoid eating messy foods, and always wear your seatbelt. Remember, the driver is sharing their personal vehicle with you."
        },
        {
          subtitle: "5. Leave a Fair Rating",
          text: "After your trip, take a moment to rate your experience honestly. Positive ratings help good drivers build their reputation, while constructive feedback helps everyone improve."
        }
      ]
    },
    "reduce-traffic": {
      title: "How RideShare Reduces Traffic",
      date: "March 10, 2024",
      readTime: "7 min read",
      image: blogTraffic,
      content: [
        {
          subtitle: "The Impact of Shared Mobility",
          text: "Every day, thousands of cars travel the same routes across the UAE, often with just one person inside. This creates unnecessary traffic congestion, increases pollution, and wastes fuel. Ridesharing is changing this pattern."
        },
        {
          subtitle: "Real Numbers, Real Impact",
          text: "Our data shows that for every 4 riders who share trips instead of driving solo, we remove 3 cars from the road. On popular routes like Dubai to Abu Dhabi, this means hundreds fewer vehicles during peak hours."
        },
        {
          subtitle: "Environmental Benefits",
          text: "The environmental impact is significant. Our community has collectively saved over 2 million kilograms of CO₂ emissions in the past year alone. That's equivalent to planting 90,000 trees."
        },
        {
          subtitle: "Better Infrastructure Usage",
          text: "When roads are less congested, everyone benefits. Emergency vehicles can move faster, public transportation becomes more reliable, and the overall quality of life improves for all residents."
        },
        {
          subtitle: "The Future is Shared",
          text: "As more people embrace ridesharing, we're building a more sustainable transportation system for the UAE. It's not just about saving money – it's about creating smarter, cleaner cities for future generations."
        }
      ]
    },
    "driver-spotlight": {
      title: "Driver Spotlight: Ahmed's Story",
      date: "March 5, 2024",
      readTime: "4 min read",
      image: blogDriver,
      content: [
        {
          subtitle: "Meet Ahmed Al-Mansouri",
          text: "Ahmed is a 34-year-old project manager who commutes from Dubai Marina to Abu Dhabi's business district five days a week. Like many professionals, he was spending hundreds of AED monthly on his solo commute."
        },
        {
          subtitle: "The Turning Point",
          text: "\"I calculated that my daily commute was costing me about 600 AED per month in fuel alone,\" Ahmed explains. \"Plus the wear and tear on my car, parking fees, and the stress of driving in traffic every day. Something had to change.\""
        },
        {
          subtitle: "Joining RideShare",
          text: "Six months ago, Ahmed registered as a driver on RideShare. He now regularly shares his commute with 2-3 riders heading in the same direction. \"The application process was straightforward,\" he says. \"The background check and vehicle inspection gave me confidence in the platform.\""
        },
        {
          subtitle: "The Financial Impact",
          text: "Ahmed now saves approximately 500 AED monthly by sharing rides. \"My passengers cover most of my fuel costs, and I'm putting less mileage on my car. It's a win-win situation.\" Beyond the savings, he's also made new professional connections."
        },
        {
          subtitle: "More Than Money",
          text: "\"The best part isn't even the money,\" Ahmed reflects. \"It's the conversations. I've met people from different industries, made friends, and my morning commute is now the most interesting part of my day. I'm also doing something good for the environment, which matters to me.\""
        }
      ]
    }
  };

  const post = id ? posts[id] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Post not found</h1>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <article className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="aspect-video rounded-xl overflow-hidden mb-12">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              {post.content.map((section: any, index: number) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{section.subtitle}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
              <h3 className="text-xl font-semibold mb-3">Ready to start your journey?</h3>
              <p className="text-muted-foreground mb-4">
                Join thousands of commuters who are saving money and making connections through RideShare.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                  Get Started
                </Button>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
