import { createRouter, createWebHashHistory } from 'vue-router'

//创建路由器
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      // redirect: '/hot',
      name:'origin',
      component: () => import('../views/ArticleList.vue')
    },
    {
      path: '/:primaryRoute?/:secondaryRoute?/:tertiaryRoute?',
      name: 'ArticleList',
      component: () => import('../views/ArticleList.vue'),
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/History.vue'),
    }
  ]
})
//暴露路由器
export default router