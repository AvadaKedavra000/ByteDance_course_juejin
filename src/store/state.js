/*
刷新页面后Vuex中状态会重置!!!
*/

import { useRoute } from 'vue-router'
const route=useRoute();
console.log('state.js中的route',route);
export default {
    primaryNavTitle: "hot",
    secondaryNavTitle:"recommended",
    tertiaryNavTitle:"全部",
    sortBy:"",//文章列表排序 'hot' 代表热门， 'new' 代表最新
    categoryId:0,//文章分类Id
    offset:0,
    limit:20,
    history:[]//历史浏览文章内容
}