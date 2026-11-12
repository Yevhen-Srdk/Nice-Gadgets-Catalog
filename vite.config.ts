import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@type': path.resolve(__dirname, './src/types'),
      '@shared': path.resolve(__dirname, './src/modules/shared'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
})
