import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite exposes env vars that start with VITE_ to the client bundle.
  // Your .env file should contain:
  //   VITE_SUPABASE_URL=...
  //   VITE_SUPABASE_ANON_KEY=...
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Chunk strategy: keep Supabase SDK separate from app code
    rollupOptions: {
      output: {
        manualChunks: {
          'supabase': ['@supabase/supabase-js'],
          'react-vendor': ['react', 'react-dom'],
          'icons': ['lucide-react'],
        },
      },
    },
  },
})
