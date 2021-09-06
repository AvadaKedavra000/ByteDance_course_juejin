<template>
  <SecondaryNavBar />
  <ul>
    <li>route中获取:</li>
    <li>一级路由:{{route.params.primaryRoute}}</li>
    <li>二级路由:{{route.params.secondaryRoute}}</li>
    <li>三级路由:{{route.params.teriaryRoute}}</li>
    <li>store中获取:</li>
    <li>一级路由:{{store.state.primaryNavTitle}}</li>
    <li>二级路由:{{store.state.secondaryNavTitle}}</li>
    <li>三级路由:{{store.state.tertiaryNavTitle}}</li>
  </ul>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
  <h2>使用Vuex存储三级导航信息！！！从而每次路由跳转时取得想要的结果！</h2>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import SecondaryNavBar from '../components/SecondaryNavBar.vue'
export default {
  name: "ArticleList",
  components: {
    SecondaryNavBar
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    onMounted(() => {console.log('ArticleList组件被挂载啦！'),console.log('route!!!!!!!!',route.params),console.log('store!!!!!',store.state)});
    return {
      route,
      store
    }
  }

}
</script>

<style>
</style>