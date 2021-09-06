<template>
  <div class="tertiary-nav-bar">
    <ul class="nav-list">
      <li
        v-for="(item,index) in routerLinkList[secondaryNavIndex]"
        :key="index"
        class="nav-list-item"
        @click="clickTertiaryNav(index)"
      >
        <span class="tag" :class="{ active: tertiaryNavIndex === index }">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>
  
  <script>
import { ref,reactive,watch} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  props: {
    //当前二级列表索引
    secondaryNavIndex: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    //用watch监听secondaryNavIndex的变化？？？？？一改变就令tertiaryNavIndex=0!!!!!!!!
    const store=useStore();
    const router=useRouter();
    let tertiaryNavIndex = ref(0);    //当前三级列表索引
    const routerLinkList = [[
      //空数组
    ],
    [
      {
        title: "全部",
        thePath: "全部"
      },
      {
        title: "Java",
        thePath: "Java"
      },
      {
        title: "Python",
        thePath: "Python"
      },
      {
        title: "Go",
        thePath: "Go"
      }
    ], [
      {
        title: "全部",
        thePath: "全部"
      },
      {
        title: "JavaScript",
        thePath: "JavaScript"
      },
      {
        title: "Vue.js",
        thePath: "Vue.js"
      },
      {
        title: "React.js",
        thePath: "React.js"
      }
    ], [
      {
        title: "全部",
        thePath: "全部"
      },
      {
        title: "Flutter",
        thePath: "Flutter"
      },
      {
        title: "Java",
        thePath: "Java"
      },
      {
        title: "Kotlin",
        thePath: "Kotlin"
      }
    ], [
      {
        title: "全部",
        thePath: "全部"
      },
      {
        title: "Swift",
        thePath: "Swift"
      },
      {
        title: "Objective-C",
        thePath: "Objective-C"
      },
      {
        title: "Flutter",
        thePath: "Flutter"
      }
    ]
    ];
    
    const myProps = reactive(props);
    watch(()=>myProps.secondaryNavIndex, (newMyProps, prevMyProps) => {
      tertiaryNavIndex.value=0;
    })

    const getRouteConfig = () => {
      const routeConfig = {
        name: 'ArticleList',
        params:{
            primaryRoute:`${store.state.primaryNavTitle}`,
            secondaryRoute:`${store.state.secondaryNavTitle}`,
            tertiaryRoute:`${store.state.tertiaryNavTitle}`
        }
      };
      return routeConfig;
    }
    //编程式路由导航
    const clickTertiaryNav = (index) => {
      tertiaryNavIndex.value = index;
      //改变TertiaryNavTitle
      store.commit('changeTertiaryNavTitle', routerLinkList[props.secondaryNavIndex][index].thePath);
      //再获取跳转路径
      const routeConfig = getRouteConfig();
      //再进行跳转
      router.push(routeConfig);
    }
    return {
      tertiaryNavIndex,
      routerLinkList,
      clickTertiaryNav
    }
  }
}
</script>
  
  <style lang="scss" scoped>
@import "../common/style/mixin";
/* 定义变量与值 */
$bgColor: #f4f5f5;
$textColor: #71777c;
$fontSize: 0.8rem;
$iconSize: 2rem;
$shadowColor: rgb(0 0 0 / 10%);
//注意!,根元素不能还使用.nav-bar这个类名！！！
//https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B7%E7%94%A8%E6%9C%AC%E5%9C%B0%E5%92%8C%E5%85%A8%E5%B1%80%E6%A0%B7%E5%BC%8F
//使用 scoped 后，父组件的样式将不会渗透到子组件中。
//不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。
//这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。
/* 使用变量 */
.tertiary-nav-bar {
  position: sticky;
  //display:flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 2.5rem;
  padding: 2px 0;
  box-shadow: 0 -2px 6px $shadowColor;
  z-index: 999;
  color: #f4f5f5;
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
      justify-content: center;
    }
    .tag {
      background-color: #fff;
      border: 6px solid #fff;
      border-radius: 20px;
    }
    .active {
      background-color: $primary;
      border-color:$primary;
      color: #fff;
    }
  }
}
</style>