import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'dev.gmaps.romprzy.local',
    port: 9013,
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src/vue3-gmaps-plugin/') },
    ],
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/vue3-gmaps-plugin/index.ts'),
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
      // isProduction: true,
    }),
    // dts({
    //   tsconfigPath: './tsconfig.build.json',
    //   exclude: 'src/examples',
    // }),
  ],
})
