import { defineConfig } from 'unocss'

export default defineConfig({
  // 这里可以添加你的unocss配置
  rules: [
    // 示例规则
    ['text-primary', { color: '#646cff' }],
    ['bg-secondary', { backgroundColor: '#f0f0f0' }],
  ],
  shortcuts: {
    // 示例快捷方式
    'btn': 'px-4 py-2 rounded-md bg-primary text-white hover:bg-opacity-90',
  },
})