import { request, Response } from '@/utils/request'

// https://neteasecloudmusicapi.vercel.app/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e6%9b%b2%e8%af%a6%e6%83%85
export type SongType = {
  name: string,
  id: number,
  alia: string[],
  al: {
    id: number,
    name: string,
    picUrl: string,
    tns: string[],
  },
  ar: {
    name: string,
    id: number
  }[],
  /** 歌曲时长 */
  dt: number,
}

export type SongDetailRes = {
  code: number,
  privileges: {

  },
  songs: SongType[]
}

export const Song = {
  detail: (id: string | string[]) => {
    const ids = id instanceof Array ? id.join(',') : id;
    return request<SongDetailRes>({
      url: '/song/detail',
      method: 'GET',
      params: {
        ids
      }
    })
  }
}