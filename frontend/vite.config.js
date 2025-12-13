import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Backend listens on 5050 in this project
      '/api': 'http://localhost:5050',
    },
  },
})
