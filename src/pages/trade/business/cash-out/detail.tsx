import React from 'react';
import { Props } from '@/components/Modal/data';
import DetailModal, { Item } from '@/components/Modal/detail';

const EditForm = (props: Props) => {
  const fields: Item[] = [
    { label: '平台订单编号', key: 'platformOrderNo' },
    { label: '下游订单编号', key: 'downOrderNo' },
    { label: '代付订单编号', key: 'orderNo' },
    { label: '交易时间', key: 'createDate'},
    { label: '交易金额', key: 'amount' },
    { label: '到账时间', key: 'txnTime' },
    { label: '到账金额', key: 'afterTransactionBalance,beforeTransactionBalance', type: 'diff' },
    { label: '交易前余额', key: 'beforeTransactionBalance' },
    { label: '交易后余额', key: 'afterTransactionBalance' },
    { label: '所属通道', key: 'paymentChannelName' },
    { label: '交易状态', key: 'orderStatus', type: 'code', code: 'WITHDRAW_ORDER_STATUS' },
    { label: '企业名称', key: 'enterpriseName' },
    { label: '接入商', key: 'applierName' },
    { label: '银行账户', key: 'bankCard' },
    { label: '银行', key: 'bankName' },
    { label: '备注', key: 'remark' },
  ];

  return <DetailModal {...props} width={800} column={2} fields={fields} />;
};

export default EditForm;
