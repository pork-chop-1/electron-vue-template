import { request, Response } from '@/utils/request'

export type PlaylistType = {
  coverImgId: number,
  coverImgUrl: string,
  description: string,
  id: string,
  name: string,
  playCount: number,
  privacy: number,
  tag: string,
  userId: string
}

export type HighqualityResType = {
  code: number, 
  lasttime: number,
  total: number,
  playlists: PlaylistType[]
}

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

export type DailySongsType = {
  dailySongs: SongType[],
  recommendReasons: {
    songId: number,
    reason: string
  }[]
}

export const Playlist = {
  related: (limit: number) => {
    return request({
      url: '/related/playlist',
      method: 'GET',
      params: {
        limit
      }
    })
  },
  highquality: (limit: number) => {
    return request<HighqualityResType>({
      url: '/top/playlist/highquality',
      method: 'GET',
      params: {
        limit,
        timestamp: Date.now()
      }
    })
  },
  recommendSongs: () => {
    return request<Response<DailySongsType>>({
      url: '/recommend/songs',
      method: 'GET',
      params: {
      }
    })
  },
}