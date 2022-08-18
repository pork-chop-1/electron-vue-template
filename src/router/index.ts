import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import {staticRoutes} from './staticPage'
import DayRecommend from '@/views/DayRecommend/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/DayRecommend',
    name: 'DayRecommend',
    component: DayRecommend,
    meta: {
      description: '发现音乐'
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