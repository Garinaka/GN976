import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Rediriger les requêtes API vers le backend
      '/api': 'http://localhost:5000',  // Assure-toi que ton serveur backend tourne sur ce port
    },
  },
});
