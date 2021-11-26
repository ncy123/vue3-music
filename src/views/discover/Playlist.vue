<template>
  <title-name :names="String('热门标签')" :titles="title" @titleClick="titleClick">
  </title-name>

  <gedan-rem :catList='catList'></gedan-rem>

  <playlist-page @playlistpageClick='playlistpageClick'></playlist-page>
</template>


<script setup>
import TitleName from "components/common/title/title.vue";
import PlaylistPage from "components/common/playlistPage/playlistPage.vue";
import GedanRem from "components/common/GedanRem.vue";

import { getplayList, getCatList } from "network/toplist.js";

import { ref, reactive, computed, toRefs } from "vue";
const state = reactive({
  names: "热门标签",
  page: 1,
  typeid: 0,
});

const title = reactive(["全部"]);
const caturl = reactive({
  order: "hot",
  cat: "全部",
  limit: 30,
  offset: 1,
});

let catList = ref([]);

/**获取热门标签 */
getplayList().then((res) => {
  res.data.tags.forEach((v) => {
    title.push(v.name);
  });
});


/**获取分类歌单 */
getCatList(caturl).then((res) => {
  let mid = [...res.data.playlists];
  catList.value = mid;
});


//点击热门标签的类型
const titleClick = (id) => {
  state.typeid = id;
  caturl.cat = title[id];
  getCatList(caturl).then((res) => {
    let mid = [...res.data.playlists];
    catList.value = mid;
  });
};

const playlistpageClick = (page) => {
  state.page = page;
  caturl.offset = page;
 // console.log(caturl);
  getCatList(caturl).then((res) => {
    //console.log(res.data.playlists);
    let mid = [...res.data.playlists];
    catList.value = mid;
  });
};
</script>


<style lang="less" scoped>
</style>
