import { request } from 'umi';
import myRequest from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
  code: number;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return myRequest<API.LoginStateType>('/login', {
    method: 'get',
    // data: params,
    params: {
      userName: params.username,
      passWord: params.password,
    },
  });
}

// export async function fakeAccountLogin(params: LoginParamsType) {
//   return request<API.LoginStateType>('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return myRequest('/logout');
}
