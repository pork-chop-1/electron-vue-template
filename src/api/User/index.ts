import { request, Response } from '@/utils/request'
import { SongType } from '../Song'

export type AccountType = {
  avatarUrl: string,
  backgroundUrl: string,
  birthday: number,
  createTime: number,
  nickname: string,
  userId: number,
}

export function getAccount() {
  return request<{
    code: number,
    profile: AccountType | null
  }>({
    url: '/user/account',
    method: 'GET',
    params: {
      timestamp: new Date().getTime()
    }
  })
}

export function getLikeList() {
  return request<{
    code: number,
    ids: number[]
  }>({
    url: '/likelist',
    method: 'GET',
    params: {
      // timestamp: new Date().getTime()
    }
  })
}
export function getUserDetail(uid: number) {
  return request({
    url: '/user/detail',
    method: 'GET',
    params: {
      uid
    }
  })
}

export type RecentSongType = {
  list: {
    data: SongType,
    playTime: number,
    resourceType: string,
  }[]
  total: number,
}

export function getRecentSong(limit: number = 100) {
  return request<Response<RecentSongType>>({
    url: '/record/recent/song',
    method: 'GET',
    params: {
      limit
    }
  })
}