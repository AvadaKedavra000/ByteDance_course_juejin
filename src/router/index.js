import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
//创建路由器
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      // name: 'home',
      path:'/home',
      component: Home,
      // meta: {
      //   index: 1
      // }
    },
    {
      // name: 'about',
      path:'/about',
      component: About,
      // meta: {
      //   index: 2
      // }
    }
  ]
})
//暴露路由器
export default router