<template>

  <div v-if="state.updata">
    <ul class="contens w">
      <li v-for="(item, index) in props.catList" :key="index" @click="remClick(index)" @mouseover="remMouse(index)" @mouseout="remLeave(index)">
        <div class="imgs">
          <img v-lazy="item.coverImgUrl" οnerrοr="javascript:src='assets/img/logo.png';" @load="handleRefresh" alt />
        </div>
        <el-collapse-transition>
          <div class="listen" v-show="!state.recomShow[index]">
            <span class="iconfont icon-erji"></span> <span style="padding-left:3px">{{ item.playCount }}</span>
          </div>
        </el-collapse-transition>
        <el-collapse-transition>
          <p class="rem" v-show="state.recomShow[index]">
            推荐
          </p>
        </el-collapse-transition>

        <transition name="el-zoom-in-center">
          <p class="iconfont icon-bofang bofang" v-show="state.recomShow[index]"></p>
        </transition>
        <p class="name">{{ item.name }}</p>
      </li>
    </ul>
  </div>

</template>


<script setup>
import {
  reactive,
  ref,
  defineProps,
  watch,
  computed,
  toRefs,
  provide,
  nextTick,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { debounce } from "assets/js/common.js";

const router = useRouter();

const props = defineProps({
  catList: Array,
});

const state = reactive({
  recomData: [],
  personData: [],
  recomShow: new Array(10).fill(false),
  catList: [],
  updata: true,
});

watch(
  () => props.catList,
  (newval) => {
  //  console.log(props.catList);
    state.updata = false;
    state.catList = newval;
    nextTick(() => {
      state.updata = true;
    });
  },
  { immediate: true, deep: true }
);

const remMouse = (i) => {
  state.recomShow[i] = true;
};
const remLeave = (i) => {
  state.recomShow[i] = false;
  let flag = true;
};
const remClick = (i) => {
  router.push({ path: `/discover/musiclistdetail/${state.catList[i].id}` });
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

//图片加载完之后执行
const handleRefresh = () => {
 // console.log("11");
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
      padding-right: 5px;
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
      height: 35px;
      /* 在恰当的断字点进行换行 */
      word-break: break-all;
      /* 超出范围隐藏 */
      overflow: hidden;
      /* 文字超出用省略号 */
      text-overflow: ellipsis;
      /* 盒子模型 */
      display: -webkit-box;
      /* 显示的文本行数 */
      -webkit-line-clamp: 2;
      /* 子元素的垂直排列方式 */
      -webkit-box-orient: vertical;
    }
  }
}
</style>




