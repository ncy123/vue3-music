<template>
  <div class="song">
    <el-table :cell-style="{padding: '0'}" :row-style="{height: '33px'}" @row-dblclick="tabledbClick" ref="singleTable" :data=" data.searchList" highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
      <el-table-column type="index" width="70" style="text-align:center" />
      <el-table-column label="操作" width="80">
        <span style="font-size: 18px" class="iconfont icon-xihuan"></span>
      </el-table-column>
      <el-table-column property="name" label="音乐标题" width="350" />
      <el-table-column property="ar[0].name" label="歌手" width="300" />
      <el-table-column property="al.name" label="专辑" width="350" />
      <!-- <el-table-column label="时长">{{getSongTime(dt)}}</el-table-column> -->
    </el-table>
    <div class="demo-pagination-block" style="padding: 20px 0">
      <el-pagination v-model:currentPage="currentPage3" :page-size="30" layout="total, prev, pager, next, jumper" :total="data.count" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { getSearchResult } from "network/search.js";
import { reactive, ref } from "vue";
import { getSongTime, format } from "assets/js/common.js";
import emitter from "assets/js/event.js";

export default {
  setup() {
    let route = useRoute();
    let word = decodeURI(route.path.split("/")[2]);
    console.log(word);
    let config = {
      keywords: word,
      limit: 30,
      offset: 0,
      type: 1,
    };
    let data = reactive({
      searchList: [],
      count: 0,
    });
    console.log(getSongTime(204955));
    console.log(format(204955));
    const getSongs = (config) => {
      getSearchResult(config).then((res) => {
        console.log(res);
        data.searchList = res.data.result.songs;
        data.count = res.data.result.songCount;
      });
    };
    getSongs(config);

    const handleSizeChange = (val) => {
      config.offset = (val - 1) * config.limit;
      getSongs(config);
    };
    const handleCurrentChange = (val) => {
      config.offset = (val - 1) * config.limit;
      getSongs(config);
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
      getSongTime,
      currentPage3: 1,
      handleSizeChange,
      handleCurrentChange,
      tabledbClick,
    };
  },
};
</script>
<style lang="less" scoped>
.song {
  padding: 20px 50px;
}
</style>