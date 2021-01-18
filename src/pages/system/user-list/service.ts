import request from '@/utils/request';
import { saveOrUpdate } from '@/services/base';

/**
 * 重置密码
 * @param data
 */
export async function resetPassword(data: {
  passWord: string;
  twoPassWord: string;
  userId: string;
}) {
  return saveOrUpdate('/sys/reset_password', data);
}

/**
 * 重置密码
 * @param data
 */
export async function editStatus(data: { status: number; userId: string }) {
  return saveOrUpdate('/sys/edit_status', data);
}

/**
 * 重置密码
 * @param data
 */
export async function addUser(data: any) {
  return saveOrUpdate('/sys/add_user', data);
}
