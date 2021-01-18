import React, { useRef } from 'react';
import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import { comfirm } from './service';
import { downloadFile } from '@/utils/utils';
import AuthorityBtnWrap from '@/components/AuthorityBtnWrap';
import { message } from 'antd';

const TableList: React.FC<{}> = () => {
  const ref = useRef({ click: () => { } });
  const columns: SearchFormColumn[] = [
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '所属通道',
      dataIndex: 'paymentChannelName',
      searchProps: {
        cmpType: 'select',
        dataSourceType: 'table',
        keyMap: {
          valueName: 'name',
          labelName: 'name',
        },
        url: '/payment_channel/list',
      },
      isCondition: true,
    },
    {
      title: '对账日期',
      dataIndex: 'billDate',
      type: 'date',
      searchProps: { cmpType: 'RangePicker' },
      isCondition: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      cmpType: 'select',
      type: 'code',
      code: 'REPORT_CHECK_STATUS',
    },
    {
      title: '确认时间',
      dataIndex: 'confirmDate',
    },
    {
      title: '核对人',
      dataIndex: 'sysUserName',
    },
    {
      title: '操作',
      fixed: 'right',
      authority: ['1040101', '1040102'],
      render: (record) => {
        return (
          <>
            <AuthorityBtnWrap authority="1040101">
              <a
                style={{ marginRight: '10px' }}
                onClick={async () => {
                  downloadFile(`/payadmin/transaction/upload_statement?id=${record.id}`);
                }}
              >
                下载
              </a>
            </AuthorityBtnWrap>
            <AuthorityBtnWrap authority="1040102">
              {record.status !== 2 ?
                (<a
                  onClick={async () => {
                    const result = await comfirm(record.id);
                    if (result.code === 20003) {
                      message.error(result.message);
                    }
                    message.success("确认成功");
                    ref.current.click();
                  }}
                >
                  确认
                </a>) : ""
              }
            </AuthorityBtnWrap>
          </>
        );
      },
    },
  ];
  return (
    <SearchFormLayout
      needSearch
      ref={ref}
      url="/transaction/statement_list"
      onSearch={(fields) => { }}
      columns={columns}
    />
  );
};

export default TableList;
