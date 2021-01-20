import type { TableListParams, TableListItem } from './data.d';
import request from '@/utils/request';

export async function queryPage(params?: TableListParams) {
  return request('/article', {
    params,
  });
}

export async function findById(id: string) {
  return request(`/article/${id}`);
}

export async function remove(ids: string) {
  return request(`/article/${ids}`, {
    method: 'DELETE',
  });
}

export async function add(data: TableListItem) {
  return request('/article', {
    method: 'POST',
    data,
  });
}

export async function update(data: TableListParams) {
  return request(`/article/${data.id}`, {
    method: 'PUT',
    data,
  });
}
