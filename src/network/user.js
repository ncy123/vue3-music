import { request } from './index.js';

//import {getStore} from "assets/js/common.js";
//const cookie = getStore('musicCookie');

//获取账号信息
export function getUserData(cookie) {
  return request({
    url: '/user/account',
    // param: {
    //   cookie
    // }
  });
}

//获取用户歌单
export function getUserPlayList(config) {
  return request({
    url: '/user/playlist',
    params: {
      ...config,
    },
  });
}

//获取用户具体歌单信息
export function getPlayDetail(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id,
    },
  });
}

//新建歌单
export function getCreatePlay(config) {
  return request({
    url: '/playlist/create',
    params: {
      ...config,
    },
  });
}

//退出登录
export function userloginOut() {
  return request({
    url:"/logout"
  })
}
//获取登录状态
export function getLoginState() {
  return request({
    url:"/login/status"
  })
}


