import React from 'react';
import { Props } from '@/components/Modal/data';
import DetailModal, { Item } from '@/components/Modal/detail';

const EditForm = (props: Props) => {
  const fields: Item[] = [
    { label: '订单编号', key: 'id' },
    { label: '平台订单编号', key: 'platformOrderNo' },
    { label: '下游订单编号', key: 'downOrderNo' },
    { label: '交易时间', key: 'createDate'},
    { label: '到账时间', key: 'txnTime'},
    { label: '交易金额', key: 'amount' },
    { label: '交易前余额', key: 'beforeTransactionBalance' },
    { label: '交易后余额', key: 'afterTransactionBalance' },
    { label: '到账金额', key: 'afterTransactionBalance,beforeTransactionBalance', type: 'diff' },
    { label: '交易状态', key: 'orderStatus', type: 'code', code: 'WITHDRAW_ORDER_STATUS' },
    { label: '所属通道', key: 'channelName' },
    { label: '接入商', key: 'applierName' },
    { label: '用户姓名', key: 'personalName' },
    { label: '银行账户', key: 'bankCard' },
    { label: '银行', key: 'bankName' },
    { label: '备注', key: 'remark' },
  ];

  return <DetailModal {...props} column={2} fields={fields} />;
};

export default EditForm;
