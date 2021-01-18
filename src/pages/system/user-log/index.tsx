import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import React from 'react';

const TableList: React.FC<{}> = () => {
  const columns: SearchFormColumn[] = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '操作人',
      dataIndex: 'userName',
      isCondition: true,
    },
    {
      title: '资源名称',
      dataIndex: 'resourceName',
      isCondition: true,
    },
    {
      title: '请求参数',
      dataIndex: 'requestParameter',
      render: (val: string) => {
        return (<div title={val} style={{
          maxWidth: "30vw",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>{val}</div>)
      }
    },
    {
      title: '响应参数',
      dataIndex: 'responseParameter',
      render: (val: string) => {
        return (<div title={val} style={{
          maxWidth: "20vw",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>{val}</div>)
      }
    },
    {
      title: '时间',
      dataIndex: 'createDate',
      type: 'date',
      searchProps: {
        cmpType: 'RangePicker',
      },
      isCondition: true,
    },
    {
      title: '响应结果',
      dataIndex: 'responseResult',
      type: 'code',
      code: 'RESPONSE_RESULT',
    },
  ];

  return (
    <SearchFormLayout
      url="/sys/user_log/list"
      needSearch
      columns={columns}
    />
  );
};

export default TableList;
