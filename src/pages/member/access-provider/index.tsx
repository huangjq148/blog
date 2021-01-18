import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import DetailModal from './detail';
import EditModal from './edit';
import AccessSettingModal from './access-setting';
import { fetchInfo } from './service';
import AuthorityBtnWrap from "@/components/AuthorityBtnWrap"

const TableList: React.FC<{}> = () => {
  const [accessModal, setAccessModal] = useState({ visible: false, info: {} });
  const [detailModalData, setDetailModalData] = useState({ visible: false, info: {} });
  const [editModalData, setEditModalData] = useState({ visible: false, info: {} });
  const ref = useRef({ click: () => { } });
  const columns: SearchFormColumn[] = [
    {
      title: '平台用户编号',
      dataIndex: 'applierNo',
    },
    {
      title: '企业名称',
      dataIndex: 'name',
      isCondition: true,
    },
    {
      title: '联系人',
      dataIndex: 'contactName',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      isCondition: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      type: 'code',
      code: 'APPLIER_STATUS',
      searchProps: {
        cmpType: 'select',
      },
      isCondition: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
    },
    {
      title: '操作',
      key: 'option',
      authority: ["1010301", "1010302", "1010304"],
      render: (record) => {
        return (
          <>
            <AuthorityBtnWrap authority="1010301">
              <a style={{marginRight:"10px"}} onClick={async () => {
                const accessProvider = await fetchInfo(record.id);
                setDetailModalData({ info: accessProvider, visible: true });
              }}
              >
                {' '}查看{' '}
              </a>
            </AuthorityBtnWrap>
            <AuthorityBtnWrap authority="1010302">
              <a style={{marginRight:"10px"}} onClick={async () => {
                const accessProvider = await fetchInfo(record.id);
                setEditModalData({ info: accessProvider, visible: true });
              }}
              >
                {' '}编辑{' '}
              </a>
            </AuthorityBtnWrap>
            <AuthorityBtnWrap authority="1010304">
              <a onClick={() => {
                setAccessModal({ info: record, visible: true });
              }}
              >
                {' '}通道配置{' '}
              </a>
            </AuthorityBtnWrap>
          </>
        );
      },
    },
  ];

  return (
    <>
      <AccessSettingModal
        title="通道配置"
        visible={accessModal.visible}
        data={accessModal.info}
        onCancel={() => setAccessModal({ info: {}, visible: false })}
        onOk={() => setAccessModal({ info: {}, visible: false })}
      />

      <EditModal
        title="接入商编辑"
        data={editModalData.info}
        visible={editModalData.visible}
        onCancel={() => setEditModalData({ ...editModalData, visible: false })}
        onOk={() => {
          setEditModalData({ ...editModalData, visible: false });
          ref.current.click();
        }}
      />

      <DetailModal
        title="详情"
        data={detailModalData}
        onCancel={() => setDetailModalData({ ...detailModalData, visible: false })}
        onOk={() => setDetailModalData({ ...detailModalData, visible: false })}
      />

      <SearchFormLayout
        ref={ref}
        needSearch
        url="/applier/query/applier/list"
        customBtn={() => (
          <AuthorityBtnWrap authority="1010303">
            <Button
              type="primary"
              onClick={() => {
                setEditModalData({ info: {}, visible: true });
              }}
            >
              新增
          </Button>
          </AuthorityBtnWrap>
        )}
        onSearch={(fields) => {
          // fetchData(fields);
        }}
        columns={columns}
        // tableDataSource={data}
        tableRowKey="id"
      />
    </>
  );
};

export default TableList;
