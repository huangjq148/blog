import request from '@/utils/request';

export async function fetchInfo(id: string) {
  return request(`/enterprise/query/by/id`, { params: { id } });
}
