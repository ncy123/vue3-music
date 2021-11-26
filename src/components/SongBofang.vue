<template>
  <div class="bofang">
    <div class="song" >
      <div v-if="data.isbafang">
        <div class="songimg">
          <img :src="data.songmess.al.picUrl" loading="lazy" :onerror="src='assets/img/logo.png'" alt="">
        </div>
        <div class="name">
          <p id="songname">
            <span class="cc" id="cc" @mouseover="nameOver">{{data.songmess.name}}</span>
          </p>
          <div class="love">
            <span class="iconfont icon-xihuan" v-if="data.islove"></span><span v-else class="iconfont icon-aixin"></span>
          </div>
        </div>
        <div class="songer">{{data.songmess.ar ? data.songmess.ar[0].name : " "}}</div>
      </div>

    </div>

    <div class="left">
      <span class="iconfont icon-kuaijin-copy"></span>
      <span @click="bofangClick" v-show="!data.bofang" class="iconfont icon-bofang"></span>
      <span @click="bofangClick" v-show="data.bofang" class="iconfont icon-zantingtingzhi"></span>
      <span class="iconfont icon-kuaijin-copy1"></span>
      <div class="play">
        <video id="myVideo" :src="data.songUrl" autoplay></video>
        <div class="c" v-show="data.geciShow">{{ data.timeci }}</div>
      </div>
    </div>

    <div class="middle">
      <span class="start">{{data.nowtime}}</span>
      <div class="jindu" id="jindu">
        <div class="progress" id="songjindu"></div>
      </div>
      <span class="end">{{data.alltime}}</span>
    </div>

    <div class="right">
      <span class="sound iconfont icon-yinliang1"></span>
      <div class="yinliang">
        <el-progress :percentage="60"></el-progress>
      </div>
      <span @click="geciClick" id="ci" class="ci iconfont icon-lrc"></span>
      <span class="shunxu iconfont icon-124_huaban1fuben"></span>
      <span class="gedan iconfont icon-gedan"></span>
    </div>

    <div class="geci">{{data.timeci}}</div>

  </div>

</template>
<script setup>
import { reactive, defineProps, toRaw, onMounted } from "vue";
import emitter from "assets/js/event.js";
import { throttle, geci, getSongTime } from "assets/js/common.js";
import { getSongUrl, getSongCi, getSongDetail } from "network/discover.js";

const data = reactive({
  percentage: 20,
  customColor: "#409eff",
  bofang: false,
  songid: {},
  songUrl: "",
  lyric: "",
  songmess: {},
  timeci: "",
  geciShow: false,
  nowtime: "00:00",
  alltime: "00:00",
  islove: false,
  isbafang: false,
});

//let myVideo = document.getElementById("myVideo"); //获取video元素

const bofangClick = () => {
  let myVideo = document.getElementById("myVideo"); //获取video元素
  data.bofang = !data.bofang;
  if (!data.bofang) {
    myVideo.pause();
  }
  if (data.bofang) {
    myVideo.play();
  }
};

//data.nowtime = getSongTime(myVideo.currentTime) || '00:00';

//鼠标经过歌名
const nameOver = () => {
  //  console.log("11");
  //获取渲染后盒子的宽度
  let outdiv = document.getElementById("songname");
  let indiv = document.getElementById("cc");
  // console.log(outdiv, indiv);
  // 当里面文字的盒子宽度大于外边的盒子
  let timer = null;
  let long =
    indiv.getBoundingClientRect().width - outdiv.getBoundingClientRect().width;
  if (long > 5) {
    //  console.log("111");
    timer = setInterval(function () {
      var oleft = indiv.offsetLeft;
      indiv.style.left = oleft - 2 + "px";
      // console.log(indiv.offsetLeft, indiv.style.left)
      if (Math.abs(indiv.offsetLeft) > indiv.getBoundingClientRect().width) {
        //  console.log("超了");
        indiv.style.left = outdiv.getBoundingClientRect().width - 15 + "px";
      }
    }, 100);
  } else {
  }
};

