import React, { useState, useRef } from 'react';
import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import { Button } from 'antd';
import EditModal from './edit';
import PermissionModal from './permission';
import { fetchMenuList } from './service';
import AuthorityBtnWrap from '@/components/AuthorityBtnWrap';

const TableList: React.FC<{}> = () => {
  const [permissionModal, setPermissionModal] = useState({ visible: false, info: [], roleId: '' });
  const [editModal, setEditModal] = useState({ visible: false, title: "", info: {} });
  const ref = useRef({ click: () => { } });

  const columns: SearchFormColumn[] = [
    {
      title: '编号',
      dataIndex: 'roleId',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '备注',
      dataIndex: 'roleDesc',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
    },
    {
      title: '操作',
      fixed: 'right',
      authority: ['1060202', '1060203'],
      render: (record: any) => {
        return (
          <>
            <AuthorityBtnWrap authority="1060202">
              <a
                style={{ marginRight: '10px' }}
                onClick={async () => {
                  setEditModal({ info: record, title: "编辑", visible: true });
                }}
              >
                编辑
              </a>
            </AuthorityBtnWrap>
            <AuthorityBtnWrap authority="1060203">
              <a
                onClick={async () => {
                  const detail = await fetchMenuList(record.roleId);
                  setPermissionModal({ info: detail, visible: true, roleId: record.roleId });
                }}
              >
                权限
              </a>
            </AuthorityBtnWrap>
          </>
        );
      },
    },
  ];
  return (
    <>
      <PermissionModal
        title="权限"
        roleId={permissionModal.roleId}
        visible={permissionModal.visible}
        data={permissionModal.info}
        onCancel={() => setPermissionModal({ info: [], visible: false, roleId: '' })}
        onOk={() => setPermissionModal({ info: [], visible: false, roleId: '' })}
      />
      <EditModal
        title={editModal.title}
        visible={editModal.visible}
        data={editModal.info}
        onOk={() => {
          setEditModal({ info: {}, title: "", visible: false });
          ref.current.click();
        }}
        onCancel={() => setEditModal({ info: {}, title: "", visible: false })}
      />
      <SearchFormLayout
        needSearch
        ref={ref}
        customBtn={() => (
          <AuthorityBtnWrap authority="1060201">
            <Button
              type="primary"
              onClick={() => {
                setEditModal({ info: {}, title: "新增", visible: true });
              }}
            >
              新增
            </Button>
          </AuthorityBtnWrap>
        )}
        tableRowKey="roleId"
        url="/sys/role_list"
        onSearch={(fields) => { }}
        columns={columns}
      />
    </>
  );
};

export default TableList;
