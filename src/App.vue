<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Top from './components/Top.vue'
const router=useRouter();

</script>

<template>
  <Top />
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view v-slot="{ Component }" class="router-view">
      <component :is="Component" />
    </router-view>
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
  font-family: -apple-system,system-ui,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial;
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
.router-view{
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
