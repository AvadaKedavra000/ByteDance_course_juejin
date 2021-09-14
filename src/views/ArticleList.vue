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
    <li>sortBy:{{ store.state.sortBy }}</li>
    <li>categoryId:{{ store.state.categoryId }}</li>
  </ul>
  <h2>内容区域~~~~~~~~~~~~~</h2>
  <List />
</template>


<script setup>
import { onMounted,ref} from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import SubNavBar from '../components/SubNavBar.vue'
import List from '../components/List.vue'
import { getArticles } from '../fake-api/index.js'
const route = useRoute();
const store = useStore();


onMounted(() => {
  console.log('ArticleList组件被挂载啦！');

  //设置store.primaryNavTitle,store.secondaryNavTitle,store.tertiaryNavTitle
  const getPrimaryNavTitle = (value) => {
    if (typeof value == 'string' && value.length > 0) {
      return value;
    }
    else {
      return "热门";
    }
  }
  const getSecondaryNavTitle = (value) => {
    if (typeof value == 'string' && value.length > 0) {
      return value;
    }
    else {
      return "推荐";
    }
  }
  const getTertiaryNavTitle = (value) => {
    if (typeof value == 'string' && value.length > 0) {
      return value;
    }
    else {
      return "全部";
    }
  }
  store.commit("changePrimaryNavTitle", getPrimaryNavTitle(route.params.primaryRoute));
  store.commit("changeSecondaryNavTitle", getSecondaryNavTitle(route.params.secondaryRoute));
  store.commit("changeTertiaryNavTitle", getTertiaryNavTitle(route.params.tertiaryRoute));

});


let res = null;
const ret = getArticles().then(a => {
  res = a;
  console.log('res', res);
  console.log('我获取数据啦！！！！！！！！！！！！！！')
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