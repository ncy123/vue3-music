import { createApp } from 'vue';
import App from './App.vue';
import VueRouter from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import lazyPlugin from 'vue3-lazy';

import vue3videoPlay from 'vue3-video-play'; // 引入组件
import 'vue3-video-play/dist/style.css'; // 引入css
import store from './store';
import { request } from "network/index.js";

const app = createApp(App);

app.use(vue3videoPlay);

lazyPlugin.install(app, {
  loading: 'loading.png',
  error: 'error.png',
});

app.use(VueRouter);
app.use(ElementPlus);
app.use(store);

request({
  url:"/login/status"
}).then(res => {
  console.log(res.data.data.account);
})


//路由判断登录 根据路由配置文件的参数
// VueRouter.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requireAuth)) {
//     // 判断该路由是否需要登录权限
//     console.log('需要校验');

//     if (false) {
//       console.log('有');
//       // 判断当前的token是否存在 ； 登录存入的token
//       next();
//     } else {
//       console.log('需要登录');
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       });
//     }
//   } else {
//     next();
//   }
// });

app.mount('#app');
