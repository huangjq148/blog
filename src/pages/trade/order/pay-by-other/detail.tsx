import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Props } from '@/components/Modal/data';
import DetailModal, { Item } from '@/components/Modal/detail';
import { fetchOrderDetail } from './service';
import ShowLabel from "@/components/ShowLabel";

const formItemLayout = {
  labelCol: { span: 14 },
  wrapperCol: { span: 10 },
};

const EditForm = (props: Props) => {
  const [tableDataSource, setTableDataSource] = useState([]);
  useEffect(() => {
    const query = async function () {
      const { records } = await fetchOrderDetail(props.data.platformOrderNo);
      setTableDataSource(records);
    };
    if (props.data.platformOrderNo) {
      query();
    }
  }, [props.data.platformOrderNo]);
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
      render: (value: string) => <ShowLabel code="PRE_ORDER_STATUS" value={value} />,
    },
    {
      title: '交易时间',
      dataIndex: 'updateDate',
      type: 'date',
    },
    {
      title: '完成时间',
      dataIndex: 'txnTime',
      type: 'date',
    },
  ];
  const fields: Item[] = [
    { label: '代付笔数', key: 'payCount' },
    { label: '代付成功笔数', key: 'payCount,failCount', type: 'diff' },
    { label: '代付失败笔数', key: 'failCount' },
    { label: '代付成功金额', key: 'successAmount' },
    { label: '代付失败金额', key: 'failAmount' },
  ];

  return (
    <DetailModal {...props} width={1240} fields={fields} formItemLayout={formItemLayout}>
      <Table rowKey="id" dataSource={tableDataSource} columns={colums} />
    </DetailModal>
  );
};

export default EditForm;
