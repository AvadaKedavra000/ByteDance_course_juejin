<template>
  <SubNavBar />
  <List id="List" />
</template>


<script setup>
console.log("ArticleList.vue setup")

import { onMounted, ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
import SubNavBar from '../components/SubNavBar.vue'
import List from '../components/List.vue'
import { getArticles } from '../fake-api/index.js'
const route = useRoute();
const store = useStore();


onMounted(() => {
  // console.log('ArticleList组件被挂载啦！');

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
.ArticleList {
  margin-bottom: 60px;
}
</style>