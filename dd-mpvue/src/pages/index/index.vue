<template>
  <div class="index">
    <!--  头部  -->
    <ddHead></ddHead>
    <!--  轮播图  -->
    <ddBan></ddBan>
    <!--  分类  -->
    <ddCate :type="type"></ddCate>
    <!--  广告  -->
    <image class="ad-img" mode="widthFix" src="/static/images/ad1.jpg" />
    <!--  图书列表  -->
    <ddList></ddList>
  </div>
</template>
<script>

import ddHead from "../../components/index/ddHead";
import ddBan from "../../components/index/ddBan";
import ddCate from "../../components/index/ddCate";
import ddList from "../../components/index/ddList";
import store from "../../store/store";
import {mapState,mapMutations} from 'vuex';
export default {
  data() {
    return {
      type:[],
    }
  },
  components: {
    ddHead,
    ddBan,
    ddCate,
    ddList
  },
  onLoad() {
    //将this指向Vue
    let _this = this;
    let {local} = _this.globalData;
    //请求书籍类型
    wx.request({
      url: local+'/typelist',
      success(res) {
        res.data.forEach(item => {
          item.image = local + item.image;
        });
        _this.type = res.data;
      }
    });
    //请求图书列表
    wx.request({
      url: local+'/booklist',
      success(res) {
        res.data.forEach(item => {
          item.image = local+item.image;
        })
        //将数据存入vuex
        store.commit('SET_BOOKLIST',res.data);
      }
    });
  }
}
</script>

<style scoped>
.index {
  background: #f5f5f5;
  border-bottom: 2rpx solid #ccc;
}
.ad-img {
  width: 100%;
  margin-top: 20rpx;
  display: block;
}
</style>
