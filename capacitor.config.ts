import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'SOSecurity',
  webDir: 'dist/angularfirebase',
  server: {
    androidScheme: 'https'
  }
};

export default config;
