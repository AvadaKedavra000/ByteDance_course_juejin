<template>
  <SubNavBar />
<!-- 
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
  <h2>内容区域~~~~~~~~~~~~~</h2> -->
  <List />
</template>


<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import SubNavBar from '../components/SubNavBar.vue'
import List from '../components/List.vue'
const route = useRoute();
const store = useStore();
onMounted(() => { console.log('ArticleList组件被挂载啦！'), console.log('route!!!!!!!!', route.params), console.log('store!!!!!', store.state) });



import { getArticles } from '../fake-api/index.js'
let res = null;
const ret = getArticles().then(a => {
  res = a;
  console.log('res',res);
});

</script>

<script>
export default {
  name: "ArticleList"
}
</script>

<style>
ul li {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
</style>