import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Environment detection
const isDev = process.env.NODE_ENV === 'development';
const isDocker = process.env.DOCKER_ENV === 'true';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      // Proxy all API requests
      '/api': {
        target: isDocker ? 'http://backend:5000' : 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // Original weather forecast endpoint (if still needed)
      '^/weatherforecast': {
        target: 'http://localhost:5000',
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    sourcemap: mode === 'development' // Enable sourcemaps in dev
  },
  // Docker-specific settings
  define: {
    'process.env.DOCKER_ENV': JSON.stringify(process.env.DOCKER_ENV || 'false')
  }
}));