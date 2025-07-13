import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig((mode :any) => {
  const root = process.cwd();
  const { VITE_APP_API_BASE_URL, VITE_API_PREFIX } = loadEnv(mode, root);
  return {
    plugins: [vue(), unocss()],
    server: {
      port: 10020,
      proxy: {
        [VITE_API_PREFIX]: {
          target: VITE_APP_API_BASE_URL,
          secure: false,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${VITE_API_PREFIX}`), "")
        },
        // 示例
        '/api': {
          target: 'http://localhost:3000', // 后端服务地址
          changeOrigin: true, // 允许跨域
          rewrite: (path) => path.replace(/^\/api/, '') // 移除路径中的/api前缀
        }
      }
    },
  }
}
)
