<template>
  <div class="w">
    <gedan-rem :catList='data.searchList'></gedan-rem>
    <playlist-page @playlistpageClick='playlistpageClick'></playlist-page>
  </div>
</template>

<script>
import { getSearchResult } from "network/search.js";
import { useRoute, useRouter } from "vue-router";
import { ref, reactive } from "vue";
import GedanRem from "components/common/GedanRem.vue";
import PlaylistPage from "components/common/playlistPage/playlistPage.vue";

export default {
  components: {
    GedanRem,
    PlaylistPage,
  },
  setup() {
    let route = useRoute();
    let router = useRouter();
    let word = decodeURI(route.path.split("/")[2]);
    let config = {
      keywords: word,
      limit: 20,
      offset: 0,
      type: 1000,
    };
    let data = reactive({
      searchList: [],
      count: 0,
    });
    const getPlaylist = (config) => {
      getSearchResult(config).then((res) => {
        data.searchList=res.data.result.playlists;
        console.log(data.searchList.length);
      });
    };
    getPlaylist(config);
    const playlistpageClick = (page) => {
    //  state.page = page;
      config.offset = (page - 1) * config.limit;
      //config.limit = 
      getPlaylist(config);
    };
    return {
      data,
      playlistpageClick,
    };
  },
};
</script>
<style lang="less" scoped>
</style>