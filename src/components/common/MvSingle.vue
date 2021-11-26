<template>
  <div class="content" :key="key">
    <div class="mvlist" v-for="(item,index) in data.newMvs" @click="mvClick(index)" @mouseover="remMouse(index)" @mouseout="remLeave(index)" :key="index">
      <img v-lazy="item.cover" alt="">
      <div class="playcount"><span class="iconfont icon-bofang"></span> {{Math.floor(item.playCount/10000)!= 0 ? Math.floor(item.playCount/10000) + '万' : item.playCount}}</div>
      <div class="name">{{item.name}}</div>
      <div class="artist">{{item.artistName}}</div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
export default {
  props: {
    mvList: [],
  },
  setup(props) {
    let data = reactive({
      newMvs: [],
      recomShow: new Array(10).fill(false),
    });
    const router = useRouter();

    let key = ref(0);
    data.newMvs = props.mvList;
    // console.log(data.newMvs);
    watch(
      () => props.mvList,
      (newValue) => {
        data.newMvs = newValue;
        key.value++;
      }
    );
    const mvClick = (index) => {
      router.push({
        // path: `/discover/mvdetail/${data.mvs[index].id}`,
        name: "mvdetail",
        params: {
          id: data.newMvs[index].id,
        },
      });
    };
    const remMouse = (i) => {
      data.recomShow[i] = true;
    };
    const remLeave = (i) => {
     data.recomShow[i] = false;
    };

    return {
      data,
      mvClick,
      key,
      remMouse,
      remLeave,
    };
  },
};
</script>
<style lang="less" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .mvlist {
    width: 20%;
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
</style>