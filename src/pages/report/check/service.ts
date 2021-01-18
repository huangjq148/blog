import request from '@/utils/request';

export async function fetchInfo(id: string) {
  return {
    id,
    name: '姓名',
    sex: '1',
    phone: 'phone',
    date: '19930925',
    field4: 'field4',
  };
}

export async function comfirm(id: string) {
  return request.post('/transaction/confirm_statement', { params: { id } });
}
