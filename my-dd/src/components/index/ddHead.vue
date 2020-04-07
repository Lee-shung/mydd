<template>
    <header>
      <i class="logo"></i>
      <div class="search">
        <input class="s-input iconfont" placeholder="Lily超品日，3折封顶">
      </div>
      <i class="iconfont icon-caidan menu"></i>
    </header>
</template>

<script>
    export default {
        name: "ddHead"
    }
</script>

<style>
header {
  padding: 10rpx 0;
  position: relative;
  background: #ffffff;
}
.logo {
  display: inline-block;
  width: 64rpx;
  height: 64rpx;
  background: url("../../../static/images/ddlogo.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 50%;
  margin: 0 20rpx;
}
.search {
  display: inline-block;
}
.search .s-input {
  padding: 0 20rpx 0 52rpx;
  background: #f4f4f4;
  outline: none;
  border-radius: 32rpx;
  display: inline-block;
  line-height: 64rpx;
  width: 468rpx;
  height: 64rpx;
  position: relative;
}
.s-input::-webkit-input-placeholder {
  font-size: 24rpx;
  color: #ccc;
}
.search .s-input::before {
  content: '\e65a';
  position: absolute;
  left: 20rpx;
  top: 0rpx;
}
.menu {
  display: inline-block;
  width: 36rpx;
  height: 36rpx;
  font-size: 36rpx;
  position: absolute;
  right: 40rpx;
  top: 20rpx;
}
</style>
