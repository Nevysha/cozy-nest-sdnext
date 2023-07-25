import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore
  plugins: [react({
    babel: {
      plugins: ['@babel/plugin-syntax-import-assertions'],
    },
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },

  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  base: '/cozy-nest-dev'
})
