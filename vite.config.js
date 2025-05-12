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
    allowedHosts: ['e343-223-123-119-34.ngrok-free.app'],
  },
  };
});