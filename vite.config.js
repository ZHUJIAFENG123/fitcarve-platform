# 检查文件是否存在
ls -la vite.config.js

# 如果不存在，重新创建
echo "import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0'
  },
  base: './'
})" > vite.config.js