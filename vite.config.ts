import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
const basePath = process.env.VITE_BASE_PATH ?? '/';

export default defineConfig({
  base: basePath.endsWith('/') ? basePath : `${basePath}/`,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [react()],
});
