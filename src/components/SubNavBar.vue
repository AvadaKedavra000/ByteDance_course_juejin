<template>
    <div class="nav">
        <!-- 二级导航 -->
        <!-- 为了保证取得异步数据后再渲染，采用v-if="categoriesReady" -->
        <div class="nav-bar">
            <ul class="nav-list" v-if="categoriesReady">
                <li
                    v-for="(item, index) in categories"
                    :key="item.category_id"
                    class="nav-list-item"
                    @click="clickSecondaryNav(index)"
                    :class="{ active: secondaryNavIndex === index }"
                >
                    <span>{{ item.category_name }}</span>
                </li>
            </ul>
        </div>
        <!-- 三级导航 -->
        <div class="sub-nav-bar" v-if="categoriesReady">
            <ul v-if="secondaryNavIndex != 0" class="sub-nav-list">
                <li
                    v-for="(item, index) in categories[secondaryNavIndex].children"
                    :key="item.category_id"
                    class="sub-nav-list-item"
                    @click="clickTertiaryNav(index)"
                >
                    <span
                        class="sub-tag"
                        :class="{ 'sub-tag-active': tertiaryNavIndex === index }"
                    >{{ item.category_name }}</span>
                </li>
            </ul>
            <ul v-else class="sub-nav-list">
                <li class="sub-nav-list-item">
                    <span class="sub-tag sub-tag-active">推荐</span>
                </li>
            </ul>
        </div>
    </div>
</template>
    
<script setup>
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { getCategories } from '../fake-api/index.js'

const store = useStore();
const router = useRouter();
const route = useRoute();


let categories = ref([]);//导航栏分类数据
let categoriesReady = ref(false);//导航栏分类异步数据是否已经拿到
let secondaryNavIndex = ref(0);
let tertiaryNavIndex = ref(0);

//取得categories,并更新categoriesReady，并获取初始secondaryNavIndex和tertiaryNavIndex
getCategories().then(value => {
    // console.log('SubNavBar的回调,取得categories,并更新categoriesReady，并获取初始secondaryNavIndex和tertiaryNavIndex');
    //取得categories并更新categoriesReady
    categoriesReady.value = true;
    categories.value = value.data.categories;
    //获取初始secondaryNavIndex和tertiaryNavIndex
    const id = store.state.categoryId;
    //若id只代表单层分类,tertiaryNavIndex默认为0;
    if (id <= 9) {
        secondaryNavIndex.value = id;
        tertiaryNavIndex.value = 0;
    }
    else {//否则id代表两层分类,
        secondaryNavIndex.value = Math.floor(id / 10);
        tertiaryNavIndex.value = id % 10;
    }


});



//二级导航栏的编程式路由导航
const clickSecondaryNav = (index) => {
    const getPath = () => {
        const routeConfig = {
            name: 'ArticleList',
            params: {
                primaryRoute: `${store.state.primaryNavTitle}`,
                secondaryRoute: `${store.state.secondaryNavTitle}`
            }
        };
        return routeConfig;
    }

    secondaryNavIndex.value = index;
    tertiaryNavIndex.value = 0;

    //先改变secondaryNavTitle和TertiaryNavTitle
    store.commit('changeSecondaryNavTitle', categories.value[index].category_name);
    store.commit('changeTertiaryNavTitle', "全部");
    //再获取跳转路径
    const path = getPath();
    //再进行跳转
    router.push(path);
}

//三级导航栏的编程式路由导航
const clickTertiaryNav = (index) => {
    const getRouteConfig = () => {
        const routeConfig = {
            name: 'ArticleList',
            params: {
                primaryRoute: `${store.state.primaryNavTitle}`,
                secondaryRoute: `${store.state.secondaryNavTitle}`,
                tertiaryRoute: `${store.state.tertiaryNavTitle}`
            }
        };
        return routeConfig;
    }
    //改变tertiaryNavIndex
    tertiaryNavIndex.value = index;
    //改变TertiaryNavTitle
    store.commit('changeTertiaryNavTitle', categories.value[secondaryNavIndex.value].children[index].category_name);
    //再获取跳转路径
    const routeConfig = getRouteConfig();
    //再进行跳转
    router.push(routeConfig);
}


</script>  
  
  
  
  
<style lang="scss" scoped>
@import "../common/style/handle.scss";
@import "../common/style/mixin";

/* 定义变量与值 */
$bgColor: #fff;
$textColor: #71777c;
$fontSize: 1rem;
$shadowColor: rgb(0 0 0 / 10%);
/* 使用变量 */
.nav {
    box-sizing: border-box;
}
.nav-bar {
    @include background_color("SubNavBar_nav_bar_background_color");

    width: 100%;
    height: $SubBarHeight * 0.5;
    padding: 2px 0;
    box-shadow: 0 -2px 6px $shadowColor;
    //z-index: 999;

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
    .active {
        color: $primary;
    }
}

$sub-bgColor: #f4f5f5;
$sub-textColor: #71777c;
$sub-fontSize: 0.8rem;
.sub-nav-bar {
    box-sizing: border-box;
    width: 100%;
    height: $SubBarHeight * 0.5;
    padding: 2px 0;
    box-shadow: 0 -2px 6px $shadowColor;
    z-index: 999;
    @include background_color("SubNavBar_sub_nav_bar_background_color");

    font-size: $sub-fontSize;
    .sub-nav-list::-webkit-scrollbar {
        display: none;
    }
    .sub-nav-list {
        width: 100%;
        height: 100%;
        padding: 0 20px;
        margin: 0;
        display: flex;
        overflow-x: scroll;

        align-items: center;
        .sub-nav-list-item {
            display: flex;
            margin-right: 2rem;
            justify-content: center;
        }
        .sub-tag {
            @include background_color("SubNavBar_sub_tag_background_color");
            @include border_color("SubNavBar_sub_tag_border_color");
            @include font_color("SubNavBar_sub_tag_color");
            //background-color: #f2f3f5;
            border: 6px solid;

            border-radius: 20px;
            white-space: nowrap;
        }
        .sub-tag-active {
            @include background_color(
                "SubNavBar_sub_tag_active_background_color"
            );
            @include font_color("SubNavBar_sub_tag_active_color");
            @include border_color("SubNavBar_sub_tag_active_border_color");
            //background-color: $primary;
            border-color: $primary;
            //color: #fff;
        }
    }
}
</style>