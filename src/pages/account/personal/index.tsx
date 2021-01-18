import React, { useState } from 'react';
import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import Detail from './detail';
import { fetchInfo } from './service';
import AuthorityBtnWrap from "@/components/AuthorityBtnWrap"

const TableList: React.FC<{}> = () => {
  const [detailModal, setDetailModal] = useState({ visible: false, info: {} });

  const columns: SearchFormColumn[] = [
    {
      title: '平台用户编号',
      dataIndex: 'personalNo',
      isCondition: true,
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      isCondition: true,
    },
    {
      title: '个人E账户',
      dataIndex: 'eacctNo',
    },
    {
      title: '手机号码',
      dataIndex: 'personalPhone',
      isCondition: true,
    },
    {
      title: '可用余额',
      dataIndex: 'availableBalance',
    },
    {
      title: '冻结金额',
      dataIndex: 'freezeBalance',
    },
    {
      title: '状态',
      dataIndex: 'personalStatus',
      type: 'code',
      code: 'PERSON_REAL_NAME_STATUS',
      searchProps: {
        cmpType: 'select',
      },
      isCondition: true,
    },
    {
      title: '所属通道',
      dataIndex: 'channelName',
      searchProps: {
        cmpType: 'select',
        dataSourceType: 'table',
        keyMap: {
          valueName: 'name',
          labelName: 'name',
        },
        url: '/payment_channel/list',
      },
      isCondition: true,
    },
    {
      title: '开通时间',
      dataIndex: 'openDate',
    },
    {
      title: '操作',
      authority: ["1020102"],
      render: (record) => {
        return (
          <>
            <AuthorityBtnWrap authority="1020102">
              <a
                onClick={async () => {
                  const detail = await fetchInfo(record.id);
                  setDetailModal({ info: detail, visible: true });
                }}
              >
                {' '}
              通道查询{' '}
              </a>
            </AuthorityBtnWrap>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Detail
        title="详情"
        visible={detailModal.visible}
        data={detailModal.info}
        onCancel={() => setDetailModal({ ...detailModal, visible: false })}
        onOk={() => setDetailModal({ ...detailModal, visible: false })}
      />
      <SearchFormLayout
        needSearch
        url="/personal/acc/query/personal/acc/list"
        onSearch={(fields) => { }}
        columns={columns}
      />
    </>
  );
};

export default TableList;
