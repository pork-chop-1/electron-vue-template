
import { request } from "@/utils/request";
import { ArtistType } from "../Artist";

export type CollectionAlbumsType = {
  subTime: number;
  msg: string[];
  alias: string[];
  artists: ArtistType[];
  picId: number,
  picUrl: string,
  name: string,
  id: 2075200,
  size: 21,
  transNames: string[];
}
/**
 * 获取收藏列表
 * 
 */
export function getCollectedAlbums(limit: number = 25, offset: number = 0) {
  return request<{
    code: number,
    count: number,
    data: CollectionAlbumsType[]
  }>({
    url: '/album/sublist',
    method: 'GET',
    params: {
      limit,
      offset
    }
  })
}