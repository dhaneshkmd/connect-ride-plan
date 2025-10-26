import Header from "@/components/Header";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import blogTips from "@/assets/blog-tips.jpg";
import blogTraffic from "@/assets/blog-traffic.jpg";
import blogDriver from "@/assets/blog-driver.jpg";

const Blog = () => {
  const posts = [
    {
      id: "first-time-riders",
      title: "5 Tips for First-Time Riders",
      date: "March 15, 2024",
      excerpt: "New to ridesharing? Here's everything you need to know to have a great first experience.",
      image: blogTips,
      readTime: "5 min read"
    },
    {
      id: "reduce-traffic",
      title: "How RideShare Reduces Traffic",
      date: "March 10, 2024",
      excerpt: "Discover how shared mobility is helping reduce congestion on UAE roads.",
      image: blogTraffic,
      readTime: "7 min read"
    },
    {
      id: "driver-spotlight",
      title: "Driver Spotlight: Ahmed's Story",
      date: "March 5, 2024",
      excerpt: "Meet Ahmed, who's been saving 500 AED monthly on his Dubai-Abu Dhabi commute.",
      image: blogDriver,
      readTime: "4 min read"
    }
  ];

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

          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              RideShare Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Tips, stories, and insights from the RideShare community
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>
                  <article className="rounded-xl bg-card border border-border hover:border-primary/50 transition-all overflow-hidden group cursor-pointer h-full flex flex-col">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground flex-1">{post.excerpt}</p>
                      <div className="mt-4 text-primary font-medium">
                        Read more →
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
