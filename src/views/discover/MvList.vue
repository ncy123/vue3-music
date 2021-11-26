<template>
  <div class="w mv">
    <div class="newmvs">
      <h3>最新MV</h3>
      <mv-single :mvList="data.newMvs"></mv-single>
    </div>

    <div class="newmvs">
      <h3>推荐MV</h3>
      <div class="content">
        <div class="mvlist" v-for="(item,index) in data.recommMvs" :key="index" @click="recomClick(index)">
          <img v-lazy="item.picUrl" alt="">
          <div class="playcount"><span class="iconfont icon-bofang"></span> {{Math.floor(item.playCount/10000)!= 0 ? Math.floor(item.playCount/10000) + '万' : item.playCount}}</div>
          <div class="name">{{item.name}}</div>
          <div class="artist">{{item.artistName}}</div>
        </div>
      </div>
       <mv-single :mvList="data.recommMvs"></mv-single>

    </div>

  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import { getNewMv, getRecommMv } from "network/mv.js";
import { useRouter } from "vue-router";
import MvSingle from "components/common/MvSingle.vue";

export default {
  components: { MvSingle },
  setup() {
    let data = reactive({
      newMvs: [],
      recommMvs: [],
    });

    const router = useRouter();

    //获取最新的MV
    getNewMv(20).then((res) => {
      console.log(res);
      data.newMvs = res.data.data;
    });
    //获取推荐的MV
    getRecommMv().then((res) => {
      console.log(res);
      data.recommMvs = res.data.result;
    });

    return {
      data,
    };
  },
};
</script>

<style lang="less" scoped>
.newmvs {
  h3 {
    text-align: left;
    padding: 20px 30px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .mvlist {
      width: 25%;
      position: relative;
      img {
        width: 100%;
        padding: 0 8px;
        height: 130px;
      }
      .playcount {
        position: absolute;
        color: white;
        right: 15px;
        top: 3px;
      }
      .name,
      .artist {
        // text-align: left;
        padding-left: 20px;
        font-weight: 700;
      }
      .artist {
        font-weight: normal;
        font-size: 13px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>