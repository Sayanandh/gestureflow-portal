
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { usePlatform } from "@/utils/platform";
import MobileLayout from "./MobileLayout";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isMobile } = usePlatform();
  
  // Use mobile-specific layout when on mobile platforms
  if (isMobile) {
    return <MobileLayout>{children}</MobileLayout>;
  }
  
  // Web layout
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
