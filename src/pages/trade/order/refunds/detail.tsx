import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { Props } from '@/components/Modal/data';
import Modal from 'antd/lib/modal/Modal';
import { fetchRefundsList } from './service';
import ShowLabel from '@/components/ShowLabel';

const EditForm = (props: Props) => {
  const { data } = props;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function query() {
      try {
        const result = await fetchRefundsList(data.paymentFailed);
        setTableData(result.records);
      } catch (e) {
        console.error(e);
      }
    }

    if (data.paymentFailed) {
      query();
    }
  }, [data]);
  const colums = [
    {
      title: '下游订单号',
      dataIndex: 'downOrderNo',
    },
    {
      title: '平台订单号',
      dataIndex: 'platformOrderNo',
    },
    {
      title: '收款人',
      dataIndex: 'personalName',
    },
    {
      title: '交易金额',
      dataIndex: 'amount',
    },
    {
      title: '状态',
      dataIndex: 'orderStatus',
      render: (value: string) => <ShowLabel code="ORDER_STATUS" value={value} />,
    },
    {
      title: '交易时间',
      dataIndex: 'createDate',
    },
    {
      title: '完成时间',
      dataIndex: 'updateDate',
    },
  ];

  return (
    <Modal {...props}
      okText="确定"
      cancelText="取消"
    >
      <Table rowKey="id" dataSource={tableData} columns={colums} />
    </Modal>
  );
};

export default EditForm;
