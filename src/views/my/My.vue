<template>
  <div class="w my" :key="key">
    <el-container>
      <el-aside width="25%">
        <el-space wrap :size="size">
          <el-card class="box-card" style="width: 100%">
            <template #header>
              <div class="card-header">
                <el-button class="button" type="text" style="font-size:18px" @click="data.dialogFormVisible = true">创建歌单 + </el-button>

                <el-dialog v-model="data.dialogFormVisible" title="创建歌单">
                  <el-form :model="data.form">
                    <el-form-item label="歌单名称" :label-width="formLabelWidth">
                      <el-input v-model="data.form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="是否设置为隐私歌单" :label-width="data.formLabelWidth">
                      <el-select v-model="data.form.privacy" placeholder="否">
                        <el-option label="否" value=""></el-option>
                        <el-option label="是" value="10"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="data.dialogFormVisible = false">取消</el-button>
                      <el-button type="primary" @click="addGedan">确定</el-button>
                    </span>
                  </template>
                </el-dialog>

              </div>
            </template>
            <div style="font-weight:700; padding: 5px 0;">歌单列表</div>
            <div v-for="(item, index) in data.playlist" @click.left="playClick(index)" :key="index" class="asideitem" @click.right.prevent="rightClick(index)">
              <span class="iconfont icon-yinle"></span> {{ item.name }}
            </div>
          </el-card>
        </el-space>
      </el-aside>

      <el-main>
        <musiclist-detail :id="data.id"></musiclist-detail>
      </el-main>
    </el-container>

  </div>
</template>
<script>
import {
  getUserData,
  getUserPlayList,
  getPlayDetail,
  getCreatePlay,
} from "network/user.js";
import { getStore } from "assets/js/common.js";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import MusiclistDetail from "views/discover/MusiclistDetail.vue";

export default {
  components: {
    MusiclistDetail,
  },
  setup() {
    let data = reactive({
      playlist: [],
      id: Number,
      currentIndex: 0,
      dialogFormVisible: false,
      form: {
        name: "",
        privacy: "",
        delivery: false,
        type: [],
      },
      formLabelWidth: "200px",
    });
    let visible = ref(false);

    let router = new useRouter();
    const uid = getStore("musicuId");
    let key = ref(0);

    getUserData(uid).then((res) => {
      //  console.log(res);
    });
    let play = {
      uid,
    };

    //获取用户的歌单
    const getUserPlay = (play) => {
      getUserPlayList(play).then((res) => {
        // console.log(res);
        data.playlist = res.data.playlist;
        //   console.log(res.data.playlist);
        data.playlist.shift();
        data.id = res.data.playlist[0].id;
      });
    };
    getUserPlay(play);

    const getUserPlayDetail = (id) => {
      getPlayDetail(id).then((res) => {
        // console.log(res);
      });
    };

    //点击侧边栏对应的歌单
    const playClick = (index) => {
      data.id = data.playlist[index].id;
      // console.log(data.id);
      data.currentIndex = index;
      // console.log(index, data.playlist[index].id);
      getUserPlayDetail(data.playlist[index].id);
    };

    const addGedan = () => {
      data.dialogFormVisible = false;
      console.log(data.form);
      let name = data.form.name;
      let config = {
        name,
      };
      if (data.form.privacy.length) config.privacy = data.form.privacy;
      console.log(config);
      getCreatePlay(config).then((res) => {
        //console.log(res);
        data.playlist.unshift(res.data.playlist);
        // key.value++
        // console.log(data.playlist);
      });
    };

    //点击右键
    const rightClick = (index) => {
   
      console.log(index);
      visible.value = true;
    };
    //确定删除歌单
    const delePlay = (index) => {
      console.log(index);
      visible.value = false;
    };

    return {
      data,
      playClick,
      addGedan,
      key,
      rightClick,
      delePlay,
      visible,
    };
  },
};
</script>


<style lang="less" scoped>
.my {
  .box-card {
    padding: 0;
    .asideitem {
      text-align: left;
      padding: 10px 0;
      font-size: 17px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
    .asideitem:hover {
      color: rgba(0, 162, 255, 0.795);
      width: 100%;
    }
  }
}
</style>