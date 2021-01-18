import React from 'react';
import DetailModal, { Item } from '@/components/Modal/detail';
import { Popover } from 'antd';
import styles from "./index.less"

interface Props {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  data: any;
}

const renderContent = (data: any) => (
  <div className={styles.idCardImgWrap}>
    <p>
      <img src={data.idNoImgFront} alt="" />
    </p>
    <p>
      <img src={data.idNoImgBack} alt="" />
    </p>
  </div>
);

function photoBtn(data: any) {
  return (
    <Popover content={() => renderContent(data)} title="Title" trigger="click">
      <a
        onClick={() => {
          console.log('点击查看');
        }}
      >
        查看
      </a>
    </Popover>
  );
}

const DetailForm = (props: Props) => {
  const { data } = props;
  const fields: Item[] = [
    { label: '姓名', key: 'realName' },
    { label: '手机号码', key: 'phone' },
    { label: '证件有效期', key: 'idEffecDate,idExpDay', type: 'dateRange' },
    { label: '发证机关', key: 'licIssuAutho', type: 'text' },
    { label: '身份证号', key: 'idNo', type: 'text' },
    {
      label: '身份证照片',
      key: 'name',
      type: 'text',
      render: () => photoBtn(data),
    },
    { label: '注册时间', key: 'createDate'},
    // { label: '状态', key: 'status', type: 'code', code: 'PERSON_REAL_NAME_STATUS' },
    { label: '银行卡', key: 'bankCard', type: 'text' },
    { label: '银行名称', key: 'bankName', type: 'text' },
  ];

  return <DetailModal title="个人信息" fields={fields} {...props} />;
};

export default DetailForm;
