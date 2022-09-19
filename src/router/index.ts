import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import {staticRoutes} from './staticPage'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/DayRecommend',
    name: 'DayRecommend',
    component: () => import('@/views/DayRecommend/index.vue'),
    meta: {
      description: '每日推荐'
    }
  },
  {
    path: '/playList/:id',
    name: 'Playlist',
    component:  () => import('@/views/Playlist/index.vue'),
    meta: {
      description: '歌单详情'
    }
  },
  {
    path: '/artistDetail/:id',
    name: 'artistDetail',
    component: () => import('@/views/ArtistDetail/index.vue'),
    meta: {
      description: '艺术家详情'
    }
  },
  // {
  //   path: '/songDetail/:id',
  //   name: 'songDetail',
  //   component: SongDetail,
  //   meta: {
  //     description: '歌曲详情'
  //   }
  // },
  {
    path: '/albumDetail/:id',
    name: 'albumDetail',
    component: () => import('@/views/AlbumDetail/index.vue'),
    meta: {
      description: '专辑详情'
    }
  },
  {
    path: '/searchRes/:keyword',
    name: 'searchRes',
    component: () => import('@/views/SearchRes/index.vue'),
    meta: {
      description: '搜索结果'
    }
  },
];
routes.push(
  ...staticRoutes
)

export const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(''),
  routes,
});
export default router;