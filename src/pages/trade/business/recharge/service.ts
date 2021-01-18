import request from '@/utils/request';

export async function fetchInfo(id: string) {
  return request(`/transaction/recharge_info`, { params: { id } });
}
