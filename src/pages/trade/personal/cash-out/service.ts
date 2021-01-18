import request from '@/utils/request';

export async function fetchInfo(id: string) {
  return request(`/transaction/per_withdraw_info`, { params: { id } });
}
