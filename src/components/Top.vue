<script setup>

import { useRouter, useRoute } from 'vue-router'
import LoginButton from './LoginButton.vue'
import LogoutButton from './LogoutButton.vue'

const router = useRouter();
const route = useRoute();

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
</script>

<template>
  <div class="top">
    <div class="logo" @click="backToHome">
      <img src="/src/assets/logo.png" alt="掘金" />
    </div>
    <component class="user-box" :is="LoginButton" />
  </div>
</template>



<style scoped>
.top {
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
  border: solid 1px;
}
</style>