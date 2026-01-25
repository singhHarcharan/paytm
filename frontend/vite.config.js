import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Changed from './' to '/' for proper routing
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable sourcemaps in production for smaller bundle size
    minify: 'terser', // Minify the output
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor and app code
          vendor: ['react', 'react-dom', 'react-router-dom', 'axios'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    // Proxy API requests to your backend
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // Add cache control headers for production
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  },
})
