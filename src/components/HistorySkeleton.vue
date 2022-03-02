<template>
    <div class="skeleton-box" v-for="x in 3" :key="x">
        <div class="skeleton-box-top">
            <Skeleton width="10%" height="15px" />
            <Skeleton width="10%" height="15px" :style="{ marginLeft: '10px' }" />
        </div>
        <div class="skeleton-box-bottom">
            <div class="left">
                <Skeleton width="95%" height="15px" />
                <Skeleton width="75%" height="15px" />
                <Skeleton width="75%" height="15px" />
            </div>
            <div class="right">
                <Skeleton width="120px" height="88px" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Skeleton from './Skeleton.vue'

</script>

<style lang="scss">
.skeleton-box {
    width: 100%;
    padding: 12px 20px;
    box-sizing: border-box;
}
.skeleton-box-top {
    display: flex;
}
.skeleton-box-bottom {
    height: 100px;
    display: flex;
    justify-content: space-around;

    .left {
        width: 75%;
        //flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .right {
        width: 25%;
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }
}
</style>