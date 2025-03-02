
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e524ab61217347e18a3af9297ce9fcc7',
  appName: 'gestureflow-portal',
  webDir: 'dist',
  server: {
    url: "https://e524ab61-2173-47e1-8a3a-f9297ce9fcc7.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
      releaseType: 'APK'  // Setting specifically to APK instead of AAB
    }
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      splashFullScreen: true,
      splashImmersive: true
    },
    Permissions: {
      camera: "prompt"
    }
  }
};

export default config;
