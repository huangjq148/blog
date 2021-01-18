import { Table } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import type { Column, TableProps } from '@/components/Table/data';
import ShowLabel from '../ShowLabel';

const JqTable: React.FC<TableProps> = (props) => {
  const { columns, tableDataSource, onChange, pagination } = props;

  const innerColumns: Column[] = columns.map((item) => {
    const tmp = item;
    if (tmp.type === 'code') {
      tmp.render = (val: any, record: any) => {
        return (
          <>
            <ShowLabel code={tmp.code || ''} value={record[tmp.dataIndex || '']} />
          </>
        );
      };
    } else if (tmp.type === 'date') {
      tmp.render = (val: any, record: any) => {
        if (dayjs(record[tmp.dataIndex || '']).isValid()) {
          return <>{dayjs().format('YYYY-MM-DD')}</>;
        }
        return <></>;
      };
    }
    return tmp;
  });

  return (
    <Table
      {...props}
      columns={innerColumns}
      pagination={pagination}
      onChange={onChange}
      dataSource={tableDataSource}
    />
  );
};

export default JqTable;
