import React, { useState } from 'react';
import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import { downloadFile } from '@/utils/utils';
import AuthorityBtnWrap from '@/components/AuthorityBtnWrap';
import DetailModal from './detail';
import { fetchInfo } from './service';

const TableList: React.FC<{}> = () => {
  const [detailModal, setDetailModal] = useState({ visible: false, info: {} });

  const columns: SearchFormColumn[] = [
    {
      title: '平台订单编号',
      fixed: 'left',
      dataIndex: 'platformOrderNo',
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
      title: '提现类型',
      dataIndex: 'orderType',
      type: 'code',
      code: 'ORDER_TYPE',
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
      authority: ['1030101', '1030102'],
      render: (record) => {
        return (
          <>
            <AuthorityBtnWrap authority="1030101">
              <a
                style={{ marginRight: '10px' }}
                onClick={async () => {
                  const order = await fetchInfo(record.id);
                  setDetailModal({ info: order, visible: true });
                }}
              >
                查看
              </a>
            </AuthorityBtnWrap>

            {record.orderStatus === 3 ?
              (<AuthorityBtnWrap authority="1030102">
                <a onClick={async () => { downloadFile(`/payadmin/transaction/withdraw/downFile/${record.id}`); }} > 电子回单 </a>
              </AuthorityBtnWrap>) : (<></>)
            }
          </>
        );
      },
    },
  ];
  return (
    <>
      <DetailModal
        title="订单详情"
        width={800}
        visible={detailModal.visible}
        data={detailModal.info}
        onCancel={() => setDetailModal({ ...detailModal, visible: false })}
        onOk={() => setDetailModal({ ...detailModal, visible: false })}
      />
      <SearchFormLayout
        needSearch
        tableRowKey="id"
        url="/transaction/org_withdraw_list"
        onSearch={(fields) => { }}
        columns={columns}
      />
    </>
  );
};

export default TableList;
