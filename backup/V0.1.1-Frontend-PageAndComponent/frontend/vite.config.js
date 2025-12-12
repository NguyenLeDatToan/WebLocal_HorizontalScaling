import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT) || 3000,
    host: true, // Cho phép truy cập từ bên ngoài
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:20000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/db': {
        target: 'http://localhost:29500',
        changeOrigin: true
      }
    }
  }
})