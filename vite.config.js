import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const { resolve } = require('path'); //引入path模块

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'components': resolve(__dirname, './src/components'),
      'assets': resolve(__dirname, './src/assets'),
      'views': resolve(__dirname, './src/views'),
      'network': resolve(__dirname, './src/network'),
      'router': resolve(__dirname, './src/router'),
      'store': resolve(__dirname, './src/store')
    },
  },
  dev: {
    host: '127.0.0.1'
  },
  server: {
    port:8006
  },
});

// .set('@', resolve('./src'))
// .set('components', resolve('./src/components'))
// .set('assets', resolve('./src/assets'))
// .set('views', resolve('./src/views'))
// .set('request', resolve('./src/request'))
// .set('store', resolve('./src/store'))
// .set('utils', resolve('./src/utils'));
