import { createRouter, createWebHashHistory } from 'vue-router'

//创建路由器
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      // redirect: '/hot',
      name: 'origin',
      component: () => import('../views/ArticleList.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/:primaryRoute?/:secondaryRoute?/:tertiaryRoute?',
      name: 'ArticleList',
      component: () => import('../views/ArticleList.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/History.vue'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/:article_id',
      name: 'ArticleDetails',
      component: () => import('../views/ArticleDetails.vue'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue'),
      meta: {
        keepAlive: true
      }
    },
  ],
})
//暴露路由器
export default router