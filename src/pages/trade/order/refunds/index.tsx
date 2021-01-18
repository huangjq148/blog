import React, { useState } from 'react';
import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import AuthorityBtnWrap from '@/components/AuthorityBtnWrap';
import DetailModal from './detail';

const TableList: React.FC<{}> = () => {
  const [detailModal, setDetailModal] = useState({ info: {}, visible: false });

  const columns: SearchFormColumn[] = [
    {
      title: '退款订单号',
      dataIndex: 'platformOrderNo',
      isCondition: true,
    },
    {
      title: '企业名称',
      dataIndex: 'enterpriseName',
      isCondition: true,
    },
    {
      title: '代付订单号',
      dataIndex: 'paymentFailed',
    },
    {
      title: '退款笔数',
      dataIndex: 'failCount',
    },
    {
      title: '退款金额',
      dataIndex: 'amount',
    },
    {
      title: '交易时间',
      dataIndex: 'createDate',
      searchProps: { cmpType: 'RangePicker' },
      isCondition: true,
    },
    {
      title: '到账时间',
      dataIndex: 'txnTime',
      type: 'date',
    },
    {
      title: '交易状态',
      dataIndex: 'orderStatus',
      type: 'code',
      code: 'ORDER_STATUS',
      searchProps: {
        cmpType: 'select',
      },
      isCondition: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '所属通道',
      dataIndex: 'channelName',
      searchProps: {
        cmpType: 'select',
        dataSourceType: 'table',
        searchKey: 'paymentChannelId',
        keyMap: {
          valueName: 'paymentChannelId',
          labelName: 'name',
        },
        url: '/payment_channel/list',
      },
      isCondition: true,
    },
    {
      title: '操作',
      authority: ['1030601'],
      render: (record) => {
        return (
          <AuthorityBtnWrap authority="1030601">
            <a
              onClick={async () => {
                setDetailModal({ info: record, visible: true });
              }}
            >
              查看
            </a>
          </AuthorityBtnWrap>
        );
      },
    },
  ];
  return (
    <>
      <DetailModal
        title="订单详情"
        width={1200}
        visible={detailModal.visible}
        data={detailModal.info}
        onCancel={() => setDetailModal({ ...detailModal, visible: false })}
        onOk={() => setDetailModal({ ...detailModal, visible: false })}
      />
      <SearchFormLayout
        needSearch
        url="/transaction/reimburse_order_list"
        columns={columns}
      />
    </>
  );
};

export default TableList;
