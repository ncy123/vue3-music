<template>
  <div class="w mvdetail" :key="key">
    <div class="content">
      <div class="title">
        <p class="mv">MV</p> <span class="name">{{data.mvMess.name}}</span>
      </div>
      <div class="mvbofang">
        <vue3VideoPlay v-bind="options" :poster="data.mvMess.cover" />
      </div>
      <div class="review">
        <reviews :comments="data.mvComments" @getPageReivew="getPageReivew"></reviews>
      </div>

    </div>
    <div class="recommen">
      <div class="mvs" v-for="(item, index) in data.simiMv" :key="index" @click='mvSimiClick(index)'>
        <img v-lazy="item.cover" alt="">
        <div class="name"><span>{{item.artistName}}：</span><span>{{item.name}}</span></div>
      </div>

    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getMvMess, getMvUrl, getMvReview, getSimiMv } from "network/mv.js";
//import "vue3-video-play/dist/style.css";
import vue3videoPlay from "vue3-video-play";
import Reviews from "components/common/Reviews.vue";
import {getStore} from "assets/js/common.js";

export default {
  components: {
    vue3videoPlay,
    Reviews,
  },
  setup() {
    let router = new useRouter();
    const route = new useRoute();
    console.log(route.params.id);
    let id = route.params.id;
    let key = ref(0);
    let data = reactive({
      mvMess: {},
      mvComments: {},
      simiMv: {},
    });
     const token = getStore('musicCookie');
    let config = {
      id,
      limit: 10,
      offset: 0,
     // cookie: token,
    };
    //console.log(config);
    let options = reactive({
      width: "100%", //播放器高度
      height: "100%", //播放器高度
      color: "#409eff", //主题色
      title: "", //视频名称
      src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
      muted: false, //静音
      webFullScreen: false,
      speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
      autoPlay: false, //自动播放
      loop: false, //循环播放
      mirror: false, //镜像画面
      ligthOff: false, //关灯模式
      volume: 0.3, //默认音量大小
      control: true, //是否显示控制
      controlBtns: [
        "audioTrack",
        "quality",
        "speedRate",
        "volume",
        "setting",
        "pip",
        "pageFullScreen",
        "fullScreen",
      ], //显示所有按钮,
    });
    //获取mv数据
    const getMvMessData = (id) => {
      getMvMess(id).then((res) => {
        // console.log(res);
        data.mvMess = res.data.data;
      });
    };
    getMvMessData(id);

    //获取mv的url
    const getMvUrlData = (id) => {
      getMvUrl(id).then((res) => {
        options.src = res.data.data.url;
      });
    };
    getMvUrlData(id)
    
    //获取mv评论
    const getReviewsData = (config) => {
      getMvReview(config).then((res) => {
        //  console.log(res);
        data.mvComments = res.data;
      });
    };
    getReviewsData(config);
    //获取相似的MV
    const getSimiMvData = (id) => {
      getSimiMv(id).then((res) => {
        console.log(res);
        data.simiMv = res.data.mvs;
      });
    };
    getSimiMvData(id);

    //点击推荐的MV
    const mvSimiClick = (index) => {
      console.log(index);
      id = data.simiMv[index].id;
      router.push({
        // path: `/discover/mvdetail/${data.mvs[index].id}`,
        name: "mvdetail",
        params: {
          id: data.simiMv[index].id,
        },
      });
      config.id = data.simiMv[index].id;
      getMvMessData(id);
      getMvUrlData(id)
      getSimiMvData(id);
      getReviewsData(config);
      key.value++;
    };

    const getPageReivew = (val) => {
      console.log(val);
      config.offset = (val - 1) * config.limit;
      getReviewsData(config);
    };

    return {
      data,
      options,
      getPageReivew,
      mvSimiClick,
      key,
    };
  },
};
</script>

<style lang="less" scoped>
.mvdetail {
  padding-top: 20px;
  display: flex;
  .content {
    flex: 3;
    .title {
      margin-left: 20px;
      text-align: left;
      margin-bottom: 8px;
      .mv {
        display: inline-block;
        border: 2px solid red;
        color: red;
        padding: 8px 20px;
        font-size: 20px;
      }
      .name {
        margin-left: 5px;
        font-size: 20px;
        font-weight: 700;
      }
    }
    .mvbofang{
      padding-left: 20px;
    }
    .review {
      margin-top: 30px;
      width: 100%;
    }
  }
  .recommen {
    flex: 1;
    margin-top: 0px;
    .mvs {
      margin: 15px 0;
      img {
        width: 100%;
        padding: 0 15px;
      }
      .name {
        text-align: left;
        padding-left: 15px;
      }
    }
  }
}
</style>