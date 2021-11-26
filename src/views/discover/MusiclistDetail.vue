<template>
  <div>
    <div class="title clearfix">
      <div class="imgs"><img :src="data.gedanmess.coverImgUrl"  alt=""></div>
      <div class="content">
        <h2 class="name">{{data.gedanmess.name}}</h2>
        <button class="iconfont bofang" style="background-color:red; color:white"><span> 播放全部</span></button>
        <button class="iconfont icon-shoucang"><span> &nbsp 收藏({{data.gedanmess.specialType}})</span></button>
        <button class="iconfont icon-fenxiang"><span> &nbsp 分享({{data.gedanmess.shareCount}})</span></button>
        <div class="con">标签：<span style="color:blue; font-weight: 400" v-for="(item, index) in data.gedanmess.tags" :key="index">{{item }}&nbsp </span></div>
        <div class="cons">
          <div style="float:left">简介：</div>
          <div class="neirong">{{data.gedanmess.description}}</div>
        </div>
      </div>
    </div>
    <div style="height:20px">

    </div>

    <div class="text">
      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane label="歌曲列表">
          <el-table name='musiclist' @cell-click="tableClick" @row-dblclick="tabledbClick" :data="data.musicList" style="width: 100%" max-height="500">
            <el-table-column type="index" v-if="!data.bofang" width="50" />
            <el-table-column width="80" v-if="data.bofang">
              <span class="iconfont icon-zantingtingzhi"></span>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <span style="font-size: 18px" class="iconfont icon-xihuan"></span>
            </el-table-column>
            <el-table-column prop="name" label="音乐标题" width="260" />
            <el-table-column prop="artist" label="歌手" width="260" sortable />
            <el-table-column prop="album" label="专辑" width="260" sortable />
          </el-table>
        </el-tab-pane>
        <!-- 评论部分 -->
        <!-- 评论数量 data.gedanmess.commentCount -->
        <el-tab-pane :label="data.total" lazy="true" name="review">
          <reviews :comments="data.comment" @getPageReivew="getPageReivew"></reviews>
        </el-tab-pane>
        <el-tab-pane :label="data.trackCount" lazy="true">收藏者1</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, toRaw, watch, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Reviews from "components/common/Reviews.vue";
import emitter from "assets/js/event.js";

import {
  getdetaildata,
  getmusiclistData,
  songDetail,
  getReviews,
} from "network/musiclistdetail.js";

export default {
  components: { Reviews },
  props: {
    id: Number,
  },
  setup(props, context) {
    const route = useRoute();
    const id = route.params.id || props.id;
    let key = ref(0);
    let data = reactive({
      gedanmess: {},
      musicList: [],
      bofang: false,
      total: "",
      trackCount: " ",
      comment: [],
    });
    let state = reactive({
      trackIds: 0,
    });
    //获取评论的参数
    let config = {
      id,
      limit: 10,
      offset: 0,
    };
    const getMess = (id) => {
      //获取歌单的基本信息
      getdetaildata(id).then((res) => {
        data.gedanmess = res.data.playlist;
       // console.log(res);
        // if (data.gedanmess.commentCount)
        data.total = "评论" + "(" + res.data.playlist.commentCount + ")";
        //  if (data.gedanmess.trackCount)
        data.trackCount = "收藏" + "(" + data.gedanmess.trackCount + ")";
        // console.log(res);
        /**遍历查询歌单所有歌曲详情 */
        state.trackIds = res.data.playlist.trackIds;
        getMusicList(state.trackIds);
      });
    };
    getMess(id);

    watch(
      () => props.id,
      (newValue) => {
        //  console.log(newValue);
        getMess(newValue);
      },
      {
        immediate: true,
        deep: true,
      }
    );

    //获取评论信息
    const getReviewsData = (config) => {
      getReviews(config).then((res) => {
        data.comment = res.data;
        // console.log(data.comment);
      });
    };
    const getPageReivew = (val) => {
      // console.log(val);
      config.offset = (val - 1) * config.limit;
      getReviewsData(config);
    };

    const handleClick = (tab, event) => {
      // console.log(tab, event)
      if (tab.props.name === "review") {
        getReviewsData(config);
      }
    };

    const getMusicList = (ids) => {
      let len = ids.length;
      data.musicList = [];
      for (let i = 0; i < len; i++) {
        getmusiclistData(ids[i].id).then((res) => {
          let song = new songDetail(res.data.songs);
          data.musicList.push(song);
        });
      }
      // console.log(data.musicList);
      // key.value++;
    };

    const tableClick = (row, column, cell, event) => {
      // console.log("11");
      // console.log(row, column, cell, event);
    };

    //双击播放歌曲
    const tabledbClick = (row, column, event) => {
      //  console.log(row, column, event);
      // console.log(row.id);
      emitter.off();
      emitter.on();
      emitter.emit("playSong", { id: row.id });
    };

    return {
      data,
      tableClick,
      tabledbClick,
      handleClick,
      getPageReivew,
      key,
    };
  },

  methods: {},
};
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  .imgs {
    flex: 1;
    img {
      width: 100%;
    }
  }
  .content {
    flex: 3;
    text-align: center;
    button {
      width: 150px;
      height: 40px;
      border-radius: 10px;
      border: none;
      margin: 20px 20px;
      font-size: 20px;
      span {
        font-size: 15px;
        vertical-align: top;
      }
    }
    .name {
      padding-top: 20px;
    }
    .con,
    .cons {
      text-align: left;
      padding-left: 10px;
      margin-bottom: 15px;
      font-weight: 700;
      .neirong {
        float: right;
        padding-right: 10px;
        width: 100%;
        font-weight: normal;
        text-indent: 1em;
      }
    }
  }
}
.text {
}
</style>
