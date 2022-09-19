import { request, Response } from "@/utils/request";
import { CollectionAlbumsType } from "../Album";
import { ArtistType } from "../Artist";
import { PlaylistType } from "../Playlist";
import { SongType } from "../Song";

export function getDefaultSearch() {
  return request<{
    code: number,
    data: {
      showKeyword: string,
      realkeyword: string
    }
  }>({
    url: '/search/default',
    method: 'GET',
    params: {
    }
  })
}

export type SearchSuggestionType = {
  "albums": CollectionAlbumsType[],
  "artists": ArtistType[],
  "songs": SongType[],
  playlists: PlaylistType[],
  "order": (keyof SearchSuggestionType)[]
}

export function getSearchSuggest(keywords: string) {
  return request<{code: number, result: SearchSuggestionType}>({
    url: '/search/suggest',
    method: 'GET',
    params: {
      keywords
    }
  })
}
/**
 * 搜索多重匹配
 */
export function getSearchRes(keywords: string, type?: number) {
  return request({
    url: '/search',
    method: 'GET',
    params: {
      keywords,
      type
    }
  })
}