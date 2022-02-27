<script setup>

import { useRouter, useRoute } from 'vue-router'
import LoginButton from './LoginButton.vue'
import LogoutButton from './LogoutButton.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'

const router = useRouter();
const route = useRoute();
const store = useStore();

console.log('hello script setup')

const backToHome = () => {
  router.push({
    name: 'origin'
  })
}


const toUserAuth = () => {
  router.push({
    name: 'UserAuth'
  })
}





//测试
//换主题
const changeTheme = (theme) => {
  localStorage.setItem("data-theme", theme)
  document.documentElement.setAttribute("data-theme", theme);
}


</script>

<template>
  <div class="top">
    <div class="logo" @click="backToHome">
      <img src="/src/assets/logo.png" alt="掘金" />
    </div>
    <!-- 测试 -->

    <button @click="changeTheme('dark')">变成深色</button>
    <button @click="changeTheme('light')">变成浅色</button>

    <LogoutButton v-if="store.state.be_logged_in" class="user-box" />
    <LoginButton v-else class="user-box" />
  </div>
</template>



<style lang="scss" scoped>
@import "../common/style/handle.scss";

.common-util {
  font-size: 18px;
  @include font_color("font_color1");
  @include background_color("background_color1");
  @include border_color("border_color1");
}

.top {
  @include background_color("Top_background_color");
  position: relative;
  width: 100vw;
  height: 60px;
  padding: 0 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #f4f5f5;
}
.logo {
  height: 100%;
  display: flex;
  align-items: center;
}
.user-box {
  position: relative;
  left: -20px;
  top: 0;
  border: 0;
}
</style>