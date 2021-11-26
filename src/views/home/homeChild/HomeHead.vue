<template>
  <div class="top" v-if="table.showTable">
    <ul>
      <li v-for="(item, index) in navname" :key="index" @click="navClick(index)">
        <p :class="{select: currentIndex === index}">{{item}}</p>
      </li>
    </ul>

  </div>

</template>

<script setup>
import { ref, reactive, toRaw, watch, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";


const navname = reactive([
  "推荐",
  "排行榜",
  "歌单",
  "MV",
  "歌手",
  "新碟上架",
]);
const router = useRouter();
const route = useRoute();
const currentIndex = ref(0);
watch(route.path, ()=>{
  console.log('11');
})

switch (route.path.split("/")[2]) {
  case "undefined":
    currentIndex.value = 0;
    break;
  case "toplist":
    currentIndex.value = 1;
    break;
  case "playlist":
    currentIndex.value = 2;
    break;
  case "mv":
    currentIndex.value = 3;
    break;
  case "artist":
    currentIndex.value = 4;
    break;
  case "musiclistdetail":
    currentIndex.value = 2;
    break;
}
//console.log(currentIndex.value);

let table = reactive({
  showTable: true,
});

//使用刷新

watch(route.path, () => {
  nextTick(() => {
    //写入操作
    table.showTable = true;
  });
});

const navClick = (index) => {
  //console.log(index);
  currentIndex.value = index;
  if (index === 0) {
    router.push({ path: "/discover" });
  } else if (index === 1) {
    router.push({ path: "/discover/toplist" });
  } else if (index === 2) {
    //router.push({ path: "/discover/playlist" });
    router.push({ name:"playlist" });
  } else if (index === 3) {
    router.push({ path: "/discover/mv" });
  } else if (index === 4) {
    router.push({ path: "/discover/artist" });
   // router.push({ name:"artist" });
  } else {
    router.push({ path: "/discover/album" });
  }
};
</script>

<style lang="less" scoped>
.top {
  background-color: red;
  width: 100%;
  height: 28px;
  ul li {
    display: inline-block;
    width: 110px;
    font-size: 14px;
    margin-top: 2px;
    color: white;
    p {
      padding: 2px 8px;
      border-radius: 10px;
    }
    .select {
      background-color: rgb(158, 8, 8);
      display: inline-block;
    }
  }
}
</style>
