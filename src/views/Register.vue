<template >
    <div class="outer-box">
        <div class="login-box">
            <div class="inner-box">
                <div class="title">注册</div>
                <div class="input-contain">
                    <label for>用户名</label>
                    <input type="text" />
                </div>
                <div class="input-contain">
                    <label for>密码</label>
                    <input type="text" />
                </div>
                <div class="input-contain">
                    <label for>确认密码</label>
                    <input type="text" />
                </div>
                <div class="confirm button">注册</div>
                <div class="register button" @click="toLogin">已有账号-返回登录</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter();

const toLogin = () => {
    router.push({
        name: 'Login'
    })
}
</script>

<style lang="scss" scoped>
.outer-box {
    display: flex;
    justify-content: center;
    align-content: center;
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
    height: 90%;
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
    }
}
</style>