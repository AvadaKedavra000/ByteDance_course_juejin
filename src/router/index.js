import { createRouter, createWebHashHistory } from 'vue-router'

//创建路由器
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/hot-topics'
    },
    {
      path: '/hot-topics',
      name:'hot-topics',
      component: () => import('../views/HotTopics.vue'),
      // meta: {
      //   index: 2
      // }
    },
    {
      path: '/latest-topics',
      name:'latest-topics',
      component: () => import('../views/LatestTopics.vue'),
      // meta: {
      //   index: 2
      // }
    },
    {
      path: '/browsing-history',
      name:'browsing-history',
      component: () => import('../views/BrowsingHistory.vue'),
      // meta: {
      //   index: 2
      // }
    }
  ]
})
//暴露路由器
export default router