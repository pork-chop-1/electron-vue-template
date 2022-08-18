import { request, Response } from '@/utils/request'

export type getQRKeyRes = {
  code: number,
  unikey: string,
}
export type createQRRes = {
  qrimg: string, 
  qrurl: string
}
export type checkQR = {
  code: number,
  cookie: string,
  message: string,
  avatarUrl?: string,
  nickname?: string,

}
export const QRLogin = {
  getQRKey: () => {
    return request<Response<getQRKeyRes>>({
      url: '/login/qr/key',
      method: 'GET',
      params: {
        timestamp: new Date().getTime()
      }
    })
  },
  createQR: (key: string) => {
    return request<Response<createQRRes>>({
      url: '/login/qr/create',
      method: 'GET',
      params: {
        key,
        qrimg: true
      }
    })
  },
  checkQR: (key: string) => {
    return request<checkQR>({
      url: '/login/qr/check',
      method: 'GET',
      params: {
        key,
        timestamp: new Date().getTime()
      }
    })
  },
}