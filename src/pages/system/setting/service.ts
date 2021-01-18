import request from '@/utils/request';
import qs from 'qs';

/**
 * 保存配置信息
 * @param id
 */
export async function update(data: any) {
  const newData = data;
  delete newData.updateDate;
  delete newData.createDate;
  return request.post('/sys/config/edit', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(newData),
  });
}
