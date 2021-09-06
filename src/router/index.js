import { createRouter, createWebHashHistory } from 'vue-router'

//创建路由器
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      // redirect: '/hot'
      component: () => import('../views/ArticleList.vue'),
    },
    // {
    //   path: '/hot',
    //   component: () => import('../views/Hot.vue'),
    // },
    // {
    //   path: '/newest',
    //   name: 'newest',
    //   component: () => import('../views/Newest.vue'),
    // },
    {
      path: '/:primaryRoute?/:secondaryRoute?/:tertiaryRoute?',
      name: 'ArticleList',
      component: () => import('../views/ArticleList.vue'),
    },
    {
      path: '/hot/:secondaryRoute?/:tertiaryRoute?',
      name: 'HotArticleList',
      component: () => import('../views/ArticleList.vue'),
    },
    {
      path: '/newest/:secondaryRoute?/:tertiaryRoute?',
      name: 'NewestArticleList',
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