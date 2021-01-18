import React from 'react';
import DetailModal, { Item } from '@/components/Modal/detail';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  data: any;
}

const DetailForm = (props: Props) => {
  const fields: Item[] = [
    { label: '企业名称', key: 'enterpriseName' },
    { label: '联系人', key: 'contact' },
    { label: '手机号码', key: 'contactPhone' },
    { label: '法人', key: 'legal' },
    { label: '法人证件类型', key: 'idCardType', type: 'code', code: 'ID_CARD_TYPE'},
    { label: '法人证件号码', key: 'legalIdCardNo' },
    { label: '统一社会信用代码', key: 'unifiedCode' },
    { label: '注册时间', key: 'createDate'},
    // { label: '状态', key: 'status', type: 'code', code: 'ENTERPRISE_REAL_NAME_STATUS' },
    { label: '对公账户', key: 'bankCard' },
    { label: '银行名称', key: 'bankName' },
  ];

  return <DetailModal title="企业信息" fields={fields} {...props} />;
};

export default DetailForm;
