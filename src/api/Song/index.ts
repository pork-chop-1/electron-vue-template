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

export type SongURLType = {
  br: number
  canExtend: boolean
  code: number
  effectTypes: null
  encodeType: string
  expi: number
  fee: number
  flag: number
  freeTimeTrialPrivilege: {resConsumable: false, userConsumable: false, type: 0, remainTime: 0}
  freeTrialInfo: null
  freeTrialPrivilege: {resConsumable: false, userConsumable: false, listenType: null}
  gain: number
  id: number
  level: string
  md5: string
  payed: 1
  podcastCtrp: null
  rightSource: 0
  size: number
  time: number
  type: string
  uf: null
  url: string
  urlSource: 0
}

export const Song = {
  detail: (id: number | number[]) => {
    const ids = id instanceof Array ? id.join(',') : id;
    return request<SongDetailRes>({
      url: '/song/detail',
      method: 'GET',
      params: {
        ids
      }
    })
  },
  /**
   * https://neteasecloudmusicapi.vercel.app/#/?id=%e8%8e%b7%e5%8f%96%e5%ae%a2%e6%88%b7%e7%ab%af%e6%ad%8c%e6%9b%b2%e4%b8%8b%e8%bd%bd-url
   */
  url: (id: number, br?: number) => {
    return request<Response<SongURLType[]>>({
      url: '/song/url',
      method: 'GET',
      params: {
        id,
        br
      }
    })
  }
}