import { request } from "@/utils/request"

export type ArtistType = {
  "img1v1Id": number,
  "topicPerson": number,
  "alias": string[],
  "picId": number,
  "musicSize": number,
  "albumSize": number,
  "mvSize": number,
  "briefDesc": string,
  "picUrl": string,
  "img1v1Url": string,
  "followed": boolean,
  "trans": string,
  "name": string,
  "id": number,
  "img1v1Id_str": string
}


/**
 * 获取收藏列表
 * 
 */
 export function getCollectedArtists() {
  return request<{
    code: number,
    count: number,
    data: ArtistType[]
  }>({
    url: '/artist/sublist',
    method: 'GET',
    params: {
    }
  })
}