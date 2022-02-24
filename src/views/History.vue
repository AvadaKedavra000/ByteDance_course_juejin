<template>
  <ListItem v-if="history_article.length" :data="history_article" class="ListItem" />
  <div class="tips" v-else>
    <span>历史记录为空,快去【掘金】吧~</span>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { getArticleById, getCommentsByArticleId } from '../fake-api/index.js'
import ListItem from '../components/ListItem.vue'
import { useStore } from 'vuex'
import axios from 'axios'

const store = useStore();

const history_article = ref([])
const be_logged_in = ref(store.state.be_logged_in)

if (!be_logged_in.value) {//若为游客状态
  //从sessionStorage获取游客历史记录
  const historySessionItem = sessionStorage.getItem("history")
  const historyObj = historySessionItem ? JSON.parse(historySessionItem) : { article_id: [] }
  const articleIdArr = historyObj.article_id

  for (const item of articleIdArr) {
    getArticleById(item).then(res => {
      history_article.value.push(res.data.article)
    }, err => {
      console.log(err)
    })
  }
}
else {//否则从服务器获取记录
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

  }).catch((err) => {
    //请求失败的回调函数
    console.log(err)
    alert("认证失败!")

  })
}
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