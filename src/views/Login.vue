<template >
    <div class="outer-box">
        <div class="login-box">
            <div class="inner-box">
                <div class="title">登录</div>
                <div class="input-contain">
                    <label for>用户名</label>
                    <input type="text" v-model="userName" placeholder="用户名" />
                </div>
                <div class="input-contain">
                    <label for>密码</label>
                    <input type="password" v-model="passWord" placeholder="密码" />
                </div>
                <button
                    :class="['confirm', 'button', { onDisabled: isDisabled }]"
                    type="button"
                    :disabled="isDisabled"
                    @click="login"
                >登录</button>
                <div class="register button" @click="toRegister">新用户 - 去注册</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

const router = useRouter();
const store = useStore();

const toRegister = () => {
    router.replace({
        name: 'Register'
    })
}


const userName = ref("")
const passWord = ref("")
const isDisabled = computed(() => {
    if (userName.value && passWord.value) {
        return null
    }
    else {
        return true
        //果值为布尔值 false，则不再移除 attribute。取而代之的是，它将被设置为 attr="false"。若要移除 attribute，应该使用 null 或者 undefined。
    }
})
//是否正在登录
const isLogining = ref(false)
const login = () => {
    isLogining.value = true
    axios.post('https://qcgsjt.api.cloudendpoint.cn/login', {
        userName: userName.value,
        passWord: passWord.value
    }).then((res) => {
        //请求成功的回调函数
        console.log(res)
        if (res.data.code === 401) {        //登录失败
            alert(`登录失败-${res.data.message}`)
        }
        else if (res.data.code === 200) {//成功注册，直接登录
            store.commit("userLogin")
            store.commit("setUserName", userName.value)
            //存储token和用户名
            const token = res.data.token
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userName', userName.value);
            //跳转
            router.push({
                name: 'origin'
            })
        }

    }).catch((err) => {
        //请求失败的回调函数
        console.log(err)
        alert("登录失败!")

    }).finally(() => {
        isLogining.value = false
    })
}
</script>

<style lang="scss" scoped>
.outer-box {
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #daedf7;
    height: 100%;
    box-shadow: 0 -2px 6px rgb(0 0 0 / 10%);
}
.login-box {
    margin-top: 30px;
    width: 70%;
    height: 470px;
    border: 1px solid #000;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
}
.inner-box {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
        font-size: 23px;
        font-weight: 600;
        margin-bottom: 20px;
    }
    .input-contain {
        height: 80px;

        label {
            display: block;
            width: 220px;
            text-align: left;
            font-size: 14px;
        }
        input {
            box-sizing: border-box;
            width: 220px;
            height: 35px;
            padding: 10px;
            border: 1px solid #d9d9d9;
            outline-color: #007fff;
        }
    }
    .confirm {
        margin-top: 20px;
    }
    .button {
        width: 220px;
        height: 35px;
        color: #fff;
        background-color: #007fff;
        margin-bottom: 10px;
        line-height: 35px;
        font-size: 14px;
        border: 0;
    }
    .onDisabled {
        opacity: 0.35;
    }
}
</style>