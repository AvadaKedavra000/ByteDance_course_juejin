<template>
    <div class="Switch">
        <div class="text">Dark Side</div>
        <div class="switch" :class="{ switchOn: isLight === false }">
            <div class="switch-bg" :class="{ 'switch-bg-on': isLight === false }">
                <div
                    class="switch-btn"
                    :class="{ 'switch-btn-on': isLight === false }"
                    @click="openSwitch"
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isLight = ref(localStorage.getItem("data-theme") === "light" ? true : false)

const changeTheme = (theme) => {
    localStorage.setItem("data-theme", theme)
    document.documentElement.setAttribute("data-theme", theme);
}

const openSwitch = () => {
    isLight.value = !isLight.value;
    changeTheme(isLight.value ? 'light' : 'dark')
}
</script>

<style lang="scss" >
@import "../common/style/handle.scss";

.Switch {
    display: flex;
    align-items: center;
    margin-right: 20px;
}
.text {
    @include font_color("Switch_text_color");
}
.switch {
    margin-left: 10px;
    width: 36px;
    height: 20px;
    border-radius: 50px;
    border: 0px;
    position: relative;
}

.switch-btn {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #efefef;
    position: absolute;
    background-color: #fff;
    top: 1px;
    left: 1px;
    transition: left 0.3s;
}
.switch-bg {
    background-color: #dfdfdf;
    width: 36px;
    height: 20px;
    border-radius: 50px;
    transition: width 0.3s;
}

.switch-btn-on {
    left: 20px;
}
.switch-bg-on {
    background-color: #007aff;
}
</style>