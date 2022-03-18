<template>
  <template v-if="!isLoading">
    <div class="list-box" v-if="history_article.length">
      <ListItem :data="history_article" class="ListItem" />
      <Observer :handle-intersect="getMoreData" root-selector=".list-box" />
    </div>
    <div class="tips" v-else>
      <span>历史记录为空,快去【掘金】吧~</span>
    </div>
  </template>
  <HistorySkeleton v-else />
</template>


<script setup>
console.log('History.vue setup')

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref, computed, watch } from 'vue'
import { getArticleById, getCommentsByArticleId } from '../fake-api/index.js'
import ListItem from '../components/ListItem.vue'
import Observer from '../components/Observer.vue'
import HistorySkeleton from '../components/HistorySkeleton.vue'
import { useStore } from 'vuex'
import axios from 'axios'

const store = useStore();

//当前组件的历史数据是否在加载中
const isLoading = ref("true")

const be_logged_in = computed(() => store.state.be_logged_in)//是否为登录态

const history_article = ref([])//存放用户历史数据
const offset = ref(0)//偏移量
const limit = 20//每次获取的数目
let hasMore = true


//游客获取数据
const visitorGetData = (offsetVal, limitVal, finallyCallback = null) => {
  if (!hasMore) { return }
  //从localStorage获取游客历史记录
  const historyLocalItem = localStorage.getItem("history")
  const historyObj = historyLocalItem ? JSON.parse(historyLocalItem) : { article_id: [] }
  const articleIdArr = historyObj.article_id

  if (offsetVal > articleIdArr.length) {
    hasMore = false
    return
  }

  for (let i = offsetVal; i < offsetVal + limitVal; i++) {
    getArticleById(articleIdArr[i]).then(res => {
      history_article.value.push(res.data.article)
    }, err => {
      console.log(err)
    })
  }
  offset.value += limitVal

  finallyCallback && finallyCallback()
}

//用户获取数据
const userGetData = (offsetVal, limitVal, finallyCallback = null) => {
  if (!hasMore) { return }

  const token = sessionStorage.getItem('token')
  const userName = sessionStorage.getItem('userName')

  axios.post('https://qcgsjt.api.cloudendpoint.cn/getHistoryRecords', {
    token: token,
    userName: userName,
    offset: offsetVal,
    limit: limitVal
  }).then((res) => {
    //请求成功的回调函数
    console.log(res)
    if (res.data.code === 200) {//查询成功
      const articleIdArr = res.data.history_article.reverse()
      if (articleIdArr.length) {
        //根据id获取历史文章信息
        for (const item of articleIdArr) {
          getArticleById(item).then(res => {
            history_article.value.push(res.data.article)
          }, err => {
            console.log(err)
          })
        }
        //更新offset信息
        offset.value += limitVal
      }
      else {
        hasMore = false
      }
    }
    else {
      //
    }
    finallyCallback && finallyCallback()
  }).catch((err) => {
    //请求失败的回调函数
    console.log(err)
    alert("认证失败!")
    finallyCallback && finallyCallback()
  })
}

//初始获取游客/用户历史数据
const getHistoryArticle = () => {
  isLoading.value = true

  if (!be_logged_in.value) {//1.若为游客状态
    console.log("游客状态")
    visitorGetData(offset.value, limit, () => { isLoading.value = false })
  }
  else {//2.否则从服务器获取记录
    console.log('登录状态')
    userGetData(offset.value, limit, () => { isLoading.value = false })
  }
}

//触底后获取更多游客/用户历史数据
const getMoreData = () => {
  if (!hasMore) { return }
  console.log('到底了')
  const be_logged_in = computed(() => store.state.be_logged_in)

  if (!be_logged_in.value) {//1.若为游客状态
    visitorGetData(offset.value, limit)
  }
  else {//2.否则从服务器获取记录
    userGetData(offset.value, limit)
  }

}



//是否在全局初始化(查询用户登录状态等)
const isGlobalInitializing = computed(() => store.state.isGlobalInitializing)

//全局初始化是异步操作，它的完成时机和本组件渲染的时机是不确定的，故分两种情况:

//1.若本组件setup后，全局初始化已经完成,isGlobalInitializing才从true转为false，可以通过watch观察到
watch(isGlobalInitializing, (newValue, oldValue) => { !newValue && getHistoryArticle() })

//2.若本组件setup前,全局初始化已经完成,此时isGlobalInitializing已经为false,可直接获取用户历史数据
if (!isGlobalInitializing.value) { getHistoryArticle() }


</script>
<script>
export default {
  name: 'History'
}
</script>

<style>
.list-box {
  height: calc(100% - 120px);
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
}
/* .ListItem {
  height: 83vh;
  overflow-y: scroll;
} */
</style>