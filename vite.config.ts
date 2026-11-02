import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite's dev and preview servers fall back to index.html for client-side routes.
// A static host must be configured with the same fallback (see README).
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
