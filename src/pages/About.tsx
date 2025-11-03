import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet";

const About = () => {
  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Rides Completed", value: "500K+" },
    { label: "Cities Covered", value: "25+" },
    { label: "CO₂ Saved", value: "2M kg" },
  ];

  const team = [
    {
      name: "Sarah Ahmed",
      role: "CEO & Co-Founder",
      bio: "Former product lead at major tech companies, passionate about sustainable transportation.",
    },
    {
      name: "Mohammed Hassan",
      role: "CTO & Co-Founder",
      bio: "AI researcher with expertise in optimization algorithms and machine learning systems.",
    },
    {
      name: "Fatima Al-Rashid",
      role: "Head of Operations",
      bio: "Logistics expert focused on creating efficient and user-friendly ride-sharing experiences.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - RideShare</title>
        <meta name="description" content="Learn about RideShare's mission to make transportation smarter, safer, and more sustainable." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          {/* Hero Section */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">
                About RideShare
              </h1>
              <p className="text-xl text-muted-foreground">
                We're on a mission to revolutionize transportation by making ride-sharing 
                smarter, safer, and more sustainable for everyone.
              </p>
            </div>
          </section>

          {/* Stats */}
          <section className="bg-muted/30 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground">
                    To connect people through intelligent ride-sharing technology that reduces 
                    traffic congestion, lowers transportation costs, and minimizes environmental 
                    impact while ensuring safety and convenience for all users.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground">
                    A world where transportation is efficient, accessible, and sustainable. 
                    Where every journey is optimized, every seat is utilized, and communities 
                    are connected through shared mobility solutions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Story */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  RideShare was founded in 2023 by a team of technologists and transportation 
                  enthusiasts who saw an opportunity to solve one of modern cities' biggest 
                  challenges: inefficient transportation.
                </p>
                <p>
                  We noticed that countless cars traveled similar routes every day with empty 
                  seats, while others struggled with expensive or unreliable transportation 
                  options. We knew there had to be a better way.
                </p>
                <p>
                  By combining advanced AI algorithms with a deep understanding of user needs, 
                  we built a platform that makes ride-sharing simple, safe, and beneficial for 
                  everyone involved. Our smart matching technology ensures optimal routes and 
                  fair pricing, while our safety features give users peace of mind.
                </p>
                <p>
                  Today, we're proud to serve thousands of users across multiple cities, 
                  helping them save money, reduce their carbon footprint, and connect with 
                  their communities through shared journeys.
                </p>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {team.map((member) => (
                  <Card key={member.name}>
                    <CardContent className="p-6 text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-sm text-primary mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
