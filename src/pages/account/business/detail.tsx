import React from 'react';
import DetailModal, { Item } from '@/components/Modal/detail';
import { Props } from '@/components/Modal/data';

const DetailForm = (props: Props) => {
  const fields: Item[] = [
    { label: '企业名称', key: 'enterpriseName' },
    { label: '平台用户编码', key: 'platformUserNo' },
    { label: '余额', key: 'balance' },
    { label: '可用余额', key: 'availableBalance' },
    { label: '冻结余额', key: 'balance,availableBalance', type: 'diff' },
    { label: '收款虚拟账户名称', key: 'virtualAccountName' },
    { label: '收款虚拟账户卡号', key: 'virtualAccountNumber' },
    { label: '用户角色', key: 'userRole' },
    { label: '审核状态', key: 'auditStatus'},
    { label: '用户状态', key: 'activeStatus' },
  ];

  return <DetailModal fields={fields} {...props} />;
};

export default DetailForm;
