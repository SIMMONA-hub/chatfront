import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/chatfrontend/', // замените на название вашего репозитория
  build: {
    outDir: 'dist',
  }
})      
