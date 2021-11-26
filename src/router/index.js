import { createRouter, createWebHistory } from 'vue-router';

import Home from 'views/home/Home.vue';
import About from 'views/about/About.vue';
import Discover from 'views/discover/Discover.vue';
import My from 'views/my/My.vue';
//import Friend from 'views/friend/Friend.vue';

const routes = [
  {
    path: '/',
    // name: '',
    redirect: '/discover',
  },
  {
    path: '/discover',
    name: 'discover',
    component: Discover,
    children: [
      {
        path: '',
        component: () => import('views/discover/Dismain.vue'),
      },
      {
        path: 'toplist',
        component: () => import('views/discover/Toplist.vue'),
      },
      {
        path: 'playlist',
        name: 'playlist',
        component: () => import('views/discover/Playlist.vue'),
      },
      {
        path: 'mv',
        component: () => import('views/discover/MvList.vue'),
      },
      {
        path: 'mvdetail/:id',
        name: 'mvdetail',
        component: () => import('views/discover/MvDetail.vue'),
      },
      {
        path: 'artist',
        name: 'artist',
        component: () => import('views/discover/Artist.vue'),
        // component: () => import('views/discover/MvList.vue'),
      },
      {
        path: 'artistdetail',
        // name: 'artistdetail',
        component: () => import('views/discover/Artistdetail.vue'),
      },
      //
      {
        path: 'album',
        component: () => import('views/discover/Album.vue'),
      },
      {
        path: 'musiclistdetail/:id',
        component: () => import('views/discover/MusiclistDetail.vue'),
      },
    ],
  },
  {
    path: '/my',
    name: 'my',
    component: My,
    //通过meta指定路由是否需要登录校验标识
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/friend',
    component: () => import('views/friend/Friend.vue'),
    //  component: Friend
  },
  {
    path: '/searchdetail/:keyword',
    name: 'searchdetail',
    component: () => import('views/search/SearchDetail.vue'),
    //  component: Friend
    // redirect:"/",
    children: [
      // {
      //   path: '/',
      //   redirect: 'song',
      // },
      {
        path: 'song',
        name: 'song',
        component: () => import('views/search/child/Song.vue'),
      },
      {
        path: 'artist',
        name: 'artists',
        component: () => import('views/search/child/Artists.vue'),
      },
      {
        path: 'playlist',
        name: 'playlists',
        component: () => import('views/search/child/Playlists.vue'),
      },
      {
        path: 'ablum',
        name: 'ablum',
        component: () => import('views/search/child/Ablum.vue'),
      },
      {
        path: 'Mv',
        name: 'Mv',
        component: () => import('views/search/child/Mv.vue'),
      },
    ],
  },
];

const router = createRouter({
  //mode: 'history',
  history: createWebHistory(),
  routes,
});

export default router;
