<template>
  <div class="nav-bar van-hairline--top">
    <ul class="nav-list">
      <router-link tag="li" class="nav-list-item" to="/hot-topics" active-class="active">
        <i class="iconfont icon-hot"></i>
        <span>热门</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="/latest-topics" active-class="active">
        <i class="iconfont icon-lights"></i>
        <span>最新</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="/browsing-history" active-class="active">
        <i class="iconfont icon-history"></i>
        <span>历史</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scope>
@import "../common/style/mixin";
/* 定义变量与值 */
$bgColor: #fff;
$textColor: darkblue;
$fontSize: 0.8rem;
$iconSize: 2rem;
$shadowColor: rgb(0 0 0 / 10%);

/* 使用变量 */
.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 2px 0;
  box-shadow: 0 -2px 6px $shadowColor;
  z-index: 999;

  background-color: $bgColor;
  color: $textColor;
  font-size: $fontSize;
  .nav-list {
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    .nav-list-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      i {
        font-size: $iconSize;
        overflow: hidden;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
.active {
  color: $primary;
}
</style>