import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import { Briefcase, MapPin, Clock } from "lucide-react";

const Careers = () => {
  const openPositions = [
    {
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build scalable systems for our ride-sharing platform using React, Node.js, and modern cloud technologies.",
    },
    {
      title: "AI/ML Engineer",
      department: "Engineering",
      location: "Hybrid - Dubai",
      type: "Full-time",
      description: "Develop and optimize our AI-powered matching algorithms to improve ride efficiency and user satisfaction.",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Create intuitive and delightful user experiences that make ride-sharing simple and accessible for everyone.",
    },
    {
      title: "Community Manager",
      department: "Operations",
      location: "Dubai",
      type: "Full-time",
      description: "Build and nurture our community of riders and drivers, ensuring excellent user experiences and engagement.",
    },
  ];

  const benefits = [
    "Competitive salary and equity",
    "Flexible remote work options",
    "Health insurance coverage",
    "Professional development budget",
    "Unlimited PTO policy",
    "Latest tech equipment",
  ];

  return (
    <>
      <Helmet>
        <title>Careers - Join RideShare Team</title>
        <meta name="description" content="Join RideShare and help build the future of smart, sustainable transportation." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          {/* Hero Section */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">
                Join Our Mission
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Help us build the future of smart, sustainable transportation. 
                We're looking for talented individuals who share our passion for innovation.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="bg-muted/30 py-16 mb-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Why RideShare?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-semibold mb-2">Innovation First</h3>
                  <p className="text-muted-foreground">
                    Work with cutting-edge AI and cloud technologies to solve real-world problems
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
                  <p className="text-muted-foreground">
                    Make transportation more accessible and sustainable for communities worldwide
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-xl font-semibold mb-2">Collaborative Culture</h3>
                  <p className="text-muted-foreground">
                    Join a diverse, inclusive team that values every voice and perspective
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section className="container mx-auto px-4 mb-16">
            <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
            <div className="grid gap-6 max-w-5xl mx-auto">
              {openPositions.map((position) => (
                <Card key={position.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                        <CardDescription className="text-base">
                          {position.description}
                        </CardDescription>
                      </div>
                      <Button className="md:shrink-0">Apply Now</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {position.department}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {position.location}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {position.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Benefits & Perks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span>{benefit}</span>
                  </div>
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

export default Careers;
