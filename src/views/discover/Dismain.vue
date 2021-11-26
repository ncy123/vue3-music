<template>
  <banner :bannerData="state.bannerData"></banner>
  <recommusic></recommusic>
  <newmusic :newMusicData="state.newMusicData"></newmusic>
  <!-- <progress-bara ></progress-bara> -->
  

</template>
<script setup>
import Banner from "./child/Banner.vue";
import Recommusic from "./child/Recommusic.vue";
import Newmusic from "./child/Newmusic.vue";
// import ProgressBara from '../../components/common/ProgressBara.vue';

import { ref, reactive } from "vue";
import { getBannerData, getNewmusicData } from "network/discover.js";
import { onMounted } from "vue"
const id = ref(2);
const state = reactive({
      bannerData: [],
      newMusicData: []
    })

//获取轮播图数据
getBannerData().then((res) => {
  state.bannerData= res.data.banners;
 // console.log(state.bannerData);
});

//获取新音乐数据
getNewmusicData().then( res => {
  //  console.log(res.data.result);
    state.newMusicData = res.data.result
})

onMounted(() => {
  

});
</script>


<style lang="less" scoped>
</style>