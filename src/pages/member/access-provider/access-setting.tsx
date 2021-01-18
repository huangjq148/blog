import React, { useState, useEffect } from 'react';
import { message, Modal, Table } from 'antd';
import { Props } from '@/components/Modal/data';
import { applierPaymentRef, applierPaymentRefList } from './service';

const EditForm = (props: Props) => {
  const [keys, setKeys] = useState([]);
  const { data, onOk } = props;
  const [tableData, setTableData] = useState([]);

  const colums = [
    {
      title: '通道名称',
      dataIndex: 'paymentChannelName',
    },
    {
      title: '通道编码',
      dataIndex: 'paymentChannelCode',
    },
  ];

  const rowSelection = {
    selectedRowKeys: keys,
    onChange: (selectedRowKeys: []) => {
      setKeys(selectedRowKeys);
    },
  };

  useEffect(() => {
    setTableData([]);
    async function query() {
      if (data.id) {
        const result = await applierPaymentRefList(data.id);
        setTableData(result);
        setKeys(
          result.map((item: { applierId: any; paymentId: any }) => {
            if (item.applierId) {
              return item.paymentId;
            }
            return null;
          }),
        );
      }
    }
    query();
  }, [data]);

  return (
    <Modal
      {...props}
      onOk={async () => {
        try {
          await applierPaymentRef({ applierId: data.id, paymentChannelIds: keys.join() });
          message.success('配置成功');
          onOk();
        } catch (e) {
          message.error('配置失败');
          console.error(e);
        }
      }}
    >
      <Table
        rowKey="paymentId"
        pagination={false}
        rowSelection={rowSelection}
        dataSource={tableData}
        columns={colums}
      />
    </Modal>
  );
};

export default EditForm;
