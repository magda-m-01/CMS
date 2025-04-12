import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Only enable HTTPS in development
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: isDev ? {
    proxy: {
      '^/weatherforecast': {
        target: 'http://localhost:5205/',
        secure: false
      }
    },
    port: 5173,
    https: false // Disable HTTPS in Docker build
  } : undefined,
  build: {
    // Production build settings
    outDir: 'dist',
    assetsDir: 'static'
  }
}));