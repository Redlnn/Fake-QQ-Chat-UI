import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import fg from 'fast-glob'
import path from 'path'

const optimizeDeps = [
  ...fg.globSync(['dayjs/plugin/*.js'], {
    cwd: path.resolve('node_modules'),
    onlyFiles: true
  })
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  optimizeDeps: {
    include: optimizeDeps
  }
})
