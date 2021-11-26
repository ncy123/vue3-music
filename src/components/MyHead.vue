<template>
  <div class="head1">
    <div class="w">
      <div class="title">
        <div class="imgs"><img src="~assets/img/logo.png"></div>
        <div class="name">网易云音乐</div>
      </div>
      <div class="navs">
        <ul>
          <li v-for="(item, index) in navname" :key="index" @click="navClick(index)" :class="{white: currentIndex === index}">{{item}}
            <div :class="{triangle: currentIndex === index}"></div>
          </li>
        </ul>
      </div>
      <div class="right">
        <el-popover :width="400" trigger="hover" @show="inputClick">
          <template #reference>
            <el-input placeholder="音乐/视频/用户/电台" size="small" style="width:170px; padding:0" class="input-label" v-model="inputSearch" clearable prefix-icon="el-icon-search">
            </el-input>
          </template>
          <div class="search" style="height:500px;overflow: scroll;">
            <div class="search-list" style="height:60px; magin-buttom:10px;" v-for="(item, index) in data.hotSearch" :key="index" @click="keyworkClick(index)">
              <div class="index" style="float: left; width: 30px; padding-right:8px; text-align:center">{{index+1}}</div>
              <div class="cont">
                <span style="font-size:18px">{{item.searchWord}}</span> <span style="color:rgb(189, 186, 186); padding-left:10px">{{item.score}}</span>
                <div style="color:rgb(167, 167, 167;  overflow: hidden;">
                  {{item.content}}
                </div>
              </div>
            </div>
          </div>
        </el-popover>

        <button>创作者中心</button>
        <div class="user">
          <button v-if="!data.isLogin" @click="login">登录</button>
          <!-- <div><img src="~assets/img/logo.png" alt="" width="50px"></div> -->
          <div v-else>
            <el-dropdown>
              <span class="el-dropdown-link">
                <div class="imgs"><img :src="data.userInfo.avatarUrl" alt="" width="50px"></div>{{data.userInfo.nickname}}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <div class="content">
                  <el-dropdown-menu>
                    <el-dropdown-item><span class="iconfont icon-huiyuan" style="margin-right:8px"></span>会员中心</el-dropdown-item>
                    <el-dropdown-item><span class="iconfont icon-dengji" style="margin-right:8px"></span>等级</el-dropdown-item>
                    <el-dropdown-item><span class="iconfont icon-shouye" style="margin-right:8px"></span>商城</el-dropdown-item>
                    <el-dropdown-item><span class="iconfont icon-gerenxinxi" style="margin-right:8px"></span>个人信息设计</el-dropdown-item>
                    <el-dropdown-item><span class="iconfont icon-bangdingshejiaozhanghao" style="margin-right:8px"></span>绑定社交账号</el-dropdown-item>
                    <el-dropdown-item><span class="iconfont icon-wodekefu" style="margin-right:8px"></span>我的客服</el-dropdown-item>
                    <el-dropdown-item @click="loginOut"><span class="iconfont icon-tuichu" style="margin-right:8px"></span>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </div>
              </template>
            </el-dropdown>
          </div>

        </div>

        <el-dialog title="扫码登录" class="titles" v-model="isLogin" width="30%" :before-close="handleClose1">
          <!-- 二维码 -->
          <div> <canvas id="app-qrcode"> </canvas></div>
          <div class="use">使用<a :href="'/download'">网易云音乐APP</a>扫码登录</div>
          <div class="btn" @click="otherLoginClick">选择其他登录模式</div>
        </el-dialog>

        <el-dialog title="登录" class="titles" v-model="otherLogin" width="30%" :before-close="handleClose2">
          <div>
            <button @click="phoneLogin" style="background-color:white; color: black; font-size: 16px; width: 100px">手机号登录</button><br />
            <button @click="register" style="background-color:white; color: black; font-size: 16px">注册</button>
          </div>
          <el-checkbox v-model="checked1" label="1" style="magin:20px 0">
            同意<router-link to="">《服务条款》</router-link>
            <router-link to="">《隐私政策》</router-link>
            <router-link to="">《儿童隐私政策》</router-link>
          </el-checkbox>
        </el-dialog>

        <el-dialog title="手机号登录" class="titles" v-model="phonelogin" width="30%" :before-close="handleClose3">
          <div>
            <img src="~assets/img/phone.png" style="display: block;margin: 0 auto" alt="">
            <el-form :model="loginInfo" :rules="loginInfoRules" ref="loginInfoRuleForm" style="margin-top: 25px;">

              <el-form-item prop="phone">
                <el-input style="display: block;margin:0 auto;width: 60%" prefix-icon="el-icon-user" v-model="loginInfo.phone" placeholder="请输入手机号"></el-input>

              </el-form-item>

              <el-form-item prop="password">
                <el-input style="display: block;margin:0 auto;width: 60%" show-password prefix-icon="el-icon-lock" v-model="loginInfo.password" type="password" placeholder="请输入密码"></el-input>
              </el-form-item>
            </el-form>
            <el-button @click="loginMusic" type="danger" style="background-color: red;width: 60%;display: block;margin: 0 auto">登录
            </el-button>
          </div>

        </el-dialog>

        <el-dialog title="注册" class="titles" v-model="registers" width="30%" :before-close="handleClose4">

        </el-dialog>

      </div>
    </div>
  </div>
  <div class="red">
    <edit />

  </div>

