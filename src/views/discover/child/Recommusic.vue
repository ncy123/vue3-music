<template>
  <div class="w">
    <h4>歌单推荐</h4>
    <div>
      <ul class="contens">
        <li v-for="(item, index) in state.recomData" :key="index" @click="remClick(index)" @mouseover="remMouse(index)" @mouseout="remLeave(index)">
          <div class="imgs">
            <img v-lazy="item.picUrl" οnerrοr="javascript:src='assets/img/logo.png';" alt />
          </div>
          <el-collapse-transition>
            <div class="listen" v-show="!state.recomShow[index]">
              <span class="iconfont icon-erji"></span> {{ item.playCount }}
            </div>
          </el-collapse-transition>
          <el-collapse-transition>
            <p class="rem" v-show="state.recomShow[index]">
              {{ item.copywriter }}
            </p>
          </el-collapse-transition>

          <transition name="el-zoom-in-center">
            <p class="iconfont icon-bofang bofang" v-show="state.recomShow[index]"></p>
          </transition>
          <p class="name">{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <h4>独家放送</h4>
    <div class="w">
      <ul class="contens">
        <li v-for="(item, index) in state.personData" :key="index" style="width: 33%" @click="personClick(index)">
          <div class="imgs">
            <img v-lazy="item.picUrl" οnerrοr="javascript:src='assets/img/logo.png';" />
          </div>
          <p class="name">{{ item.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { getRecomData, getPersonData } from "network/discover.js";
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const state = reactive({
  recomData: [],
  personData: [],
  recomShow: new Array(10).fill(false),
});

getRecomData(10).then((res) => {
  // console.log(res.data.result);
  state.recomData = res.data.result;
});

getPersonData().then((res) => {
  //console.log(res);
  state.personData = res.data.result;
});

const remMouse = (i) => {
  state.recomShow[i] = true;
};
const remLeave = (i) => {
  state.recomShow[i] = false;
};
const remClick = (i) => {
  router.push({ path: `/discover/musiclistdetail/${state.recomData[i].id}` });
  //  router.push({
  //    name:'artist',
  //    params:{
  //      id:state.recomData[i].id
  //    }
  //  })
  // //  router.push({
  //    path:'/discover/artist',
  //    query:{
  //      id:state.recomData[i].id
  //    }
  //  })
  //console.log(state.recomData);
};

const personClick = (i) => {
  console.log(i);
};
</script>

<style lang="less" scoped>
.contens {
  display: flex;
  flex-wrap: wrap;
  // li:hover{
  // }
  li {
    width: 20%;
    padding: 8px;
    position: relative;
    .listen,
    .rem {
      position: absolute;
      top: 8px;
      right: 8px;
      height: 25px;
      line-height: 25px;
      width: 92%;
      font-size: 14px;
      color: white;
      text-align: right;
      padding-left: 5px;
      background-color: rgb(109, 109, 109);
    }
    .rem {
      text-align: left;
    }
    .bofang {
      position: absolute;
      bottom: 60px;
      left: 20px;
      font-size: 25px;
      color: red;
    }
    .imgs {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .name {
      font-size: 13px;
      text-align: left;
    }
  }
}
h4 {
  padding-top: 20px;
}
</style>
