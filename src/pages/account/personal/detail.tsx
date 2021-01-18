import React from 'react';
import DetailModal, { Item } from '@/components/Modal/detail';
import { Props } from '@/components/Modal/data';

const DetailForm = (props: Props) => {
  const fields: Item[] = [
    { label: 'E账号', key: 'platformUserNo' },
    { label: '姓名', key: 'realName' },
    { label: '余额', key: 'balance' },
    // { label: '可用余额', key: 'availableBalance' },
    // { label: '冻结余额', key: 'balance,availableBalance', type: 'diff' },
    // { label: '审核状态', key: 'personalStatus', type: 'code', code: 'PERSON_REAL_NAME_STATUS' },
    // { label: '用户状态', key: 'status', type: 'code', code: 'ACC_STATUS' },
    { label: '预留手机号', key: 'reservedPhone'},
    { label: '绑定银行卡号', key: 'bankCard'},
  ];

  return <DetailModal fields={fields} {...props} />;
};

export default DetailForm;
