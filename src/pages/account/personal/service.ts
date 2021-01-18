import request from '@/utils/request';

export async function fetchInfo(id: string) {
  // return request(`/personal/acc/query/by/id`, { params: { id } });
  return request(`/personal/acc/queryChannelAccInfo`, { params: { id } });
}
