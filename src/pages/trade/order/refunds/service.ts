import request from '@/utils/request';

export async function fetchInfo(id: string) {
  return {
    id,
    name: '姓名',
    sex: '1',
    phone: 'phone',
    date: '19930925',
    status: '1',
    field4: 'field4',
    age: '33',
  };
}

export async function fetchRefundsList(
  paymentFailed: string,
  page: number = 1,
  size: number = 100,
) {
  return request('/transaction/reimburse_order_info', { params: { paymentFailed, page, size } });
}
