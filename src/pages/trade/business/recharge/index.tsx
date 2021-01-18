import React, { useState } from 'react';
import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import DetailModal from './detail';
import { fetchInfo } from './service';
import AuthorityBtnWrap from "@/components/AuthorityBtnWrap"

const TableList: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});

  const columns: SearchFormColumn[] = [
    {
      title: '平台订单编号',
      dataIndex: 'platformOrderNo',
      fixed: 'left',
      isCondition: true,
    },
    {
      title: '企业名称',
      dataIndex: 'enterpriseName',
      isCondition: true,
    },
    {
      title: '上游订单号',
      dataIndex: 'upperOrderNo',
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
      isCondition: true,
    },
    {
      title: '到账时间',
      dataIndex: 'txnTime',
    },
    {
      title: '充值类型',
      dataIndex: 'rechargeType',
      type: 'code',
      code: 'RECHARGE_TYPE',
      searchProps: {
        cmpType: 'select',
      },
      isCondition: true,
    },
    {
      title: '交易状态',
      dataIndex: 'orderStatus',
      type: 'code',
      code: 'RECHARGE_ORDER_STATUS',
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
      dataIndex: 'paymentChannelName',
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
      authority: ["1030201"],
      render: (record) => {
        return (
          <AuthorityBtnWrap authority="1030201">
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
        url="/transaction/recharge_list"
        onSearch={(fields) => { }}
        columns={columns}
      />
    </>
  );
};

export default TableList;
