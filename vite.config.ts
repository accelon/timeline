import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
         assetFileNames: '[name][extname]',
        entryFileNames: '[name].js', // Custom path for entry files
        chunkFileNames: 'chunks/[name].js', // Custom path for chunk files
      },
    },
  },    
  optimizeDeps: {
        
  },  
  plugins: [svelte()],
  server: {
    port: 3000, // Change to your desired port
  }
})
