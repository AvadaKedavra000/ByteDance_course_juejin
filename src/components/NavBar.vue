<template>
    <div class="nav-bar van-hairline--top">
    <ul class="nav-list">
      <router-link tag="li" class="nav-list-item active" to="home">
        <i class="nbicon nblvsefenkaicankaoxianban-1"></i>
        <span>首页</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="category">
        <i class="nbicon nbfenlei"></i>
        <span>分类</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="cart">
        <van-icon  name="shopping-cart-o" :badge="!count ? '' : count" />
        <span>购物车</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="user">
        <i class="nbicon nblvsefenkaicankaoxianban-"></i>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>