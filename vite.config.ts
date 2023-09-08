/// <reference types="vitest" />
/// <reference types="vite/client" />


import { defineConfig } from 'vite';
// import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';




// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: "./src/test/setup.ts",
  },
  plugins: [react()],
  server: {
    // host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // '/api/pg/dbInfo': { 
        //   target: 'http://localhost:3000' ,
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, '')
        //   // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@esbuild/darwin-arm64': 'path-to-correct-entry-file', // replace with the correct path
    },
  },
});