// 事件总线
emitter.on("playSong", (e) => {
  // console.log('歌曲id', e);
  data.songid = e;
  //根据各区的id获取歌曲的链接
  // console.log(data.songid);
  getSong(data.songid.id); //获取歌曲信息
  getSongUrl(e.id).then((res) => {
    //  console.log(res);
    let myVideo = document.getElementById("myVideo"); //获取video元素
    myVideo.load();
    myVideo.oncanplay = function () {
      data.alltime = getSongTime(myVideo.duration);
      //显示歌曲播放进度
      myVideo.addEventListener("timeupdate", function () {
        let jindu = document.getElementById("jindu");
        let songjindu = document.getElementById("songjindu");
        let long =
          (this.currentTime / myVideo.duration) *
          jindu.getBoundingClientRect().width;
        songjindu.style.width = long + "px";
        data.nowtime = getSongTime(this.currentTime);
      });
    };
    data.songUrl = res.data.data[0].url;
    data.bofang = true;
    data.isbafang = true;
  });
});

//获取歌词
const geciClick = () => {
  let ci = document.getElementById("ci");
  // console.log(data.songid.id);
  let myVideo = document.getElementById("myVideo"); //获取video元素
  let gejindu = document.getElementById("songjindu"); //获取歌曲播放的进度条
  if (ci.style.color != "blue" && data.songid.id) {
    getSongCi(data.songid.id).then((res) => {
      //  console.log(res);
      data.lyric = res.data.lrc.lyric || "暂无歌词";
      let ly = geci(data.lyric);
      myVideo.addEventListener("timeupdate", function () {
        let obj = ly[Math.floor(this.currentTime)];
        data.nowtime = getSongTime(this.currentTime);
        if (obj != undefined) {
          data.timeci = obj;
        }
      });
    });
  }
  if (ci.style.color === "blue") {
    ci.style.color = "black";
    data.geciShow = false;
  } else {
    ci.style.color = "blue";
    data.geciShow = true;
  }
};

//获取歌曲信息
const getSong = (id) => {
  getSongDetail(id).then((res) => {
    data.songmess = toRaw(res.data.songs[0]);
    console.log(res);
  });
};

onMounted(() => {});
</script>


<style lang="less" scoped>
.bofang {
  position: relative;
  height: 80px;
  width: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  .song {
    width: 300px;
    padding-top: 10px;
    padding-left: 30px;
    .songimg {
      width: 45px;
      height: 40px;
      float: left;
      img {
        width: 100%;
      }
    }
    .name {
      text-align: left;
      font-size: 16px;
      height: 30px;
      #songname {
        display: inline-block;
        margin-left: 10px;
        height: 25px;
        width: 150px;
        line-height: 25px;
        overflow: hidden;
        position: relative;
        .cc {
          position: absolute;
          top: 0px;
          left: 0px;
          color: black;
          font-size: 16px;
          height: 100%;
          text-align: left;
          white-space: nowrap;
        }
      }
      .love {
        display: inline;
        margin-left: 10px;
        span {
          font-size: 18px;
          color: red;
          margin-left: 10px;
        }
      }
    }
    .songer {
      height: 20px;
      text-align: left;
      margin-left: 75px;
      font-size: 13px;
      margin-top: 4px;
    }
  }
  .left {
    float: left;
    width: 350px;
    padding-top: 20px;
    span {
      font-size: 30px;
      padding: 0 30px;
    }
  }
  @media all and (max-width: 1350px) {
    .middle {
      opacity: 0;
    }
    .right {
      flex: 1;
    }
  }

  .middle {
    flex: 1;
    padding: 30px 0;
    font-size: 14px;
    .jindu {
      display: inline-block;
      margin: 0 20px;
      width: 60%;
      height: 6px;
      border-radius: 4px;
      background-color: rgb(214, 216, 213);
      .progress {
        width: 0;
        height: 100%;
        background-color: rgb(2, 135, 243);
      }
    }
  }
  .right {
    float: right;
    width: 450px;
    padding-top: 25px;
    .sound {
      padding-left: 5px;
    }
    .yinliang {
      width: 150px;
      display: inline-block;
      vertical-align: super;
    }
    span {
      font-size: 25px;
      padding: 0 15px;
    }
  }
  .geci {
    position: absolute;
    top: -60px;
    width: 100%;
    margin: 0 auto;
    color: rgb(24, 102, 248);
    font-size: 30px;
  }
}
</style>