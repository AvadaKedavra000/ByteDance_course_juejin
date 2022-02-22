<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import NavBar from './components/NavBar.vue'
import Top from './components/Top.vue'
const router = useRouter();
const route = useRoute();
const store = useStore();

//验证lastToken和lastUserName是否仍有效
const lastToken = sessionStorage.getItem('token')
const lastUserName = sessionStorage.getItem('userName')

axios.post('https://qcgsjt.api.cloudendpoint.cn/validate', {
  token: lastToken,
  secret: lastUserName
}).then((res) => {
  //请求成功的回调函数
  console.log(res)
  if (res.data.code === 401) {        //若认证失败
    //静默
  }
  else if (res.data.code === 200) {//认证成功，更新vuex中be_logged_in和userName信息
    store.commit("userLogin")
    store.commit("setUserName", lastUserName)
  }

}).catch((err) => {
  //请求失败的回调函数
  console.log(err)
  alert("认证失败!")

})

</script>

<template>
  <Top />
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <keep-alive>
    <router-view class="router-view"></router-view>
  </keep-alive>

  <NavBar />
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
  overflow-y: hidden;
  overflow-x: hidden;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell,
    Noto Sans, sans-serif, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", Arial;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
/* .router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  
} */
.router-view {
  /* padding-bottom:300px; */
  -webkit-overflow-scrolling: touch;
  /* height: 100%; */
  /* overflow-y: scroll; */
  width: 100%;
  /* height: 92vh; */
  box-sizing: border-box;
  /* position: absolute;
  top: 0;
  bottom: 0; */
  /* margin: 0 auto; */
}
</style>
