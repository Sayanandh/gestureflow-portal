
import { ReactNode } from "react";
import { Home, Image, FileVideo, Camera, Info } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Mobile App Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-md py-4 px-6">
        <h1 className="text-xl font-bold text-primary-foreground">GestureFlow</h1>
      </div>
      
      {/* Content with mobile padding */}
      <main className="flex-grow pt-16 pb-20 px-4">
        {children}
      </main>
      
      {/* Mobile App Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card shadow-[0_-2px_10px_rgba(0,0,0,0.05)] h-16 flex items-center justify-around">
        <NavItem 
          to="/" 
          icon={<Home className="h-5 w-5" />} 
          label="Home" 
          isActive={isActive('/')} 
        />
        <NavItem 
          to="/image-upload" 
          icon={<Image className="h-5 w-5" />} 
          label="Images" 
          isActive={isActive('/image-upload')} 
        />
        <NavItem 
          to="/video-upload" 
          icon={<FileVideo className="h-5 w-5" />} 
          label="Videos" 
          isActive={isActive('/video-upload')} 
        />
        <NavItem 
          to="/webcam" 
          icon={<Camera className="h-5 w-5" />} 
          label="Camera" 
          isActive={isActive('/webcam')} 
        />
        <NavItem 
          to="/about" 
          icon={<Info className="h-5 w-5" />} 
          label="About" 
          isActive={isActive('/about')} 
        />
      </nav>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center h-full px-2 transition-colors ${
        isActive ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};

export default MobileLayout;
