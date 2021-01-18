import React from 'react';
import { Props } from '@/components/Modal/data';
import DetailModal, { Item } from '@/components/Modal/detail';

const EditForm = (props: Props) => {
  const fields: Item[] = [
    { label: '下游代付订单号', key: 'downBatchOrderNumber' },
    { label: '平台代付订单号', key: 'orderNo' },
    { label: '平台薪资订单号', key: 'platformOrderNo' },
    { label: '下游薪资订单号', key: 'downOrderNo' },
    { label: '交易时间', key: 'createDate' },
    { label: '到账时间', key: 'txnTime' },
    { label: '交易金额', key: 'amount' },
    { label: '交易前余额', key: 'beforeTransactionBalance' },
    { label: '所属通道', key: 'channelName' },
    { label: '用户姓名', key: 'personalName' },
    { label: '银行名称', key: 'bankCard' },
    { label: '银行卡号', key: 'bankName' },
    { label: '接入商', key: 'applierName' },
    { label: '交易状态', key: 'orderStatus', type: 'code', code: 'ORDER_STATUS' },
    { label: '付款企业名', key: 'enterpriseName' },
    { label: '备注', key: 'remark' },
  ];

  return <DetailModal {...props} column={2} fields={fields} />;
};

export default EditForm;
