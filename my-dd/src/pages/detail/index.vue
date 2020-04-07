<template>
  <div class="detail">
    <div class="book-img">
        <image class="img" :src="book.image" mode="widthFix"/>
    </div>
    <div class="book-info">
        <text class="dd-zy">当当自营</text>
        <text class="book-name">{{book.name}}</text>
        <div class="book-desc">
          {{book.desc}}
        </div>
        <div class="price">￥
          <text class="new-price">{{book.price}} </text>
          <text class="discount"> ({{book.discount}}折)</text>
          <text class="iconfont icon-jiangjiatixing cut-icon"><text class="cut-price"> 降价通知</text></text>
        </div>
        <div class="old-price">定价
          <text class="del-line">￥{{book.old_price}}</text>
        </div>
    </div>
    <div class="bottom">
      <div class="shop item">
        <text class="iconfont icon-shop- icon"></text>
        <p>店铺</p>
      </div>
      <div @click="toCart" class="cart item">
        <text class="iconfont icon-gouwuche1 icon"></text>
        <p>购物车</p>
      </div>
      <div class="buy btn item">
        立即购买
      </div>
      <div @click="addToCart(book)" class="add-cart btn item">
        加入购物车
      </div>
    </div>
  </div>
</template>

<script>
// Use Vuex
import {mapState} from 'vuex';
export default {
  name:'detail',
  data() {
    return {
      book:{}
    }
  },
  methods: {
    addToCart(book) {
      //获取缓存的购物车
      let cart = wx.getStorageSync("cart")||[];
      //判断当前商品id是否存在
      let index = cart.findIndex(item => {
        return item.id == book.id;
      });
      if (index == -1) {
        book.isChecked = true;
        book.count = 1;
        cart.push(book);
      } else {
        cart[index].count += 1;
      }
      //更新购物车
      wx.setStorageSync('cart',cart);
      //提示
      wx.showToast({
        title: '添加成功！',
        icon: 'success',
        duration: 2000
      });
    },
    toCart() {
      wx.switchTab({
        url:'/pages/cart/main'
      })
    }
  },
  computed: {
    ...mapState(['bookList'])
  },
  onLoad(options) {
    let {id} = options;
    let _this = this;
    wx.request({
      url:'http://localhost:9001/detail?id='+id,
      success(res) {
        let book = res.data;
        book.discount = (book.price/book.old_price*10).toFixed(2);
        book.price = (book.price).toFixed(2);
        book.old_price = (book.old_price).toFixed(2);
        _this.book = book;
      }
    });
    // this.bookList.forEach(item => {
    //   if (item.id == id) {
    //     item.discount = (item.price/item.old_price*10).toFixed(2);
    //     item.price = (item.price).toFixed(2);
    //     item.old_price = (item.old_price).toFixed(2);
    //     this.book = item;
    //   }
    // });
  }
}
</script>

<style>
.detail {
  width: 100%;
  background: #f5f5f5;
}
.book-img {
  width: 100%;
  border-top: 2rpx solid #ccc;
  border-bottom: 2rpx solid #ccc;
}
.img {
  width: 100%;
}
.book-info {
  background: #ffffff;
  padding: 36rpx 28rpx;
}
.dd-zy {
  color: #fff;
  background: #f2303c;
  display: inline-block;
  font-size: 24rpx;
  line-height: 36rpx;
  border-radius: 18rpx;
  padding: 0 10rpx;
  margin-right: 4rpx;
}
.book-desc {
  margin: 20rpx 0;
  color: #777;
  font-size: 28rpx;
  /* 多行文本溢出 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.book-name {
  color: #444;
}
.price {
  color: #f2303c;
  font-size: 28rpx;
  line-height: 80rpx;
}
.new-price {
  font-size: 40rpx;
}
.discount {
  color: #777;
}
.cut-icon {
  color: #333;
  border: 2rpx solid #333;
  /*padding: 12rpx 12rpx 12rpx 48rpx;*/
  padding: 6rpx 12rpx;
  border-radius: 28rpx;
  margin-left: 24rpx;
}
.cut-price {
  font-size: 28rpx;
}
.old-price {
  color: #777;
}
.del-line {
  text-decoration: line-through;
}
.bottom {
  margin-top: 12rpx;
  width: 100%;
  background: #fff;
  text-align: center;
  color: #444;
  height: 100rpx;
  overflow: hidden;
}
.bottom::after {
  content: '';
  display: block;
  clear: both;
}
.item {
  float: left;
}
.icon {
  font-size: 56rpx;
}
.shop {
  width: 14%;
  line-height: 1;
}
.cart {
  width: 28%;
  line-height: 1;

}
.btn {
  width: 29%;
  color: #fff;
  line-height: 100rpx;

}
.buy {
  background: #ffc200;
}
.add-cart {
  background: #f2303c;
}
</style>
