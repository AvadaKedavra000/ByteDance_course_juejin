<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import NavBar from './components/NavBar.vue'
</script>

<template>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  <NavBar />
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
.router-view{
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
}
</style>
