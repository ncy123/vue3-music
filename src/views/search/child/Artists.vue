<template>
  <div class="w">
    <div class="artist">
      <ul>
        <li v-for="(item, index) in data.searchList" :key="index" @click="artistClick(index)">
          <div class="imgs"><img v-lazy="item.img1v1Url" alt=""></div>
          <div class="content">
            <span>{{item.name}}</span>
            <p class="count"><span>专辑：</span>{{item.albumSize}}</p>
            <p class="count"><span>MV：</span>{{item.mvSize}}</p>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { getSearchResult } from "network/search.js";
import { useRoute,useRouter } from "vue-router";
import { ref, reactive } from "vue";
export default {
  setup() {
    let route = useRoute();
    let router = useRouter()
    let word = decodeURI(route.path.split("/")[2]);
    let config = {
      keywords: word,
      limit: 40,
      offset: 0,
      type: 100,
    };
    let data = reactive({
      searchList: [],
      count: 0,
    });
    const getSongs = (config) => {
      getSearchResult(config).then((res) => {
        console.log(res);
        if(!res.data.result.artistCount) return
        data.searchList.push(...res.data.result.artists);
      });
    };
    getSongs(config);
    let page = ref(1);
    window.onscroll = function () {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        setTimeout(() => {
          page.value++;
          config.offset = (page.value - 1) * config.limit;
          getSongs(config);
        }, 500);
      }
    };

    //点击歌手
    const artistClick = (index) =>{
      console.log(index);
      console.log(data.searchList[index]);
      router.push({
        path: "/discover/artistdetail",
        query: {
          artist: data.searchList[index].name,
          id: data.searchList[index].id,
        },
      });
    }

    return {
      data,
      artistClick,
    };
  },
};
</script>
<style lang="less" scoped>
.artist {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li {
      width: 260px;
      margin: 5px 0;
      .imgs {
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        display: inline-block;
        vertical-align: top;
        width: 100px;
        text-align: left;
        padding-left: 5px;
        padding-top: 20px;
        .count {
          font-size: 14px;
          color: rgb(151, 151, 151);
        }
      }
    }
  }
}
</style>