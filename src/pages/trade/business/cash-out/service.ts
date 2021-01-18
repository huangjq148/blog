import request from '@/utils/request';

export async function fetchInfo(id: string) {
  return request(`/transaction/withdraw_info`, { params: { id } });
}
