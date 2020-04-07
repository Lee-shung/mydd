<template>
  <div class="dd-list">
    <div @click="toDetail(book.id)" class="book-item" v-for="(book,index) in bookList" :key="index">
      <image class="img" :src="book.image" mode="widthFix" />
      <div class="book-info">
        <div class="name">{{book.name}}</div>
        <text class="dd-zy">当当自营</text>
        <text class="dd-cut">满减</text>
        <p class="price">￥{{book.price}}</p>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "ddList",
        computed: {
          ...mapState(['bookList'])
        },
        methods: {
          toDetail(id) {
            wx.navigateTo({
              url: '/pages/detail/main?id='+id,
            })
          }
        }
    }
</script>

<style scoped>
.dd-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.book-item {
  width: 370rpx;
  background: #ffffff;
  margin-top: 10rpx;
}
.book-info {
  box-sizing: border-box;
  padding: 0 0 10rpx 8rpx;
}
.img {
  width: 100%;
}
.dd-zy{
  color: #f2303c;
  border: 2rpx solid #f2303c;
  padding: 0 4rpx;
  margin-right: 6rpx;
  font-size: 28rpx;
  border-radius: 4rpx;
}
.dd-cut {
  background: #f2303c;
  color: #ffffff;
  font-size: 28rpx;
  border-radius: 4rpx;
  padding: 0 4rpx;
}
.price {
  color: #f2303c;
  font-size: 32rpx;
}
.name {
  width: 100%;
  height: 72rpx;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
