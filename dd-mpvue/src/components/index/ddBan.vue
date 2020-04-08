<template>
  <swiper class="banner" indicator-dots="true"
          autoplay="true"
          indicator-color="rgba(0, 0, 0, .3)"
          indicator-active-color="#ffffff">
    <swiper-item v-for="(url,index) in bannerList" :key="index">
      <image class="banner-img" :src="url" mode="widthFix"/>
    </swiper-item>
  </swiper>
</template>

<script>
  export default {
        name: "ddBan",
        data() {
          return {
            bannerList: [
              '/static/images/banner1.jpg',
              '/static/images/banner2.jpg',
              '/static/images/banner3.jpg',
              '/static/images/banner4.jpg',
              '/static/images/banner5.jpg',
              '/static/images/banner6.jpg',
              '/static/images/banner7.jpg',
              '/static/images/banner8.jpg',
            ],
          }
        },
        computed: {

        },
        mounted() {

        }
    }
</script>

<style scoped>
.banner {
  height: 200rpx;
}
.banner-img {
  width: 100%;
}
</style>
