import request from '@/utils/request';
import qs from 'qs';

export async function fetchTable(url: string, params: Object) {
  return request(url, { params });
}

export async function saveOrUpdate(url: string, data: any, method = 'post') {
  const newData = data;
  delete newData.updateDate;
  delete newData.createDate;
  return request(url, {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(newData),
  });
}
