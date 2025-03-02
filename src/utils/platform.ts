
import { useEffect, useState } from 'react';

// Check if the app is running in a Capacitor environment
export const isCapacitorNative = (): boolean => {
  return (
    typeof (window as any)?.Capacitor !== 'undefined' &&
    (window as any)?.Capacitor?.isNative === true
  );
};

// Hook to check if we're running on a mobile platform
export const usePlatform = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if running in Capacitor native environment
    const isNative = isCapacitorNative();
    
    // Also check screen size as a fallback for testing in browser
    const checkMobile = () => {
      const isMobileSize = window.innerWidth <= 768;
      setIsMobile(isNative || isMobileSize);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.addEventListener('resize', checkMobile);
    };
  }, []);
  
  return { isMobile, isNative: isCapacitorNative() };
};
