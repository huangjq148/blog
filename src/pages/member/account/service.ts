import type { TableListParams, TableListItem } from './data.d';
import request from '@/utils/request';

export async function queryPage(params?: TableListParams) {
  return request('/user-account', {
    params,
  });
}

export async function findById(id: string) {
  return request(`/user-account/${id}`);
}

export async function remove(ids: string) {
  return request(`/user-account/${ids}`, {
    method: 'DELETE',
  });
}

export async function add(data: TableListItem) {
  return request('/user-account', {
    method: 'POST',
    data,
  });
}

export async function update(data: TableListParams) {
  return request('/user-account', {
    method: 'PUT',
    data,
  });
}