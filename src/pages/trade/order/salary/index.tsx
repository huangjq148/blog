import React, { useState } from 'react';
import SearchFormLayout, { SearchFormColumn } from '@/components/SearchFormLayout';
import DetailModal from './detail';
import { fetchInfo } from './service';
import AuthorityBtnWrap from "@/components/AuthorityBtnWrap"

const TableList: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});

  const columns: SearchFormColumn[] = [
    {
      title: '薪资订单号',
      dataIndex: 'platformOrderNo',
      isCondition: true,
    },
    {
      title: '代付订单号',
      dataIndex: 'orderNo',
      isCondition: true,
    },
    {
      title: '个人姓名',
      dataIndex: 'personalName',
      isCondition: true,
    },
    {
      title: '企业名称',
      dataIndex: 'enterpriseName',
      isCondition: true,
    },
    {
      title: '下游订单号',
      dataIndex: 'downOrderNo',
      isCondition: true,
    },
    {
      title: '金额',
      dataIndex: 'amount',
    },
    {
      title: '交易时间',
      dataIndex: 'createDate',
      searchProps: { cmpType: 'RangePicker' },
      isCondition: true
    },
    {
      title: '到账时间',
      dataIndex: 'txnTime',
    },
    {
      title: '交易状态',
      dataIndex: 'orderStatus',
      type: 'code',
      code: 'PRE_ORDER_STATUS',
      searchProps: {
        cmpType: 'select',
      },
      isCondition: true,
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
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      fixed: 'right',
      authority: ['1030501'],
      render: (record) => {
        return (
          <AuthorityBtnWrap authority="1030501">
            <a
              onClick={async () => {
                const order = await fetchInfo(record.id);
                setOrderInfo(order);
                setVisible(true);
              }}
            >
              详情
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
        column={5}
        width={950}
        visible={visible}
        data={orderInfo}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      />
      <SearchFormLayout
        needSearch
        url="/transaction/per_order_list"
        onSearch={(fields) => { }}
        columns={columns}
      />
    </>
  );
};

export default TableList;
