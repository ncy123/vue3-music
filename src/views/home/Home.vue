<template>
  <div class="home">
    <my-head />
  <router-view></router-view>

  <song-bofang class="bofang"></song-bofang>
  </div>
</template>

<script setup>
import HomeHead from "views/home/homeChild/HomeHead.vue";
import MyHead from "components/MyHead.vue";
import SongBofang from "components/SongBofang.vue";
</script>

<style lang="less" scoped>
.home{
  padding-bottom: 80px;
}
.bofang {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

