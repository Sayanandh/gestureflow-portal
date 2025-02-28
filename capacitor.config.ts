
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
      releaseType: 'APK'
    }
  }
};

export default config;
