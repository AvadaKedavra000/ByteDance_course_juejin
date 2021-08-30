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
        <van-icon name="shopping-cart-o" :badge="!count ? '' : count" />
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

<style lang="scss" scope>
/* 定义变量与值 */
$bgcolor: lightblue;
$textcolor: darkblue;
$fontsize: 18px;

/* 使用变量 */
.nav-bar {

  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  z-index: 999;

  background-color: $bgcolor;
  color: $textcolor;
  font-size: $fontsize;
  .nav-list {
        width: 100%;
        padding: 0;
  }
}
</style>