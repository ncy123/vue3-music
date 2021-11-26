<template>
  <div :key="updata">
    <div class="simples" v-for="(item, index) in data.listData" :key="index">
      <div class="images" @click="offClick(index)">
        <img v-lazy="item.coverImgUrl" alt="">
        <span class="time">{{format1(item.updateTime)}}&nbsp更新</span>
      </div>

      <div class="songs">
        <el-table :row-style="{heght:'30px'}" :cell-style="{padding:'5px'}" @cell-click="tableClick" @row-dblclick="tabledbClick" :data="item.musicList" :show-header="false" style="width: 100%" height="240">
          <el-table-column type="index" width="50" height="20" />
          <el-table-column  width="40" >-</el-table-column>
          <el-table-column prop="name" width="500" />
          <el-table-column prop="artist" width="200" />

        </el-table>
      </div>

    </div>
  </div>
</template>

<script> 
import { ref, reactive, watch, nextTick, toRaw, onMounted } from "vue";
import { format1 } from "assets/js/common.js";
import { useRouter } from "vue-router";
import emitter from "assets/js/event.js";

import {
  getdetaildata,
  getmusiclistData,
  songDetail,
} from "network/musiclistdetail.js";

export default {
  props: {
    offList: Array,
  },
  setup(props, context) {
    // let listData = ref([]);
    let data = reactive({
      updata: true,
      listData: [],
      musicList: [],
    });
    const router = useRouter();
    let updata = ref(0);
    const ids = [];

    //把歌曲添加到数据中
    const getdata = async () => {
      // let i = 0;
      //遍历 4 个数组
      for (let i = 0; i < data.listData.length; i++) {
        data.listData[i].musicList = [];
        let mid = [];
        //获取歌单对应的歌曲
        await getdetaildata(data.listData[i].id).then((res) => {
          //截取歌单的前5首歌曲的
          mid.push(...res.data.playlist.trackIds.splice(0, 7));
          let j = 0;
          //遍历前面几首歌曲
          for (let c of mid) {
            //获取歌曲的信息
            getmusiclistData(c.id).then((res) => {
              let song = new songDetail(res.data.songs);
              //  console.log(song);
              data.listData[i].musicList.push(song);
              j++;
            });
          }
        });
      }
     console.log(data.listData);
    };

    //监听传递过来的数据
    watch(
      () => props.offList,
      (newValue) => {
        data.listData = JSON.parse(JSON.stringify(newValue));
        if (data.listData.length === 4) {
          getdata();
         // console.log(data.listData);
        }

        updata.value += 1;
      },
      { immediate: true, deep: true }
    );

    watch(
      () => ids,
      (newValue) => {
        // console.log(newValue);
      },
      {
        immediate: true,
        deep: true,
      }
    );

    //双击歌曲
    const tabledbClick = (row, column, event) => {
    //  console.log(row, column, event);
    //   console.log(row.id);
      emitter.off();
      emitter.on();
      emitter.emit("playSong", { id: row.id });
    };

    //点击榜单
    const offClick = (index) => {
      console.log(index);
      router.push({
        path: `/discover/musiclistdetail/${data.listData[index].id}`,
      });
    };

    return {
      // listData,
      data,
      format1,
      updata,
      offClick,
      tabledbClick,
    };
  },
};
</script>
<style lang="less" scoped>
.simples {
  width: 100%;
  display: flex;
  padding: 10px 30px;
  .images {
    width: 240px;
    position: relative;
    img {
      width: 100%;
    }
    .time {
      position: absolute;
      left: 10px;
      bottom: 20px;
      color: white;
      font-size: 16px;
    }
  }
  .songs {
    padding-left: 40px;
    flex: 1;
  }
}
</style>