</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, unref, reactive, computed, watch, onMounted } from "vue";
import { request } from "network";
import QRCode from "qrcode";
import axios from "axios";
import qs from "qs";
import { useStore } from "vuex";
import { setStore, getStore, removeStore } from "assets/js/common.js";
import { userloginOut } from "network/user.js";

//import {mapMutations,mapState} from 'vuex';
const store = useStore();
//console.log(store);

const router = useRouter();

const navname = reactive([
  "发现音乐",
  "我的音乐",
  "朋友",
  "商城",
  "音乐人",
  "下载客户端",
]);
let currentIndex = ref(0);
let inputSearch = ref("");
let isLogin = ref(false);
let otherLogin = ref(false);
let phonelogin = ref(false);
let registers = ref(false);
let checked1 = ref(false);
let loginkey = ref("");
let loginInfoRuleForm = ref(null);

const loginInfo = reactive({
  phone: "",
  password: "",
});
let data = reactive({
  isLogin: false,
  userInfo: {},
  hotSearch: [],
});
data.userInfo = JSON.parse(getStore("currentUserInfo"));
if (data.userInfo) data.isLogin = true;
const route = useRoute();
//console.log(route, route.path, route.path.split("/"));

// switch (route.path.split("/")[1]) {
//   case "discover":
//     currentIndex.value = 0;
//     break;
//   case "my":
//     currentIndex.value = 1;
//     break;
//   case "friend":
//     currentIndex.value = 2;
//     break;
//   case "store":
//     currentIndex.value = 3;
//     break;
//   case "musician":
//     currentIndex.value = 4;
//     break;
//   case "download":
//     currentIndex.value = 5;
//     break;
// }

const navClick = (index) => {
  currentIndex.value = index;
  // console.log(index);
  if (index === 0) {
    router.push({ path: "/" }); // /#
  } else if (index === 1) {
    router.push({ name: "my" }); // /#/my/
  } else if (index === 2) {
    router.push({ path: "/friend" }); ///#/friend
  } else if (index === 3) {
    router.push({ path: "/store/product" }); //  /store/product
  } else if (index === 4) {
    router.push({ path: "/st/musician" }); // /st/musician
  } else {
    //download
    router.push({ path: "/download" }); ///#/download
  }
};
// const handleClose1 = (done) => {
//   done()
// };

//扫码登录
let timer;
const login = () => {
  isLogin.value = true;
  // console.log("login");
  new Promise((resolve, reject) => {
    resolve(
      request({
        url: "/login/qr/key",
        method: "post",
        data: qs.stringify({
          timerstamp: Date.now(),
        }),
        withCredentials: true,
      })
    );
  })
    .then((res) => {
      const key = res.data.data.unikey;
      //console.log(key)
      loginkey.value = key;
      return request({
        url: "/login/qr/create",
        method: "post",
        query: { key, qrimg: true, timerstamp: Date.now() },
        // withCredentials: true
      });
    })
    .then((res) => {
      const url = res.data.data.qrurl;
      const state = document.querySelector("#app-qrcode");
      QRCode.toCanvas(state, url, {
        width: 200,
        color: {
          dark: "#000",
          light: "#fff",
        },
      });
      const key = loginkey.value;
      //开始轮询登录状态
      timer = setInterval(async () => {
        console.log(isLogin.value);
        const statusRes = await checkStatus(key);
        console.log(statusRes);
        if (statusRes.code === 800) {
          alert("二维码已过期,请重新获取");
          clearInterval(timer);
        }
        if (statusRes.code === 803) {
          // 这一步会返回cookie
          clearInterval(timer);
          alert("授权登录成功");
          await getLoginStatus();
        }
      }, 3000);
    });
};

//登录状态检测函数
async function checkStatus(key) {
  const res = await request({
    url: "/login/qr/check",
    data: qs.stringify({ key, timerstamp: Date.now() }),
    method: "post",
    //withCredentials: true
  });
  return res.data;
}
//检测登录状态
async function getLoginStatus() {
  const res = await request({
    url: `/login/status?timerstamp=${Date.now()}`,
    //withCredentials: true
  });
  console.log(res.data);
}

watch(isLogin, () => {
  clearInterval(timer);
});

const otherLoginClick = () => {
  otherLogin.value = true;
  isLogin.value = false;
  clearInterval(timer);
};

const phoneLogin = () => {
  if (!checked1.value) {
    alert("请先勾选同意协议", "提示", {
      confirmButtonText: "确定",
      callback: (action) => {
        this.$message({
          type: "info",
          message: `action: ${action}`,
        });
      },
    });
  } else {
    phonelogin.value = true;
    otherLogin.value = false;
  }
};

