import { request, Response } from '@/utils/request'
import { AccountType } from '../User'
export type SongCommentType = {
  commentId: number,
  content: string,
  liked: boolean,
  likedCount: number,
  parentCommentId: number,
  time: number,
  timeStr: string,
  user: AccountType
}

export type SongCommentResType = {
  code: 200,
  comments: SongCommentType[]
  hotComments: SongCommentType[],
  total: number,
  more: boolean,
  userId: number
}

export const Comment = {
  getSongComment: (id: number, limit: number, offset: number) => {
    return request<Response<SongCommentResType>>({
      url: '/comment/music',
      method: 'GET',
      params: {
        id,
        limit,
        offset
      }
    })
  },
}
