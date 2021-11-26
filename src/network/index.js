import axios from 'axios';
import { getStore } from 'assets/js/common.js';

export function request(config) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      //创建实例
      baseURL: 'http://localhost:3000',
      timeout: 5000, //在超时前 所有请求都会等待1s
    });
    // console.log(config);
    // 添加请求拦截器
    instance.interceptors.request.use(
      function (config) {
        const cookie = getStore('musicCookie');
       // console.log(config);
        if (cookie) {
          //表示用户已经登录
         // console.log(config.params);
          if (!config.params) {
            config.params = {
              cookie: encodeURIComponent(cookie),
            };
          } else {
            config.params['cookie'] = encodeURIComponent(cookie);
          }
        }
      //  console.log(config);
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
      function (response) {
        // 对响应数据做点什么
        return response;
      },
      function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );

    instance(config) //发送网络请求
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
