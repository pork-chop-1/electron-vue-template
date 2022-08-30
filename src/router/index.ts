import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import {staticRoutes} from './staticPage'
import DayRecommend from '@/views/DayRecommend/index.vue'
import Playlist from '@/views/Playlist/index.vue'

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