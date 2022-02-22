<template>
    <div class="LogoutButton">
        <div class="avatar">{{ avatarWord }}</div>
        <div class="logout" @click="logout">退出</div>
    </div>
</template>

<script setup>


import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter();
const route = useRoute();
const store = useStore();

const toUserAuth = () => {
    router.push({
        name: 'UserAuth'
    })
}

//展示的头像名称
const avatarWord = store.state.userName.slice(0, 1)

const logout = () => {
    //改变登录状态，清除用户名
    store.commit("userLogout")
    store.commit("setUserName", "")
    //清除sessionStorage中的userName和token
    sessionStorage.removeItem("userName")
    sessionStorage.removeItem("token")
}

</script>

<style scoped>
.avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: #1d7dfa;
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin-right: 10px;
}
.logout {
    border: solid #1d7dfa 1px;
    background: #fff;
    color: #1d7dfa;
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 5px;
}
.LogoutButton {
    display: flex;
    align-items: center;
}
</style>