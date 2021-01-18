import { request } from 'umi';
import myRequest from "@/utils/request"

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  return myRequest<API.CurrentUser>('/user/api/info');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}

// 获取用户菜单权限
export async function fetchMenuList() {
  return myRequest.get('/user/menu');
}
