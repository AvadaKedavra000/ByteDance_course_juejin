<template>
  <div class="nav-bar van-hairline--top">
    <ul class="nav-list">
      <li
        v-for="(item,index) in routerLinkList"
        :key="index"
        class="nav-list-item"
        @click="clickPrimaryNav(index)"
      >
        <i class="iconfont" :class="[item.iconName, { active: primaryNavIndex === index }]"></i>
        <span :class="{ active: primaryNavIndex === index }">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    let primaryNavIndex = ref(0);

    const routerLinkList = [
      {
        title: "热门",
        thePath: "hot",
        iconName: "icon-hot",
      },
      {
        title: "最新",
        thePath: "newest",
        iconName: "icon-lights",
      },
      {
        title: "历史",
        thePath: "history",
        iconName: "icon-history",
      },
    ];

    //获取跳转路径
    const getRouteConfig = () => {
      const routeConfig = {
        name: 'ArticleList'
      };
      if (store.state.secondaryNavTitle === "recommended") {
        routeConfig.params = { primaryRoute:`${store.state.primaryNavTitle}`};
      }
      else {
        if (store.state.tertiaryNavTitle === "全部") {
          routeConfig.params = {
            primaryRoute:`${store.state.primaryNavTitle}`,
            secondaryRoute:`${store.state.secondaryNavTitle}`
          };
        }
        else {
          routeConfig.params = {
            primaryRoute:`${store.state.primaryNavTitle}`,
            secondaryRoute:`${store.state.secondaryNavTitle}`,
            tertiaryRoute:`${store.state.tertiaryNavTitle}`
        };
        }
      }
      return routeConfig;
    }
    //编程式路由导航
    const clickPrimaryNav = (index) => {
      primaryNavIndex.value = index;
      //先改变PrimaryNavTitle
      store.commit('changePrimaryNavTitle', routerLinkList[index].thePath);
      //若点击[历史]，则直接跳转，否则继续判断
      if (index === 2) {
        router.push('/history');
      }
      else {
        //获取跳转路径
        const routeConfig = getRouteConfig();
        //再进行跳转
        router.push(routeConfig);
      }

    }
    return {
      primaryNavIndex,
      routerLinkList,
      clickPrimaryNav
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../common/style/mixin";
/* 定义变量与值 */
$bgColor: #fff;
$textColor: #71777c;
$fontSize: 0.8rem;
$iconSize: 2rem;
$shadowColor: rgb(0 0 0 / 10%);

/* 使用变量 */
.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 2px 0;
  box-shadow: 0 -2px 6px $shadowColor;
  z-index: 999;

  background-color: $bgColor;
  color: $textColor;
  font-size: $fontSize;
  .nav-list {
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    .nav-list-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      i {
        font-size: $iconSize;
        overflow: hidden;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
      .active {
        color: $primary;
      }
    }
  }
}
</style>