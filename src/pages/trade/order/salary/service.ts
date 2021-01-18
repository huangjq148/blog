import request from '@/utils/request';

export async function fetchInfo(id: string) {
  return request(`/transaction/per_order_info`, { params: { id } });
}
