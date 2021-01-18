import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import React, { useState } from 'react';
import AuthorityBtnWrap from "@/components/AuthorityBtnWrap"
import DetailModal from './detail';
import { fetchInfo } from './service';

const TableList: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});
  const columns: SearchFormColumn[] = [
    {
      title: '下游订单号',
      dataIndex: 'downOrderNo',
      fixed: 'left',
      isCondition: true,
    },
    {
      title: '姓名',
      dataIndex: 'personalName',
      isCondition: true,
    },
    {
      title: '平台订单号',
      dataIndex: 'platformOrderNo',
    },
    {
      title: '金额',
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
    },
    {
      title: '交易状态',
      dataIndex: 'orderStatus',
      type: 'code',
      code: 'WITHDRAW_ORDER_STATUS',
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
      title: '接入商',
      dataIndex: 'applierName',
      isCondition: true,
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
      fixed: 'right',
      authority: ["1030301"],
      render: (record) => {
        return (
          <AuthorityBtnWrap authority="1030301">
            <a
              onClick={async () => {
                const order = await fetchInfo(record.id);
                setOrderInfo(order);
                setVisible(true);
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
        width={800}
        visible={visible}
        data={orderInfo}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      />
      <SearchFormLayout
        needSearch
        url="/transaction/per_withdraw_list"
        onSearch={(fields) => { }}
        columns={columns}
      />
    </>
  );
};

export default TableList;
