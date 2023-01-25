import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./client', import.meta.url))
    }
  },
  build: {
    outDir: './dev-build/frontend',
    assetsDir: './assets',
    minify: false,
    watch: {}
  }
})