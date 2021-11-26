<template>
  <div class="w" :key="key">
    <div class="singer">
      <div class="imgs"><img :src="data.singerData.picUrl" alt=""></div>
      <div class="mess">
        <div class="name">
          <p>歌手</p><span>{{data.singerData.name}}</span>
        </div>
        <div class="content"><span>单曲数：</span>{{data.singerData.musicSize}}</div>
        <div class="content"><span>专辑数：</span>{{data.singerData.albumSize}}</div>
        <div class="content"><span>MV数：</span>{{data.singerData.mvSize}}</div>
        <div class="content abstract"><span>简介：</span>{{data.singerData.briefDesc}}</div>
      </div>
    </div>

    <div class="songs">
      <el-tabs type="card" @tab-click="handleClick" v-model="editableTabsValue">
        <el-tab-pane label="专辑">
          <div class="album">
            <div class="imgs">
              <img v-lazy="data.singerData.img1v1Url" alt="">
            </div>
            <div class="table">
              <p style="font-weight:700">热门歌曲</p>
              <el-table ref="singleTable" :lazy="true" :cell-style="{padding: '0'}" :row-style="{height: '40px'}" :data="data.hotSongs" highlight-current-row style="width: 100%" height="400" :show-header="false" @current-change="handleCurrentChange">
                <el-table-column style="text-align: center; padding-left:10px" type="index" width="100" />
                <el-table-column property="date" width="100"> <span style="font-size: 18px" class="iconfont icon-xihuan"></span> </el-table-column>
                <el-table-column property="name" width="400" />
                <el-table-column property="address"> </el-table-column>
              </el-table>
            </div>
          </div>

          <div v-for="(item, index) in data.hotAlbums" :key="index">
            <div class="album">
              <div class="imgs">
                <img v-lazy="item.picUrl" alt="">
              </div>
              <div class="table">
                <p style="margin-top:10px; font-weight:700">{{item.name}}</p>
                <el-table ref="singleTable" :lazy="true" :cell-style="{padding: '0'}" :row-style="{height: '40px'}" :data="item.songs" highlight-current-row style="width: 100%" :show-header="false" @current-change="handleCurrentChange">
                  <el-table-column style="text-align: center; padding-left:10px" type="index" width="100" />
                  <el-table-column property="date" width="100"> <span style="font-size: 18px" class="iconfont icon-xihuan"></span> </el-table-column>
                  <el-table-column property="name" width="400" />
                  <el-table-column property="address"> </el-table-column>
                </el-table>
              </div>
            </div>
          </div>

        </el-tab-pane>
        <el-tab-pane label="MV">
          <div>
            <ul class="mvs">
              <li v-for="(item, index) in data.mvs" :key="index" @click="mvClick(index)">
                <div class="imgs">
                  <span class="bofang iconfont icon-bofang">{{item.playCount}}</span>
                  <img v-lazy="item.imgurl" alt="">
                </div>
                <p>{{item.name}}</p>
              </li>
            </ul>

          </div>
        </el-tab-pane>
        <el-tab-pane label="歌手详情">
          <div class="desc">
            <div class="briefdesc">
              {{data.desc.briefDesc}}
            </div>
            <div class="cont" v-for="(item, index) in data.desc.introduction" :key="index">
              <h4>{{item.ti}}</h4>
              <div class="mes">{{item.txt}}</div>
            </div>
          </div>

        </el-tab-pane>
        <el-tab-pane label="相似歌手">
          <div class="simisinger">
            <ul>
              <li v-for="(item, index) in data.simiSinger" :key="index" @click="simiClick(index)">
                <div class="imgs">
                  <img v-lazy="item.img1v1Url" alt="">
                </div>
                <p class="name">{{item.name}}</p>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>

</template>

