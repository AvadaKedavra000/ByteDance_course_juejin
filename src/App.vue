<script setup lang="ts">
import { defineAsyncComponent } from "vue"

console.log("APP.vue setup")

// const Top = defineAsyncComponent(() => import("./components/Top.vue"))
// const NavBar = defineAsyncComponent(() => import("./components/NavBar.vue"))
// const useInit = defineAsyncComponent(() => import("./hooks/useInit.ts"))

import Top from './components/Top.vue'
import NavBar from './components/NavBar.vue'
import useInit from "./hooks/useInit.ts"

// const Top = () => import("./components/Top.vue");
// const NavBar = () => import("./components/NavBar.vue");
// const useInit = () => import("./hooks/useInit.ts");


const { initTheme, initVerification } = useInit();

initTheme();

initVerification();


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
  width: 100vw;
  /* height: 92vh; */
  box-sizing: border-box;
  /* position: absolute;
  top: 0;
  bottom: 0; */
  /* margin: 0 auto; */
}
</style>
