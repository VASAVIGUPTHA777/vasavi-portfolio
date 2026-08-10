import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5000, // Vite frontend port
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Pointing to your Express backend
        changeOrigin: true,
      },
    },
  },
});