import { request, Response } from '@/utils/request'

export type AccountType = {
  code: number,
  profile: {
    avatarUrl: string,
    backgroundUrl: string,
    birthday: number,
    createTime: number,
    nickname: string,
    userId: number,
  } | null
}

export function getAccount() {
  return request<AccountType>({
    url: '/user/account',
    method: 'GET',
    params: {
      timestamp: new Date().getTime()
    }
  })
}

export function getLikeList() {
  return request({
    url: '/likelist',
    method: 'GET',
    params: {
      // timestamp: new Date().getTime()
    }
  })
}