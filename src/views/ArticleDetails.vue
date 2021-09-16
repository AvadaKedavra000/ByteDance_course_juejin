<template>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
    <p>哈哈哈</p>
</template>

<script setup>
    import { getArticleById } from '../fake-api/index.js'
    import {useRoute} from 'vue-router'
    const route=useRoute();
    const article_id=route.params.article_id;
    getArticleById(article_id).then((res)=>{
        const article=res.data.article
        console.log(article);
    })
</script>

<style>

</style>