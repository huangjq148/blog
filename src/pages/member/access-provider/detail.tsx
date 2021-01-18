import React from 'react';
import DetailModal, { Item } from '@/components/Modal/detail';
import { Props } from '@/components/Modal/data';

const DetailForm = (props: Props) => {
  const { onOk, data } = props;
  const { visible, info } = data;
  const fields: Item[] = [
    { label: '名称', key: 'name' },
    { label: '手机号码', key: 'phone' },
    { label: '联系人', key: 'contactName' },
    { label: '接入商公钥', key: 'publicKey' },
    { label: '平台公钥', key: 'platformPublicKey' },
    { label: '平台私钥', key: 'platformPrivateKey' },
    { label: '回调地址', key: 'callbackAddress' },
    { label: '状态', key: 'status', type: 'code', code: 'APPLIER_STATUS' },
  ];

  return <DetailModal {...props} fields={fields} visible={visible} data={info} />;
};

export default DetailForm;
