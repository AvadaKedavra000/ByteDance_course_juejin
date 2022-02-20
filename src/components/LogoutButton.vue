<template>
    <div class="login">退出</div>
</template>

<script setup>


import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();

const toUserAuth = () => {
    router.push({
        name: 'UserAuth'
    })
}
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