<template>
  <div class="w" style="height: 420px">
    <h4>最新音乐</h4>
    <ul style="height: 400px">
      <li v-for="(item, index) in newMusicData" :key="index">
        <span class="nums">{{ index + 1 }}</span>
        <div class="imgs" @click="playClick(index)">
          <img
            v-lazy="item.picUrl"
            οnerrοr="javascript:src='assets/img/logo.png';"
            alt
          />
        </div>
        <div class="icons" @click="playClick(index)">
          <p
            v-show="data.isBofang[index]"
            class="icons iconfont icon-zantingtingzhi"
          ></p>
          <p
            v-show="!data.isBofang[index]"
            class="icons iconfont icon-bofang"
          ></p>
        </div>
        <p class="name">{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { reactive, ref, defineProps } from "vue";
import emitter from "assets/js/event.js";

const state = defineProps({
  newMusicData: Array,
});
const data = reactive({
  isBofang: new Array(10).fill(false),
});

const playClick = (index) => {
  if (!data.isBofang[index]) {
    let song = JSON.parse(JSON.stringify(state.newMusicData[index]));
    emitter.off()
    emitter.on()
    emitter.emit("playSong", { id: song.id });
  }
  for (let i = 0; i < data.isBofang.length; i++) {
    if (i != index) {
      data.isBofang[i] = false;
    }
  }
  data.isBofang[index] = !data.isBofang[index];
};
</script>

<style lang="less" scoped>
ul {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
li {
  width: 50%;
  position: relative;
  height: 80px;
  padding-left: 20px;
  .nums {
    position: absolute;
    left: 25px;
    top: 30px;
  }
  .imgs {
    position: absolute;
    left: 55px;
    top: 10px;
    width: 60px;
    height: 60px;
    img {
      width: 100%;
    }
  }
  .name {
    position: absolute;
    left: 125px;
    font-size: 14px;
    top: 10px;
  }
  .icons {
    position: absolute;
    left: 38px;
    top: 15px;
    font-size: 20px;
    color: white;
  }
}
</style>












