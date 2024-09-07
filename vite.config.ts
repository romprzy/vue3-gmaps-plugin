import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/vue3-gmaps-plugin/vue3-gmaps-plugin.ts'),
      name: 'Vue3GmapsPlugin',
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
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.build.json',
    }),
  ],
})
