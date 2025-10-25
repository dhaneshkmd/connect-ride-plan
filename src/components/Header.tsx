import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/logo.png";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Smart Matching", href: "#smart-matching" },
    { label: "Fair Pricing", href: "#fair-pricing" },
    { label: "Community", href: "#community" },
    { label: "Secure", href: "#secure" },
    { label: "Blog", href: "#blog" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="RideShare Logo" className="h-10 w-10" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              RideShare
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate('/auth')} className="bg-gradient-to-r from-primary to-secondary">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 pt-6 border-t">
                  {user ? (
                    <>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <Button variant="ghost" onClick={handleSignOut}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" onClick={() => navigate('/auth')}>Sign In</Button>
                      <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-primary to-secondary">
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
