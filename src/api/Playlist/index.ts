import { request, Response } from '@/utils/request'
import { SongType } from '../Song'

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
  playListDetail: (id: number) => {
    return request<Response<DailySongsType>>({
      url: '/playlist/detail',
      method: 'GET',
      params: {
        id
      }
    })
  },
  
}