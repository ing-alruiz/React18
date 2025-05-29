import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Pages': path.resolve(__dirname, './src/Pages'),
      '@Components': path.resolve(__dirname, './src/Components'),
      '@Images': path.resolve(__dirname, './src/assets/images'),
      '@Videos': path.resolve(__dirname, './src/assets/videos'),
      '@Contexts': path.resolve(__dirname, './src/contexts'),
      '@Api': path.resolve(__dirname, './src/Api'),
    },
  },
  server: {
    allowedHosts: ['edaa-2803-5840-1040-800-00-1004.ngrok-free.app']
  }
})
