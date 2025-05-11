import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react(), tailwindcss(),],
    server: {
      host: true, // needed to expose Vite to external
      allowedHosts: ['.ngrok-free.app'],
      port: 5173, // or any port you're using
    },
  };
});