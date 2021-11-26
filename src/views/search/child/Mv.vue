<template>
  <div class="w mvs">
    <mv-single :mvList="data.searchList"></mv-single>
    <playlist-page @playlistpageClick='playlistpageClick'></playlist-page>
  </div>
</template>

<script>
import { getSearchResult } from "network/search.js";
import { ref, reactive } from "vue";
import MvSingle from "components/common/MvSingle.vue";
import PlaylistPage from "components/common/playlistPage/playlistPage.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    MvSingle,
    PlaylistPage,
  },
  setup() {
    let route = useRoute();
    let word = decodeURI(route.path.split("/")[2]);
    let config = {
      keywords: word,
      limit: 30,
      offset: 0,
      type: 1004,
    };
    let data = reactive({
      searchList: [],
      count: 0,
    });
    const getMvs = (config) => {
      getSearchResult(config).then((res) => {
        data.searchList = res.data.result.mvs;
        data.count = res.data.result.mvCount;
      });
    };
    getMvs(config);
    const playlistpageClick = (page) => {
      config.offset = (page - 1) * config.limit;
      getMvs(config);
    };
    return {
      data,
      playlistpageClick,
    };
  },
};
</script>
<style lang="less" scoped>
.mvs {
  padding-top: 20px;
}
</style>