import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],

  build: {
    // Output to wordpress-plugin/dist when building for WordPress
    outDir: mode === 'wordpress' ? 'wordpress-plugin/dist' : 'dist',

    // Generate manifest.json for WordPress plugin
    manifest: true,

    // Empty outDir before build
    emptyOutDir: true,

    // Remove console statements in production
    minify: 'esbuild',
  },

  esbuild: {
    drop: ['console', 'debugger'],
  },

  // Set base path for WordPress plugin assets
  base: mode === 'wordpress' ? './' : '/',
}))
