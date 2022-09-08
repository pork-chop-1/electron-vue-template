import { RouteRecordRaw } from "vue-router";
import Discover from '@/views/Discover/index.vue'
import PrivateFM from '@/views/PrivateFM/index.vue'
import MyLikeList from '@/views/MyLikeList/index.vue'
import RecentPlay from '@/views/RecentPlay/index.vue'
import MyCollection from '@/views/MyCollection/index.vue'

export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Discover',
    component: Discover,
    meta: {
      description: '发现音乐'
    }
  },
  {
    path: '/PrivateFM',
    name: 'PrivateFM',
    component: PrivateFM,
    meta: {
      description: '私人FM'
    }
  },
  {
    path: '/MyLikeList',
    name: 'MyLikeList',
    component: MyLikeList,
    meta: {
      description: '我喜欢的音乐'
    }
  },
  {
    path: '/RecentPlay',
    name: 'RecentPlay',
    component: RecentPlay,
    meta: {
      description: '最近播放'
    }
  },
  {
    path: '/MyCollection',
    name: 'MyCollection',
    component: MyCollection,
    meta: {
      description: '我的收藏'
    }
  },
];
