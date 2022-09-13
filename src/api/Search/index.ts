import { request } from "@/utils/request";

export function getDefaultSearch() {
  return request({
    url: '/search/default',
    method: 'GET',
    params: {
    }
  })
}

export function getSearchSuggest(keywords: string) {
  return request({
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
export function getSearchRes(keywords: string) {
  return request({
    url: '/search/multimatch',
    method: 'GET',
    params: {
      keywords
    }
  })
}