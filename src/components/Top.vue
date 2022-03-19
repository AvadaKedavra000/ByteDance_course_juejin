<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

import Switch from './Switch.vue'

// import LoginButton from './LoginButton.vue'
// import LogoutButton from './LogoutButton.vue'

const LoginButton = defineAsyncComponent(() => import('./LoginButton.vue'))
const LogoutButton = defineAsyncComponent(() => import('./LogoutButton.vue'))


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



</script>

<template>
  <div class="top">
    <div class="logo" @click="backToHome">
      <img src="/src/assets/logo.png" alt="掘金" />
    </div>
    <Switch></Switch>
    <LogoutButton v-if="store.state.be_logged_in" class="user-box" />
    <LoginButton v-else class="user-box" />
  </div>
</template>



<style lang="scss" scoped>
@import "../common/style/mixin";
@import "../common/style/handle.scss";

.top {
  @include background_color("Top_background_color");
  position: relative;
  width: 100vw;
  height: $TopHeight;
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