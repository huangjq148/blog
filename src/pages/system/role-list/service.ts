import request from '@/utils/request';
import qs from 'qs';
import { saveOrUpdate } from '@/services/base';

/**
 * 保存配置信息
 * @param id
 */
export async function updateRole(data: any) {
  const newData = data;
  delete newData.updateDate;
  delete newData.createDate;
  return request.post('/sys/edit_role', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(newData),
  });
}

// 新增角色
export async function addRole(data: any) {
  return saveOrUpdate('/sys/add_role', data);
}

// 查询权限角色列表
export async function fetchMenuList(roleId: string) {
  return request.get('/sys/menu_list', { params: { roleId } });
}
// 查询权限角色列表
export async function saveEditRoleMenu(data: any) {
  return saveOrUpdate('/sys/edit_role_menu', data);
}
