//import { toDataURL } from "qrcode";
import { createStore } from 'vuex';

export default createStore({
  //声明变量
  state: {
    isLogin: false,
    userInfo: null,
    uid: null,
    cookie: null,
  },
  //修改变量
  mutations: {
    loginIn(state) {
      state.isLogin = true;
    },
    //退出登录状态 删除cookie 和用户信息
    loginInOut(state) {
      state.isLogin = false;
      window.localStorage.removeItem('musicCookie');
      window.localStorage.removeItem('currentUserInfo');
      window.localStorage.removeItem('musicuId');
    
    },
    //存储cookie
  },
  //mutation 的值由actions传入 
  //暴露给用户使用，借此触发mutations中的方法，保存数据（可执行异步操作）
  actions: {

  },
  modules: {},
});
