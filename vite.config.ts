import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss()],
  server: {
    port: 3000,
    strictPort: true, // Force port 3000, don't auto-increment
  },
  build: {
    target: 'esnext',
  },
});
