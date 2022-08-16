import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import UserMain from '@/views/UserMain/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'UserMain',
    component: UserMain,
  }
];


export const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(''),
  routes,
});
export default router;