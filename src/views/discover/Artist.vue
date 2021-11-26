<template>
  <div class="w">
    <title-name :names="String('语种')" :titles="area" @titleClick="areaClick">
    </title-name>
    <title-name :names="String('分类')" :titles="type" @titleClick="typeClick">
    </title-name>
    <title-name :names="String('筛选')" :titles="Fname" @titleClick="fnameClick" style="height:100px">
    </title-name>

    <div class="singlist" :key="key">
      <div class="sing" v-for="(item, index) in data.singerList" :key="index" @click="singClick(index)">
        <div class="imgs">
          <img v-lazy="item.picUrl" alt="">
        </div>
        <p class="name">{{item.name}}</p>

      </div>
    </div>
  </div>

  <el-backtop style="width:200px; magin-left: 30px" :bottom="150">
    <div style="
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
        <!-- padding:0 40px; -->
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      ">
      返回顶部
    </div>
  </el-backtop>

</template>
<script>
import TitleName from "components/common/title/title.vue";
import { ref, reactive, watch } from "vue";
import { areas, types, Fnames, getSingerList } from "network/artist.js";
import { useRouter } from "vue-router";
import { debounce, throttle } from "assets/js/common.js";

export default {
  components: { TitleName },
  setup() {
    let config = {
      limit: 15,
      offset: 0,
      initial: -1,
      type: -1,
      area: -1,
    };
    const gettitle = (arr) => {
      let res = [];
      arr.forEach((v) => {
        res.push(v.content);
      });
      return res;
    };
    let area = gettitle(areas);
    let type = gettitle(types);
    let Fname = gettitle(Fnames);
    let key = ref(0);
    let page = ref(1);

    let data = reactive({
      singerList: [],
    });
    const router = useRouter();
    console.log("11");
    //获取对应的歌手列表
    const getData = (mes) => {
      getSingerList(mes).then((res) => {
        console.log(res);
        data.singerList = res.data.artists;
      });
    };

    //点击语种
    const areaClick = (index) => {
      // console.log(index, areas[index].value);
      config.area = areas[index].value;
      getData(config);
    };
    //点击分类
    const typeClick = (index) => {
      //console.log(index, types[index].value);
      config.type = types[index].value;
      getData(config);
    };
    //点击筛选
    const fnameClick = (index) => {
      //console.log(index);
      config.initial = Fnames[index].value;
      getData(config);
    };

    //点击列表歌手
    const singClick = (index) => {
      // console.log(index);
    //  console.log(data.singerList[index].name, data.singerList[index].id);
      router.push({
        path: "/discover/artistdetail",
        query: {
          artist: data.singerList[index].name,
          id: data.singerList[index].id,
        },
        // params:{
        //   id: data.singerList[index].id,
        // }
      });
      // router.push({
      // // path: `/discover/musiclistdetail`,
      //   path: "/discover/artistdetail",
      // });
    };

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
          getSingerList(config).then((res) => {
            // console.log(res);
            data.singerList.push(...res.data.artists);
            // console.log(data.singerList);
          });
        }, 500);
      }
    };

    getData(config);

    watch(
      () => data.singerList,
      (newValue) => {
        key.value++;
      },
      {
        immediate: true,
        deep: true,
      }
    );

    return {
      area,
      type,
      Fname,
      areaClick,
      typeClick,
      fnameClick,
      data,
      singClick,
      key,
    };
  },
};
</script>


<style lang="less" scoped>
.singlist {
  display: flex;
  flex-wrap: wrap;
  .sing {
    width: 20%;
    padding: 10px;
    .imgs {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
}
</style>