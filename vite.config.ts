import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/vue3-gmaps-plugin/vue3-gmaps-plugin.ts'),
      name: 'vue3-gmaps-plugin',
      fileName: 'vue3-gmaps-plugin',
    },
    rollupOptions: {
      input: './src/vue3-gmaps-plugin/vue3-gmaps-plugin.ts',
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue()],
})
