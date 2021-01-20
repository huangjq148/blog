// import { request } from 'umi';
import type { TableListParams, TableListItem } from './data.d';
import request from '@/utils/request';

export async function queryPage(params?: TableListParams) {
  return request('/user', {
    params,
  });
}

export async function findById(id: string) {
  return request(`/user/${id}`);
}

export async function remove(ids: string) {
  return request(`/user/${ids}`, {
    method: 'DELETE',
  });
}

export async function add(data: TableListItem) {
  return request('/user', {
    method: 'POST',
    data,
  });
}

export async function update(data: TableListParams) {
  return request('/user', {
    method: 'PUT',
    data,
  });
}
