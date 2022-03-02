<template>
  <template v-if="!isLoading">
    <ListItem v-if="history_article.length" :data="history_article" class="ListItem" />
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
import HistorySkeleton from '../components/HistorySkeleton.vue'
import { useStore } from 'vuex'
import axios from 'axios'

const store = useStore();

//当前组件的历史数据是否在加载中
const isLoading = ref("true")

//存放用户历史数据
const history_article = ref([])


//获取用户历史数据
const getHistoryArticle = () => {
  isLoading.value = true

  const be_logged_in = computed(() => store.state.be_logged_in)
  //const be_logged_in = ref(store.state.be_logged_in)

  if (!be_logged_in.value) {//1.若为游客状态
    console.log('游客状态')
    console.log(be_logged_in.value)
    //从localStorage获取游客历史记录
    const historyLocalItem = localStorage.getItem("history")
    const historyObj = historyLocalItem ? JSON.parse(historyLocalItem) : { article_id: [] }
    const articleIdArr = historyObj.article_id

    for (const item of articleIdArr) {
      getArticleById(item).then(res => {
        history_article.value.push(res.data.article)
      }, err => {
        console.log(err)
      })
    }

    isLoading.value = false
  }
  else {//2.否则从服务器获取记录
    console.log('登录状态')
    const token = sessionStorage.getItem('token')
    const userName = sessionStorage.getItem('userName')

    axios.post('https://qcgsjt.api.cloudendpoint.cn/getHistoryRecords', {
      token: token,
      userName: userName
    }).then((res) => {
      //请求成功的回调函数
      console.log(res)
      if (res.data.code === 200) {//查询成功
        const articleIdArr = res.data.history_article.reverse()
        //根据id获取历史文章信息
        for (const item of articleIdArr) {
          getArticleById(item).then(res => {
            history_article.value.push(res.data.article)
          }, err => {
            console.log(err)
          })
        }
      }
      else {
        //
      }
      isLoading.value = false
    }).catch((err) => {
      //请求失败的回调函数
      console.log(err)
      alert("认证失败!")
      isLoading.value = false
    })
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
.ListItem {
  height: 83vh;
  overflow-y: scroll;
}
</style>