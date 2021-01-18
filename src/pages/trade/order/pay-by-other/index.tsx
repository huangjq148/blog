import React, { useState, useRef } from 'react';
import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import DetailModal from './detail';
import MsgModal from './sendMsg';
import AuthorityBtnWrap from '@/components/AuthorityBtnWrap';

const TableList: React.FC<{}> = () => {
  const [detailModal, setDetailModal] = useState({ info: {}, visible: false });
  const [msgModal, setMsgModal] = useState({ info: {}, visible: false });
  const ref = useRef({ click: () => {} });

  const columns: SearchFormColumn[] = [
    {
      title: '平台批次号',
      dataIndex: 'platformOrderNo',
      isCondition: true,
    },
    {
      title: '下游批次号',
      dataIndex: 'downOrderNo',
      isCondition: true,
    },
    {
      title: '企业名称',
      dataIndex: 'enterpriseName',
      isCondition: true,
    },
    {
      title: '总金额',
      dataIndex: 'payAmount',
    },
    {
      title: '代付笔数',
      dataIndex: 'payCount',
    },
    {
      title: '失败笔数',
      dataIndex: 'failCount',
    },
    {
      title: '交易时间',
      dataIndex: 'createDate',
      searchProps: { cmpType: 'RangePicker' },
      isCondition: true,
    },
    {
      title: '到账时间',
      dataIndex: 'completeTime',
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
      title: '流程状态',
      dataIndex: 'processStatus',
      type: 'code',
      code: 'PROCESS_STATUS',
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
      title: '操作',
      fixed: 'right',
      authority: ['1030401', '1030403'],
      render: (record) => {
        return (
          <>
            <AuthorityBtnWrap authority="1030401">
              <a
                style={{ marginRight: '10px' }}
                onClick={async () => {
                  setDetailModal({ info: record, visible: true });
                }}
              >
                详情
              </a>
            </AuthorityBtnWrap>
            {record.orderStatus === 1 || record.orderStatus === 4 ? (
              <AuthorityBtnWrap authority="1030403">
                <a
                  onClick={async () => {
                    setMsgModal({ visible: true, info: record });
                  }}
                >
                  确认支付{'  '}
                </a>
              </AuthorityBtnWrap>
            ) : (
              ''
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <MsgModal
        title="订单详情"
        width={400}
        visible={msgModal.visible}
        data={msgModal.info}
        onCancel={() => setMsgModal({ ...msgModal, visible: false })}
        onOk={() => {
          setMsgModal({ ...msgModal, visible: false });
          ref.current.click();
        }}
      />
      <DetailModal
        title="订单详情"
        column={6}
        width={800}
        visible={detailModal.visible}
        data={detailModal.info}
        onCancel={() => setDetailModal({ ...detailModal, visible: false })}
        onOk={() => setDetailModal({ ...detailModal, visible: false })}
      />
      <SearchFormLayout
        needSearch
        ref={ref}
        url="/transaction/pay_order_list"
        onSearch={(fields) => {}}
        columns={columns}
      />
    </>
  );
};

export default TableList;
