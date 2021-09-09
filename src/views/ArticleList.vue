<template>
  <SubNavBar />

  <ul>
    <li>route中获取:</li>
    <li>一级路由:{{ route.params.primaryRoute }}</li>
    <li>二级路由:{{ route.params.secondaryRoute }}</li>
    <li>三级路由:{{ route.params.tertiaryRoute }}</li>
    <li>store中获取:</li>
    <li>一级路由:{{ store.state.primaryNavTitle }}</li>
    <li>二级路由:{{ store.state.secondaryNavTitle }}</li>
    <li>三级路由:{{ store.state.tertiaryNavTitle }}</li>
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
import { onMounted, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import SubNavBar from '../components/SubNavBar.vue'
import SecondaryNavBar from '../components/SecondaryNavBar.vue'

export default {
  name: "ArticleList",
  components: {
    SecondaryNavBar,
    SubNavBar
    // SubNavBar: defineAsyncComponent(() =>
    //   import('../components/SubNavBar.vue')
    // )
  },
  setup() {
    console.log('ArticleList的setup开始执行');
    const route = useRoute();
    const store = useStore();
    onMounted(() => { console.log('ArticleList组件被挂载啦！'), console.log('route!!!!!!!!', route.params), console.log('store!!!!!', store.state) });
    console.log('ArticleList的setup结束执行');
    return {
      route,
      store
    }
  }

}
</script>

<style>
</style>