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

/**
 * 获取订单详情
 * @param orderNo
 * @param params
 */
export async function fetchOrderDetail(orderNo: string, params = { page: 1, size: 100 }) {
  return request('/transaction/pay_order_info', { params: { ...params, orderNo } });
}

/**
 * 代付支付获取短信
 * @param platformOrderNo 平台订单号
 */
export async function sendMsg(platformOrderNo: string) {
  return request.get('/transaction/send_sms', { params: { platformOrderNo } });
}

/**
 * 代付支付获取短信
 * @param platformOrderNo 平台订单号
 */
export async function payOrder(params: {
  checkCode: string;
  checkCodeRequestNo: string;
  platformOrderNo: string;
}) {
  return request.get('/transaction/pay_order', { params });
}
