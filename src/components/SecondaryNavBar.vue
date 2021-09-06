<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <li
        v-for="(item,index) in routerLinkList"
        :key="index"
        class="nav-list-item"
        @click="clickSecondaryNav(index)"
        :class="{ active: secondaryNavIndex === index }"
      >
        <span>{{ item.title }}</span>
      </li>
    </ul>
    <TertiaryNavBar :secondaryNavIndex="secondaryNavIndex"  v-show="secondaryNavIndex"/>
  </div>
</template>
  
  <script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import TertiaryNavBar from '../components/TertiaryNavBar.vue'
export default {
  components: {
    TertiaryNavBar
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let secondaryNavIndex = ref(0);
    const routerLinkList = [
      {
        title: "推荐",
        thePath: "recommended"
      },
      {
        title: "后端",
        thePath: "backend"
      },
      {
        title: "前端",
        thePath: "frontend"
      },
      {
        title: "Android",
        thePath: "android"
      },
      {
        title: "ios",
        thePath: "ios"
      },
    ];

    const getPath = () => {
      const routeConfig = {
        name: 'ArticleList',
        params:{
            primaryRoute:`${store.state.primaryNavTitle}`,
            secondaryRoute:`${store.state.secondaryNavTitle}`
        }
      };
      return routeConfig;
    }
    //编程式路由导航
    const clickSecondaryNav = (index) => {
      secondaryNavIndex.value = index;

      //先改变secondaryNavTitle和TertiaryNavTitle
      store.commit('changeSecondaryNavTitle', routerLinkList[index].thePath);
      store.commit('changeTertiaryNavTitle', "全部");
      //再获取跳转路径
      const path = getPath();
      //再进行跳转
      router.push(path);
    }
    return {
      secondaryNavIndex,
      routerLinkList,
      clickSecondaryNav
    }
  }
}
</script>
  
<style lang="scss" scoped>
@import "../common/style/mixin";
/* 定义变量与值 */
$bgColor: #fff;
$textColor: #71777c;
$fontSize: 1rem;
$iconSize: 2rem;
$shadowColor: rgb(0 0 0 / 10%);

/* 使用变量 */
.nav-bar {
  position: sticky;
  //display:flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 2.5rem;
  padding: 2px 0;
  box-shadow: 0 -2px 6px $shadowColor;
  z-index: 999;

  background-color: $bgColor;
  color: $textColor;
  font-size: $fontSize;
  .nav-list {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav-list-item {
      display: flex;
      flex: 1;
      flex-direction: column;
    }
  }
}
.active {
  color: $primary;
}
</style>