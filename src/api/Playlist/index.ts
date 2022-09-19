import { request, Response } from '@/utils/request'
import { SongType } from '../Song'
import { AccountType } from '../User'

export type PlaylistType = {
  coverImgId: number,
  coverImgUrl: string,
  description: string,
  id: number,
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

export type PlaylistDetailType = {
  creator: {
    accountStatus: number,
    avatarDetail: {
      identityIconUrl: string,
      
    },
    avatarImgId: number,
    avatarUrl: string,
    backgroundUrl: string,
    expertTags: string[],
    nickname: string,
    signature: string,

  },
  tags: string[],
  /** 部分歌曲 */
  tracks: SongType[],
  /** 全部id */
  trackIds: {
    id: number,
    uid: number
  }[],
  privileges: []
} & PlaylistType

export type UserPlaylistsType = {
  subscribers: [],
  subscribed: boolean,
  creator: AccountType,
  artists: null,
  tracks: null,
  updateFrequency: null,
  backgroundCoverId: 0,
  backgroundCoverUrl: string | null,
  titleImage: 0,
  titleImageUrl: string | null,
  englishTitle: null,
  opRecommend: boolean,
  recommendInfo: string | null,
  subscribedCount: number,
  cloudTrackCount: number,
  userId: number,
  totalDuration: number,
  coverImgId: number,
  privacy: number,
  trackUpdateTime: number,
  trackCount: number,
  updateTime: number,
  commentThreadId: string,
  coverImgUrl: string,
  specialType: number,
  anonimous: boolean,
  createTime: number,
  highQuality: boolean,
  newImported: boolean,
  trackNumberUpdateTime: number,
  playCount: number,
  adType: number,
  description: null,
  tags: [],
  ordered: boolean,
  status: 0,
  name: string,
  id: number,
  coverImgId_str: string,
  sharedUsers: null,
  shareStatus: null,
  copied: boolean
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
    return request<{
      code: number,
      playlist: PlaylistDetailType
    }>({
      url: '/playlist/detail',
      method: 'GET',
      params: {
        id
      }
    })
  },
  getUserPlaylist: (uid: number, limit?: number, offset?: number) => {
    return request<{
      code: number,
      playlist: UserPlaylistsType[]
    }>({
      url: '/user/playlist',
      method: 'GET',
      params: {
        uid,
        limit,
        offset
      }
    })
  },
  
}