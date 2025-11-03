import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = {
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
    Features: [
      { label: "Smart Matching", href: "/smart-matching" },
      { label: "Fair Pricing", href: "/fair-pricing" },
      { label: "Community", href: "/community" },
      { label: "Security", href: "/security" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="RideShare Logo" className="h-10 w-10" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                RideShare
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting riders and drivers for smarter, safer, and more affordable journeys.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} RideShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
