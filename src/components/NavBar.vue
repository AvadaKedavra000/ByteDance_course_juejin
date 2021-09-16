<template>
  <div class="nav-bar" v-show="isShow">
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
import { onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useRoute } from 'vue-router'
import { getCategories } from '../fake-api/index'

export default {
  setup() {
    let primaryNavIndex = ref(0);
    let isShow = ref(true);//是否展示NavBar导航栏
    console.log('初始Index', primaryNavIndex.value);
    const router = useRouter();
    const store = useStore();

    //全局路由守卫
    router.beforeEach((to, from) => {
      console.log('NavBar中的路由守卫被触发了');
        console.log('to.name', to.name);
        console.log('to.params', to.params);
        console.log('to.params.primaryRoute', to.params.primaryRoute);

      if (to.name === "ArticleDetails") {//若是文章详情页，不需要NavBar导航栏
        isShow.value = false;
        return true;
      }
      else {
        isShow.value = true;
        //取得primaryNavIndex并赋值
        const getPrimaryNavIndex = () => {
          if (to.name === 'history') {
            return 2;
          }
          else if (to.name === 'origin') {
            return 0;
          }
          else if (to.name === 'ArticleList') {
            if (to.params.primaryRoute === "hot") {
              return 0;
            }
            else if (to.params.primaryRoute === "new") {
              return 1;
            }
          }
        }
        primaryNavIndex.value = getPrimaryNavIndex();
        console.log('后来Index', primaryNavIndex.value);

        //设置store.sortBy
        const getSortBy = (Index) => {
          let sortBy = "";
          if (Index === 0) {
            return "hot";
          }
          else if (Index === 1) {
            return "new"
          }
        }
        const sortBy = getSortBy(primaryNavIndex.value);
        store.commit("setSortBy", sortBy);

        //取得分类id并设置store.categoryId
        getCategories().then(res => {
          const categories = res.data.categories;
          console.log(categories);
          //通过分类名称获取分类id
          const getCategoryIdFromName = (name1, name2) => {
            //若name2不为空,查找两层循环
            if (typeof name2 == 'string' && name2.length > 0) {
              for (const first of categories) {
                if (name1 === first.category_name) {
                  if (name2 === "全部") {
                    return first.category_id;
                  }
                  else {
                    for (const second of first.children) {
                      if (name2 === second.category_name) {
                        return second.category_id
                      }
                    }
                  }
                }
              }
            }
            else {//否则只用查找一层循环
              for (const first of categories) {
                if (name1 === first.category_name) {
                  return first.category_id
                }
              }
            }
            return 0;
          }
          const id = getCategoryIdFromName(to.params.secondaryRoute, to.params.tertiaryRoute);
          //提交
          store.commit("setCategoryId", id);
        })

        return true
      }

    })




    const route = useRoute();
    console.log('NavBar被setup！！！ route~~~~', route.params);
    onMounted(() => {
      console.log('NavBar被挂载啦！！！ route~~~~', route.params);
    })

    const routerLinkList = [
      {
        title: "热门",
        thePath: "hot",
        iconName: "icon-hot",
      },
      {
        title: "最新",
        thePath: "new",
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
        routeConfig.params = { primaryRoute: `${store.state.primaryNavTitle}` };
      }
      else {
        if (store.state.tertiaryNavTitle === "全部") {
          routeConfig.params = {
            primaryRoute: `${store.state.primaryNavTitle}`,
            secondaryRoute: `${store.state.secondaryNavTitle}`
          };
        }
        else {
          routeConfig.params = {
            primaryRoute: `${store.state.primaryNavTitle}`,
            secondaryRoute: `${store.state.secondaryNavTitle}`,
            tertiaryRoute: `${store.state.tertiaryNavTitle}`
          };
        }
      }
      return routeConfig;
    }
    //编程式路由导航
    const clickPrimaryNav = (index) => {
      console.log('click___route.params', route.params)
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
      isShow,
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
  // position: sticky;
  // left: 0;
  // bottom: 0;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;

  width: 100%;
  height: $NavBarHeight;
  display: flex;
  align-items: center;
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