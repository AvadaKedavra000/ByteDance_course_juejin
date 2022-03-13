<template >
    <div v-show="isShow" class="login" @click="toUserAuth">登录/注册</div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();

const toUserAuth = () => {
    router.push({
        name: 'Login'
    })
}

const isShow = ref(true)
//全局路由守卫
router.beforeEach((to, from) => {
    //若是文章详情页,注册,登录页,不需要NavBar导航栏
    if (to.name === "Login" || to.name === "Register") {
        isShow.value = false;
        return true;
    }
    else {
        isShow.value = true;
        return true
    }

})
</script>

<style scoped>
.login {
    border: solid 1px;
    background: #1d7dfa;
    color: #fff;
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 5px;
}
</style>