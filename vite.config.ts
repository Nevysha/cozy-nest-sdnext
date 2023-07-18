import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore
  plugins: [react()],

  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  base: '/cozy-nest-dev'
})
