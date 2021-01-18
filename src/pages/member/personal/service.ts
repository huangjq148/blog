import request from '@/utils/request';

export async function fetchInfo(id: string) {
  return request(`/personal/query/by/id`, { params: { id } });
}
