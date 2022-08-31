import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import {staticRoutes} from './staticPage'
import DayRecommend from '@/views/DayRecommend/index.vue'
import Playlist from '@/views/Playlist/index.vue'
import ArtistDetail from '@/views/ArtistDetail/index.vue'
import SongDetail from '@/views/SongDetail/index.vue'
import AlbumDetail from '@/views/AlbumDetail/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/DayRecommend',
    name: 'DayRecommend',
    component: DayRecommend,
    meta: {
      description: '每日推荐'
    }
  },
  {
    path: '/playList/:id',
    name: 'Playlist',
    component: Playlist,
    meta: {
      description: '歌单详情'
    }
  },
  {
    path: '/artistDetail/:id',
    name: 'artistDetail',
    component: ArtistDetail,
    meta: {
      description: '艺术家详情'
    }
  },
  {
    path: '/songDetail/:id',
    name: 'songDetail',
    component: SongDetail,
    meta: {
      description: '歌曲详情'
    }
  },
  {
    path: '/albumDetail/:id',
    name: 'albumDetail',
    component: AlbumDetail,
    meta: {
      description: '歌曲详情'
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