import React, { useState, useRef } from 'react';
import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import { message, Button } from 'antd';
import { editStatus } from './service';
import EditModal from './edit';
import CreateModal from './create';
import AuthorityBtnWrap from '@/components/AuthorityBtnWrap';

const TableList: React.FC<{}> = () => {
  const [editModal, setEditModal] = useState({ visible: false, info: {} });
  const [createModal, setCreateModal] = useState({ visible: false, info: {} });
  const ref = useRef({ click: () => {} });
  const columns: SearchFormColumn[] = [
    {
      title: '编号',
      dataIndex: 'userId',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      isCondition: true,
    },
    {
      title: '账户名',
      dataIndex: 'userName',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      isCondition: true,
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      searchProps: {
        cmpType: 'select',
        dataSourceType: 'table',
        searchKey: 'roleId',
        keyMap: {
          valueName: 'roleId',
          labelName: 'roleName',
        },
        url: '/sys/role_list',
      },
      isCondition: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      type: 'code',
      code: 'USE_STATUS',
      searchProps: { cmpType: 'select' },
      isCondition: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
    },
    {
      title: '操作',
      fixed: 'right',
      authority: ['1060102', '1060103'],
      render: (record) => {
        return (
          <>
            <AuthorityBtnWrap authority="1060102">
              <a
                style={{ marginRight: '10px' }}
                onClick={async () => {
                  try {
                    await editStatus({
                      status: record.status === 1 ? 2 : 1,
                      userId: record.userId,
                    });
                    ref.current.click();
                    message.success('修改成功');
                  } catch (e) {
                    message.error('修改失败');
                    console.error(e);
                  }
                }}
              >
                {record.status === 1 ? '禁用' : '启用'}
              </a>
            </AuthorityBtnWrap>
            <AuthorityBtnWrap authority="1060103">
              <a
                onClick={async () => {
                  setEditModal({ info: record, visible: true });
                }}
              >
                {' '}
                重置密码
              </a>
            </AuthorityBtnWrap>
          </>
        );
      },
    },
  ];

  return (
    <>
      <CreateModal
        title="新增用户"
        visible={createModal.visible}
        data={createModal.info}
        onCancel={() => setCreateModal({ ...createModal, visible: false })}
        onOk={() => {
          setCreateModal({ ...createModal, visible: false });
          ref.current.click();
        }}
      />
      <EditModal
        title="修改密码"
        visible={editModal.visible}
        data={editModal.info}
        onCancel={() => setEditModal({ ...editModal, visible: false })}
        onOk={() => {
          setEditModal({ ...editModal, visible: false });
          ref.current.click();
        }}
      />
      <SearchFormLayout
        tableRowKey="userId"
        ref={ref}
        customBtn={() => (
          <AuthorityBtnWrap authority="1060101">
            <Button
              type="primary"
              onClick={() => {
                setCreateModal({ info: {}, visible: true });
              }}
            >
              新增
            </Button>
          </AuthorityBtnWrap>
        )}
        needSearch
        url="/sys/user_list"
        onSearch={(fields) => {}}
        columns={columns}
      />
    </>
  );
};

export default TableList;