const register = () => {
  if (!checked1.value) {
    alert("请先勾选同意协议", "提示", {
      confirmButtonText: "确定",
      callback: (action) => {
        this.$message({
          type: "info",
          message: `action: ${action}`,
        });
      },
    });
  } else {
    registers.value = true;
    otherLogin.value = false;
  }
};

//点击登录
const loginMusic = () => {
  const form = unref(loginInfoRuleForm);
  console.log(form);
  form.validate((valid) => {
    // console.log(valid);
    if (!valid) return alert("请输入正确的信息"); //this.$message.error("请填写正确的信息");
    //  console.log(loginInfo, valid);
    if (!loginInfo.phone.length) return alert("请输入手机号");
    else if (!loginInfo.password.length) return alert("请输入密码");
    axios({
      method: "post",
      url: "http://localhost:3000/login/cellphone",
      data: { ...loginInfo },
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // }
    })
      .then((res) => {
        console.log(res);
        if (res.status !== 200) return alert("登陆失败,请检查登录信息!");
        else {
          if (res.data.code === 502) {
            return alert("密码错误!");
          }
        }
        //保存cookie的信息
        setStore("musicCookie", res.data.cookie);
        setStore("currentUserInfo", res.data.profile);
        setStore("musicuId", res.data.profile.userId);

        // 隐藏弹窗
        phonelogin.value = false;
        data.isLogin = true;
        store.commit("loginIn");
        // console.log(store.state.isLogin);

        data.userInfo = JSON.parse(getStore("currentUserInfo"));
        window.location.reload();
        //  console.log(data);
        ElMessage({
          message: "登陆成功!",
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

const handleClick = () => {
  alert("button click");
};
//退出登录
const loginOut = () => {
  data.isLogin = false;
  // console.log(store.state.isLogin);
  store.commit("loginInOut");
  userloginOut().then((res) => {
    console.log(res);
  });
  window.location.reload();
  // console.log(store.state.isLogin);
};

// 输入框部分
const inputClick = () => {
  request({
    url: "/search/hot/detail",
  }).then((res) => {
    //  console.log(res);
    data.hotSearch = res.data.data;
   // console.log(data.hotSearch);
  });
};
//点击关键词
const keyworkClick = (index) =>{
  console.log(index);
  console.log(data.hotSearch[index].searchWord);
  router.push({
   //  path: `/discover/mvdetail/${data.mvs[index].id}`,
   path: `/searchdetail/${data.hotSearch[index].searchWord}`,
   //
  })
}




</script>



<style lang="less" scoped>
.head1 {
  height: 90px;
  background-color: black;
  .title {
    float: left;
    height: 50px;
    line-height: 50px;
    margin-top: 20px;
    .imgs {
      display: inline-block;
      width: 50px;
      height: 50px;
      border-radius: 25px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        transform: scale(1.15, 1.15);
      }
    }
    .name {
      display: inline-block;
      padding-left: 10px;
      font-size: 23px;
      font-weight: 600;
      color: white;
      vertical-align: top;
    }
  }
  .navs {
    float: left;
    margin-top: 35px;
    font-size: 15px;
    margin-left: 20px;
    ul li {
      width: 80px;
      display: inline-block;
      padding: 0;
      margin: 0;
      color: rgb(175, 175, 175);
      position: relative;
      .triangle {
        position: absolute;
        bottom: -35px;
        left: 33px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid red;
      }
    }
    .white {
      color: white !important;
    }
  }
  .right {
    margin-top: 15px;
    float: left;
    margin-left: 80px;
    .input-label {
      display: inline-block;
      font-size: 12px;
      width: 160px;
      margin: 10px;
      border-radius: 10px;
    }
    button {
      width: 80px;
      height: 30px;
      background-color: black;
      color: rgb(228, 226, 224);
      border: none;
    }
    .user {
      display: inline-block;
      margin-left: 20px;
      // width: 200px;
      .el-dropdown-link {
        color: white;
        .imgs {
          display: inline-block;
          margin: 0 5px;
          width: 40px;
          height: 40px;
          border-radius: 20px;
          overflow: hidden;
          vertical-align: middle;
          img {
            width: 100%;
          }
        }
      }
      .content {
        width: 300px;
        height: 300px;
        background-color: wheat;
      }
    }
    .titles {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      color: rgb(63, 62, 62);
    }
    .use {
      color: rgb(161, 161, 161);
      font-size: 12px;
    }
    .btn {
      margin: 0 auto;
      margin-top: 20px;
      width: 120px;
      height: 28px;
      line-height: 28px;
      border-radius: 14px;
      font-size: 12px;
      border: 1px solid rgb(175, 174, 174);
    }
    .search {
      .search-list {
        height: 50px;
        background-color: turquoise;
        :hover{
          background-color: rgb(156, 156, 156)!important;
        }
        .index {
          float: left;
          width: 20px;
        }
        .cont{
          float: right;
          color: rgb(167, 167, 167);
        }
      }
    }
  }
}
.red {
  height: 5px;
  background-color: red;
}
</style>

