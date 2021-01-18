import React, { useState, useRef } from 'react';
import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import EditModal from './edit';
import AuthorityBtnWrap from "@/components/AuthorityBtnWrap"

const TableList: React.FC<{}> = () => {
  const [editModal, setEditModal] = useState({ visible: false, info: {} });
  const ref = useRef({});

  const columns: SearchFormColumn[] = [
    {
      title: '参数编码',
      dataIndex: 'paramCode',
    },
    {
      title: '参数值',
      dataIndex: 'paramValue',
      isCondition: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate'
    },
    {
      title: '更新时间',
      dataIndex: 'updateDate'
    },
    {
      title: '操作',
      key: 'option',
      fixed: 'right',
      authority: ["1060401"],
      render: (record) => {
        return (
          <>
            <AuthorityBtnWrap authority="1060401">
              <a
                onClick={async () => {
                  setEditModal({ info: record, visible: true });
                }}
              >
                编辑
              </a>
            </AuthorityBtnWrap>
          </>
        );
      },
    },
  ];

  return (
    <>
      <EditModal
        title="编辑"
        visible={editModal.visible}
        data={editModal.info}
        onCancel={() => setEditModal({ ...editModal, visible: false })}
        onOk={() => {
          ref.current.click();
          setEditModal({ ...editModal, visible: false });
        }}
      />
      <SearchFormLayout
        needSearch
        ref={ref}
        url="/sys/config/list"
        onSearch={(fields) => { }}
        columns={columns}
      />
    </>
  );
};

export default TableList;
