import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const API_URL = 'https://2gfztglkwi.execute-api.us-east-1.amazonaws.com';

export default defineConfig({
  base: '/jujo-cars-fe/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
