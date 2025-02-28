
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-effect py-3 shadow-soft"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-semibold tracking-tight animate-fade-in"
          >
            <span className="text-primary">Gesture</span>
            <span>Flow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/image-upload" label="Image" />
            <NavLink to="/video-upload" label="Video" />
            <NavLink to="/webcam" label="Live Capture" />
            <Button asChild variant="default" size="sm" className="px-4 rounded-full">
              <Link to="/about">About</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 animate-slide-in">
            <nav className="flex flex-col space-y-3">
              <MobileNavLink to="/" label="Home" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/image-upload" label="Image Upload" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/video-upload" label="Video Upload" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/webcam" label="Live Capture" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/about" label="About" onClick={() => setIsMobileMenuOpen(false)} />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Helper components
const NavLink = ({ to, label }: { to: string; label: string }) => (
  <Link 
    to={to} 
    className="text-foreground/80 hover:text-primary transition-all duration-200 text-sm font-medium"
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, onClick }: { to: string; label: string; onClick: () => void }) => (
  <Link 
    to={to} 
    className="text-foreground py-2 px-3 hover:bg-primary/10 rounded-md transition-all-ease text-sm font-medium"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Header;
