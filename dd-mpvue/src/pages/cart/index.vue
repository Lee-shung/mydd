<template>
  <div class="cart">
    <div class="cart-item" v-for="(cartitem,index) in cart" :key="index">
      <div class="cart-info">
        <icon @click="changeRadio(index)" type="success" size="16" :color="cartitem.isChecked?'#f2303c':'#ccc'" class="icon"></icon>
        <image :src="cartitem.image" class="img" />
        <div class="info">
          <text class="name">
            {{cartitem.name}}
          </text>
          <div class="price">
            <div style="position: relative;width: 200rpx;font-weight: bold">
              <text class="new_price">
                ￥{{cartitem.price}}
              </text>
              <text class="old_price">
                ￥{{cartitem.old_price}}
              </text>
            </div>
            <div class="change_num">
              <text @click="cut(index)" class="change_btn cut">-</text>
              <text class="num">
                {{cartitem.count}}
              </text>
              <text @click="add(index)" class="change_btn add">+</text>
            </div>
          </div>
        </div>
      </div>
      <div class="youhui">
        <text class="add-buy">加购价</text>
        <text class="buy-one">购买1件，即可享受换购优惠</text>
        <text class="to-select">去选择</text>
        <text class="iconfont icon-you"></text>
      </div>
    </div>
    <div class="compute">
      <icon @click="changeCheckAll" type="success" size="16" :color="isCheckAll?'#f2303c':'#ccc'"></icon>
      <text style="margin: 0 20rpx">全选</text>
      <text> 合计：</text>
      <text style="font-weight: bold;display: inline-block;width: 230rpx;text-align: left">￥{{total}}</text>
      <text style="background: #f2303c;height: 76rpx;width: 200rpx;border-radius: 76rpx;display: inline-block;text-align: center;color: #fff">
        结算({{selectNum}})
      </text>
    </div>
  </div>
</template>

<script>
export default {
    name: 'cart',
    data() {
      return {
        cart: []
      }
    },
    computed: {
      //计算总价
      total() {
        let result = 0;
        this.cart.forEach(item => {
          if (item.isChecked) {
            result += item.count*item.price;
          }
        });
        return result.toFixed(2);
      },
      //选中的件数
      selectNum() {
        let count = 0;
        this.cart.forEach(item => {
          if (item.isChecked) {
            count ++;
          }
        });
        return count;
      },
      //是否全选
      isCheckAll() {
        return this.cart.every(item => {
          return item.isChecked;
        });
      }
    },
    methods: {
      //改变单选框
      changeRadio(index) {
        this.cart[index].isChecked = !this.cart[index].isChecked;
      },
      //改变全选状态
      changeCheckAll() {
        let isCheckAll = !this.isCheckAll;
        let arr = [];
        arr = this.cart.filter(item => {
          item.isChecked = isCheckAll;
          return item;
        });
        this.cart = arr;
      },
      //减少商品数量
      cut(index) {
        if (this.cart[index].count <= 1) {
          return;
        }
        this.cart[index].count --;
      },
      //添加商品数量
      add(index) {
        this.cart[index].count ++;
      }
    },
    //页面显示时读取缓存
    onShow() {
      let cart = wx.getStorageSync('cart');
      // console.log(cart);
      this.cart = cart;
    },
    //页面消失时更新缓存
    onHide() {
      // console.log(this.cart);
      wx.setStorageSync('cart',this.cart);
    }
}
</script>

<style>
.cart {
  background: #f5f5f5;
  width: 100%;
  border-top: 2rpx solid #ccc;
  padding: 0 20rpx;
  box-sizing: border-box;
}
.cart-item {
  padding: 36rpx 28rpx 36rpx 16rpx;
  background: #fff;
  margin-top: 16rpx;
  border-radius: 30rpx;
}
.cart-info {
  height: 160rpx;
  display: flex;
}
.name {
  position: relative;
  top: -48rpx;
  left: 0;
  font-size: 28rpx;
}
.icon {
  padding-top: 70rpx;
}
.img {
  height: 100%;
  width: 140rpx;
  margin: 0 20rpx;
}
.price {
  display: flex;
  line-height: 1;
  margin-top: 14rpx;
}
.new_price {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 28rpx;
  color: #f2303c;
}
.old_price {
  position: absolute;
  bottom: 0;
  right: 0;
  text-decoration: line-through;
  font-size: 24rpx;
  color: #aaa;
}
.num {
  font-size: 28rpx;
}
.change_btn {
  width: 38rpx;
  height: 38rpx;
  border-radius: 50%;
  line-height: 38rpx;
  text-align: center;
  background: #f8f8f8;
  position: absolute;
  bottom: 0rpx;
  font-size: 36rpx;
}
.cut {
  left: 0rpx;
}
.add {
  right: 0rpx;
}

.change_num {
  width: 160rpx;
  position: relative;
  text-align: center;
  margin-left: 72rpx;
}
.add-buy {
  border: 2rpx solid #f2303c;
  border-radius: 4rpx;
  color: #f2303c;
  font-size: 24rpx;
  line-height: 1;
  padding: 0 4rpx;
  margin-right: 10rpx;
  margin-left: 40rpx;
}
.buy-one {
  color: #aaa;
}
.to-select {
  color: #444444;
  margin-left: 120rpx;
}
.youhui {
  font-size: 24rpx;
  margin-top: 52rpx;
}
.compute {
  background: #fff;
  line-height: 86rpx;
  padding: 0 20rpx;
  position: fixed;
  bottom: 0;
  overflow: hidden;
  height: 82rpx;
}
</style>
