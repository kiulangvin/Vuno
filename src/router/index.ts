import { createRouter, createWebHistory } from 'vue-router'

// 定义路由组件
// 这里我们可以导入我们的页面组件
// 例如: import HomeView from '../views/HomeView.vue'

// 定义路由
const routes = [
  {
    path: '/',
    name: 'home',
    // 组件可以在这里直接定义，或者导入
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导出路由实例
export default router