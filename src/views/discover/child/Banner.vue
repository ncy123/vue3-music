<template>
  <el-carousel :interval="2000" type="card" height="366px" trigger="click" class="swiper" v-if="bannerData != null" style="background-color: white">
    <el-carousel-item v-for="(item, index) in bannerData" :key="index" style="overflow: scroll">
      <div class="imgs">
        <img v-lazy="item.imageUrl" οnerrοr="javascript:src='assets/img/logo.png';" alt />
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<script setup>
import { defineProps, reactive } from "vue";

const props = defineProps({
  name: String,
  bannerData: Array,
});
</script>


<style lang="less" scoped>
.el-carousel__item {
  .imgs {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
    //line-height: 265px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

// .swiper {
//   width: calc(100% - 20px);
//   margin-left: 10px;
// }
</style>