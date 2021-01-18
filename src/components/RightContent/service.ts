import { saveOrUpdate } from '@/services/base';

export async function changePassWord(data: {
  newPassWord: string;
  newPassWordTwo: string;
  oldPassWord: string;
}) {
  return saveOrUpdate('/change_passWord', data);
}