<script>
import { ref, reactive, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getSingerMess,
  getSingerAlbum,
  getAlbum,
  getSingerMv,
  getSingerDesc,
  getSimiSinger,
} from "network/artist.js";
import { getSongTime } from "assets/js/common.js";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    let id = route.query.id;
    let name = route.query.name;
    let key = ref(0);
    const editableTabsValue = ref("0");
    let album = {
      id,
      limit: 50,
      offset: 0,
    };
    let data = reactive({
      singerData: {},
      hotSongs: [],
      hotAlbums: [],
      mvs: [],
      desc: {},
      simiSinger: [],
    });

    //获取歌手信息
    const getSingMess = (n) => {
      getSingerMess(n).then((res) => {
        data.singerData = res.data.artist;
        data.hotSongs = res.data.hotSongs;
        console.log(res.data);
      });
    };
    getSingMess(id);

    //获取歌手专辑信息
    const getSingerSong = (n) => {
      getSingerAlbum(n).then(async (res) => {
        // console.log(res);
        data.hotAlbums = res.data.hotAlbums;
        //  console.log(data.hotAlbums);
        for (let v of data.hotAlbums) {
          // console.log(v.id);
          await getAlbum(v.id).then((result) => {
            //  console.log(result);
            v.songs.push(...result.data.songs);
          });
          // console.log(data.hotAlbums);
        }
      });
    };
    getSingerSong(album);

    //获取歌手MV
    const getMv = (id) => {
      getSingerMv(id).then((res) => {
        //  console.log(res);
        data.mvs = res.data.mvs;
        // console.log(data.mvs);
      });
    };
    //点击对应的mv
    const mvClick = (index) => {
      console.log(data.mvs[index].id);
      router.push({
        // path: `/discover/mvdetail/${data.mvs[index].id}`,
        name: "mvdetail",
        params: {
          id: data.mvs[index].id,
        },
      });
    };

    //获取歌手详情
    const getSinger = (id) => {
      getSingerDesc(id).then((res) => {
        console.log(res);
        data.desc = res.data;
      });
    };

    //获取相似歌手
    const getSimilaritySinger = (id) => {
      getSimiSinger(id).then((res) => {
        console.log(res);
        data.simiSinger = res.data.artists;
      });
    };
    //点击相似歌手，跳转页面
    const simiClick = (index) => {
      // console.log(index);
      // console.log(data.simiSinger[index].id);
      id = data.simiSinger[index].id;
      router.push({
        path: "/discover/artistdetail",
        query: {
          artist: data.simiSinger[index].name,
          id: data.simiSinger[index].id,
        },
      });
      getSingMess(id);
      key.value++;
      editableTabsValue.value = "0";
      // console.log(editableTabsValue.value);
    };

    //切换导航栏
    function handleClick(tab, event) {
      // console.log(tab, event)
      // console.log(tab.props.label);
      if (tab.props.label === "MV") {
        getMv(id);
        editableTabsValue.value = "1";
      } else if (tab.props.label === "歌手详情") {
        editableTabsValue.value = "2";
        getSinger(id);
      } else if (tab.props.label === "相似歌手") {
        getSimilaritySinger(id);
        editableTabsValue.value = "3";
      } else if (tab.props.label === "专辑") {
        editableTabsValue.value = "0";
      }
    }

    function handleCurrentChange(val) {
      this.currentRow = val;
    }

    return {
      data,
      //  handleClick,
      handleCurrentChange,
      getSongTime,
      handleClick,
      mvClick,
      simiClick,
      editableTabsValue,
      key,
    };
  },
};
</script>

<style lang="less" scoped>
.singer {
  width: 100%;
  height: 400px;
  padding-top: 30px;
  display: flex;
  .imgs {
    // margin-top: 100px;
    height: 250px;
    flex: 2;
    text-align: center;
    margin-top: 60px;
    padding-left: 15px;
    img {
      height: 100%;
    }
  }
  .mess {
    flex: 5;
    padding-left: 30px;
    text-align: left;
    .name {
      p {
        text-align: center;
        display: inline-block;
        color: red;
        border: 2px solid red;
        width: 100px;
        height: 40px;
        font-weight: 700;
        font-size: 18px;
        line-height: 40px;
      }
      span {
        padding-left: 20px;
        font-size: 20px;
        font-weight: 700;
      }
    }
    .content {
      font-size: 18px;
      padding-top: 10px;
      text-align: left;
      span {
        color: rgb(61, 105, 238);
        font-weight: 500;
      }
    }
    .abstract {
      width: 100%;
      padding-right: 10px;
      height: 200px;
      overflow: auto;
      font-size: 16px;
      span {
        font-size: 18px;
      }
    }
  }
}
.songs {
  width: 100%;
  .album {
    display: flex;
    padding: 0 10px;
    .imgs {
      flex: 1.5;
      padding: 20px;
      img {
        width: 100%;
      }
    }
    .table {
      flex: 5;
      padding-left: 20px;
    }
  }
  .mvs {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 25%;
      padding: 10px;
      margin-bottom: 10px;
      .imgs {
        width: 100%;
        position: relative;
        height: 180px;
        img {
          width: 100%;
          height: 100%;
        }
        .bofang {
          position: absolute;
          top: 3px;
          right: 5px;
          color: white;
        }
      }
    }
  }
  .desc {
    padding: 20px;
    text-indent: 2em;
    line-height: 25px;
    text-align: left;
    .cont {
      margin-top: 20px;
      h4 {
        padding: 10px 0;
        text-indent: 1em;
      }
      .mes {
        white-space: pre-wrap;
        text-indent: 2em;
      }
    }
  }
  .simisinger {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      li {
        width: 16%;
        padding: 10px;
        .imgs {
          width: 100%;
          height: 150px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>