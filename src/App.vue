<script setup lang="ts">
import { defineAsyncComponent } from "vue"

console.log("APP.vue setup")

import Top from './components/Top.vue'
import NavBar from './components/NavBar.vue'
import useInit from "./hooks/useInit.ts"




const { initTheme, initVerification } = useInit();

initTheme();

initVerification();


</script>

<template>
  <Top />
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
  </router-view>
  <NavBar />
</template>

<style lang="scss">
@import "./common/style/handle.scss";

html,
body {
  @include background_color("APP_body_background_color");
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

.router-view {
  -webkit-overflow-scrolling: touch;
  width: 100vw;
  box-sizing: border-box;
}
</style>
