<template>
  <div class="w">
    <div class="title">
      <div class="word"><span>搜索词：</span><span style="font-weight:400; color:blue">{{word}}</span></div>
      <div> <span class="name" v-for="(item,index) in data.title" :key="index" @click="itemClick(index)" :class="{'chice': data.currentIndex===index}">{{item}}</span></div>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    let activeName = ref("first");
    let router = useRouter();
    let route = useRoute();
    let word = decodeURI(route.path.split("/")[2]);
    router.push({
      name: "song",
    });
    let data = reactive({
      title: ["单曲", "歌手", "歌单", "专辑", "MV"],
      currentIndex: 0,
    });

    const itemClick = (index) => {
      data.currentIndex = index;
      router.push({
        name: "song",
      });
      switch (index) {
        case 0:
          router.push({
            name: "song",
          });
          break;
        case 1:
          router.push({
            name: "artists",
          });
          break;
        case 2:
          router.push({
            name: "playlists",
          });
          break;
        case 3:
          router.push({
            name: "ablum",
          });
          break;
        case 4:
          router.push({
            name: "Mv",
          });
          break;
      }
    };

    return {
      activeName,
      data,
      itemClick,
      word,
    };
  },
};
</script>
<style lang="less" scoped>
.title {
  padding-top: 20px;
  padding-left: 50px;
  text-align: left;
  .word {
    padding: 10px 0;
    padding-left: 20px;
    span {
      font-weight: 700;
      font-size: 18px;
    }
  }
  .name {
    padding: 5px 20px;
    display: inline-block;
    font-size: 18px;
  }
  .chice {
    border-bottom: 2px solid rgb(6, 128, 228);
    color: blue;
  }
}
</style>

