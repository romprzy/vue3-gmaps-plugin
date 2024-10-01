import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import unpluginComponents from 'unplugin-vue-components/vite'

// const host = process.env.VITE_SERVER_HOST
const env = loadEnv('development', process.cwd(), '')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: env.SERVER_HOST,
    port: Number(env.SERVER_PORT),
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
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
      // isProduction: true,
    }),
    dts({
      // rollupTypes: true,
      // include: './components.d.ts',
      tsconfigPath: './tsconfig.build.json',
    }),
    unpluginComponents({
      dts: true,
    }),
  ],
})
