import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['edaa-2803-5840-1040-800-00-1004.ngrok-free.app']
  }
})
