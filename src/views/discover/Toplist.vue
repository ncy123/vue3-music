<template>
  <div class="w">
    <div class="official">
      <h3>官方榜</h3>
      <div class="content">
        <off-top-list :offList="data.offList"></off-top-list>
      </div>
    </div>

    <div class="global">
      <h3>全球榜</h3>
      <div class="content">
        <div class="single" v-for="(item, index) in data.globalList" :key="index" @click="globalClick(index)" @mouseover="globalOver(index)" @mouseout="globalOut(index)">
          <div class="listen">
            <span class="iconfont icon-erji"></span> {{ Math.floor(item.playCount/10000) != 0 ? Math.floor(item.playCount/10000) + '万': item.playCount  }}
          </div>
          <div class="imgs">
            <img v-lazy="item.coverImgUrl" alt="">
          </div>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { getTopList } from "network/toplist.js";
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import offTopList from "./child/offTopList.vue";

export default {
  components: { offTopList },
  setup() {
    let data = reactive({
      topList: {},
      offList: [],
      globalList: [],
    });
    getTopList().then((res) => {
      data.topList = res.data.list;
      data.offList = data.topList.splice(0, 4);
      data.globalList = data.topList.splice(0);
    });

    const router = useRouter();

    //鼠标经过全球榜
    const globalOver = (index) => {};

    //鼠标离开全球榜
    const globalOut = (index) => {};

    //点击全球榜的
    const globalClick = (index) => {
      router.push({
        path: `/discover/musiclistdetail/${data.globalList[index].id}`,
      });
    };

    return {
      data,
      globalClick,
      globalOver,
      globalOut,
    };
  },
};
</script>


<style lang="less" scoped>
.official {
  h3 {
    text-align: left;
    padding: 30px;
  }
  .content {
  }
}
.global {
  h3 {
    text-align: left;
    padding: 30px;
    padding-bottom: 10px;
  }
  .content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .single {
      width: 18%;
      margin: 10px;
      position: relative;
      .imgs {
        width: 100%;
        img {
          width: 100%;
        }
      }
      .listen {
        position: absolute;
        right: 5px;

        height: 23px;
        line-height: 23px;
        color: white;
        opacity: 0.7;
      }
    }
  }
}
</style>
