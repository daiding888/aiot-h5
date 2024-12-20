import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('../views/Welcome.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  // 设备相关路由
  {
    path: '/device',
    name: 'Device',
    component: () => import('../views/device/index.vue')
  },
  {
    path: '/device/add',
    name: 'DeviceAdd',
    component: () => import('../views/device/add.vue')
  },
  {
    path: '/device/detail/:id',
    name: 'DeviceDetail',
    component: () => import('../views/device/detail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 