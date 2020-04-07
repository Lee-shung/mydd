<template>
    <div class="dd-cate">
      <div class="item" v-for="(category,index) in type" :key="index">
        <image class="img" :src="category.image" mode="widthFix" />
      </div>
    </div>
</template>

<script>
    export default {
        name: "ddCate",
        props: ['type'],
    }
</script>

<style scoped>
.dd-cate {
  width: 100%;
  background: #ffffff;
}
.item {
  width: 150rpx;
  display: inline-block;
}
.img {
  width: 100%;
}

</style>
