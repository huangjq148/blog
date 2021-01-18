import request from '@/utils/request';
import qs from "qs"

/**
 * 查看企业账户信息
 * @param id
 */
export async function fetchInfo(id: string) {
  // return request(`/enterprise/acc/query/by/id`, { params: { id } });
  return request(`/enterprise/acc/queryChannelAccInfo`, { params: { id } });
}

/**
 * 保存企业账户信息
 * @param id
 */
export async function updateRate(data: any) {
  // return request.post(`/enterprise/acc/update/rate`, { data });
  const newData = data;
  delete newData.updateDate;
  delete newData.createDate;
  return request.post('/enterprise/acc/update/rate', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(newData),
  });
}
