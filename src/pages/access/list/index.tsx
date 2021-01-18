import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import EditModal from './edit';
import AuthorityBtnWrap from "@/components/AuthorityBtnWrap"

const TableList: React.FC<{}> = () => {
  const [editModal, setEditModal] = useState({ visible: false, info: {} });
  const ref = useRef({ click: () => { } });

  const columns: SearchFormColumn[] = [
    {
      title: '编号',
      dataIndex: 'paymentChannelId',
    },
    {
      title: '通道名称',
      dataIndex: 'name',
      isCondition: true,
    },
    {
      title: '通道编码',
      dataIndex: 'code',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
    },
    {
      title: '状态',
      dataIndex: 'status',
      type: 'code',
      code: 'USE_STATUS',
      searchProps: {
        cmpType: 'select',
      },
      isCondition: true,
    },
    {
      title: '操作',
      fixed: 'right',
      authority: ["1050101"],
      render: (record) => {
        return (
          <AuthorityBtnWrap authority="1050101">
            <a
              onClick={async () => {
                setEditModal({ info: record, visible: true });
              }}
            >
              {' '}
              编辑{' '}
            </a>
          </AuthorityBtnWrap>
        );
      },
    },
  ];
  return (
    <>
      <EditModal
        title="通道配置"
        visible={editModal.visible}
        data={editModal.info}
        onCancel={() => setEditModal({ ...editModal, visible: false })}
        onOk={() => {
          setEditModal({ ...editModal, visible: false });
          ref.current.click();
        }}
      />
      <SearchFormLayout
        needSearch
        ref={ref}
        url="/payment_channel/list"
        tableRowKey="paymentChannelId"
        customBtn={() => (
          <AuthorityBtnWrap authority="1050102">
            <Button
              type="primary"
              onClick={() => {
                setEditModal({ info: {}, visible: true });
              }}
            >
              新增
          </Button>
          </AuthorityBtnWrap>
        )}
        onSearch={(fields) => { }}
        columns={columns}
      />
    </>
  );
};

export default TableList;
