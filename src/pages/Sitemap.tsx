import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Sitemap = () => {
  const navigate = useNavigate();

  const sitemapSections = [
    {
      title: "Main Pages",
      links: [
        { label: "Home", href: "/" },
        { label: "Authentication", href: "/auth" },
      ],
    },
    {
      title: "Features",
      links: [
        { label: "Smart Matching", href: "/smart-matching" },
        { label: "Fair Pricing", href: "/fair-pricing" },
        { label: "Community", href: "/community" },
        { label: "Security", href: "/security" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
        { label: "Sitemap", href: "/sitemap" },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Sitemap - RideShare</title>
        <meta name="description" content="Navigate through all pages and features of RideShare platform." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Browse all pages and features available on RideShare
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sitemapSections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => navigate(link.href)}
                          className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Sitemap;
