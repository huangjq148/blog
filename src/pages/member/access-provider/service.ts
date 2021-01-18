import request from '@/utils/request';
import { saveOrUpdate } from '@/services/base';

/**
 * 新增应用接入商
 * @param data
 */
export async function add(data: any) {
  return saveOrUpdate('/applier/add/applier', data);
}

/**
 * 通道配置
 * @param applierId 接入商id
 * @param paymentChannelIds  通道列表id
 */
export async function applierPaymentRef(data: { applierId: string; paymentChannelIds: string }) {
  return saveOrUpdate('/applier/add/applierPaymentRef', data);
}

/**
 * 获取关联通道列表
 * @param applierId 接入商id
 */
export async function applierPaymentRefList(applierId: string) {
  return request.get('/applier/applierPaymentRefList', { params: { applierId } });
}

/**
 * 更新应用接入商
 * @param data
 */
export async function update(data: any) {
  return saveOrUpdate('/applier/edit/applier', data);
}

/**
 * 获取应用接入商信息
 * @param id
 */
export async function fetchInfo(id: string) {
  return request(`/applier/query/by/id`, { params: { id } });
}
