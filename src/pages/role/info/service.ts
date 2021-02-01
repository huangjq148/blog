import type { TableListParams, TableListItem } from './data.d';
import request from '@/utils/request';

export async function queryPage(params?: TableListParams) {
  return request('/role', {
    params,
  });
}

export async function findById(id: string) {
  return request(`/role/${id}`);
}

export async function remove(ids: string) {
  return request(`/role/${ids}`, {
    method: 'DELETE',
  });
}

export async function add(data: TableListItem) {
  return request('/role', {
    method: 'POST',
    data,
  });
}

export async function update(data: TableListParams) {
  return request(`/role/${data.id}`, {
    method: 'PUT',
    data,
  });
}
