<template>
  <div class="album">
    <ul>
      <li v-for="(item, index) in data.searchList" :key="index">
        <div class="imgs"> <img v-lazy="item.blurPicUrl" alt=""> </div>
        <p class="name">{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSearchResult } from "network/search.js";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    let route = useRoute();
    let word = decodeURI(route.path.split("/")[2]);
    let config = {
      keywords: word,
      limit: 35,
      offset: 0,
      type: 10,
    };
    let data = reactive({
      searchList: [],
      count: 0,
    });
    const getAlbums = (config) => {
      getSearchResult(config).then((res) => {
        console.log(res);
        data.searchList = res.data.result.albums;
        data.count = res.data.result.albumCount;
      });
    };
    getAlbums(config);
    return {
      data,
    };
  },
};
</script>
<style lang="less" scoped>
.album {
  padding-top: 20px;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li {
      width: 16%;
      padding: 10px 0;
      .imgs {
        width: 100%;
        padding: 0 10px;

        img {
          width: 100%;
        }
      }
      .name {
        font-size: 15px;
        height: 40px;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        overflow: hidden;
      }
    }
  }
}
</style>