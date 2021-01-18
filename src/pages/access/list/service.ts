import request from '@/utils/request';
import qs from "qs"

export async function fetchInfo(id: string) {
    return {
        id,
        name: "姓名",
        sex: "1",
        phone: "phone",
        date: "19930925",
        field4: "field4",
    }
}

/**
 * 新增通道信息
 * @param data
 */
export async function add(data: any) {
  const newData = data;
  delete newData.updateDate;
  delete newData.createDate;
  return request.post('/payment_channel/add', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(newData),
  });
}
/**
 * 更新通道信息
 * @param data
 */
export async function update(data: any) {
  const newData = data;
  delete newData.updateDate;
  delete newData.createDate;
  return request.post('/payment_channel/edit', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(newData),
  });
}
