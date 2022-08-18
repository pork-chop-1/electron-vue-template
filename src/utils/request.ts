import axios, { AxiosRequestConfig, type AxiosError } from "axios";

export type Response<T = any> = {
  code: number;
  data: T;
};

const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 请求前
// service.interceptors.request.use((value) => {
//   const authorization = Storage.get('authorization')
//   if(authorization && value.headers) {
//     value.headers['authorization'] = authorization
//   }
//   return value
// })

export const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = await service.request(config);
    if (res.status === 200) {
      return res.data;
    } else {
      return Promise.reject(res.data);
    }
  } catch (error: any) {
    if(error.response?.status == 401) {
    }
    return Promise.reject(error);
  }
};
