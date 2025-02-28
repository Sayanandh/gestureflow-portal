
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 mt-auto border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
              <span className="text-primary">Gesture</span>
              <span>Flow</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering communication through sign language interpretation using advanced technology.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-sm">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/image-upload" label="Image Upload" />
              <FooterLink to="/video-upload" label="Video Upload" />
              <FooterLink to="/webcam" label="Live Capture" />
              <FooterLink to="/about" label="About" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-sm">Connect</h3>
            <div className="flex flex-col space-y-2">
              <FooterLink to="#" label="Contact Us" />
              <FooterLink to="#" label="Privacy Policy" />
              <FooterLink to="#" label="Terms of Service" />
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-border/40 text-center text-xs text-muted-foreground">
          <p>© {currentYear} GestureFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <Link 
    to={to} 
    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
  >
    {label}
  </Link>
);

export default Footer;
