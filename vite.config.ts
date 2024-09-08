import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'Vue3GmapsPlugin',
      fileName: 'vue3-gmaps-plugin',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue({
      isProduction: true,
      features: {
        customElement: true,
      },
    }),
    dts({
      tsconfigPath: './tsconfig.build.json',
    }),
  ],
})
