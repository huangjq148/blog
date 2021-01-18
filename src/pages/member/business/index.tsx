import React, { useState } from 'react';
import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import Detail from './detail';
import { fetchInfo } from './service';
import AuthorityBtnWrap from "@/components/AuthorityBtnWrap"

const TableList: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const [businessInfo, setBusinessInfo] = useState({});
  const columns: SearchFormColumn[] = [
    {
      title: '平台用户编号',
      dataIndex: 'enterpriseNo',
      isCondition: true,
    },
    {
      title: '企业名称',
      dataIndex: 'enterpriseName',
      isCondition: true,
    },
    {
      title: '法人姓名',
      dataIndex: 'legal',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
    },
    {
      title: '手机号码',
      dataIndex: 'contactPhone',
      isCondition: true,
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   type: 'code',
    //   code: 'ENTERPRISE_REAL_NAME_STATUS',
    //   searchProps: {
    //     cmpType: 'select',
    //   },
    //   isCondition: true,
    // },
    {
      title: '创建时间',
      dataIndex: 'createDate',
    },
    {
      title: '操作',
      authority: ["1010201"],
      render: (record) => {
        return (
          <>
            <AuthorityBtnWrap authority="1010201">
              <a
                onClick={async () => {
                  const member = await fetchInfo(record.id);
                  setBusinessInfo(member);
                  setVisible(true);
                }}
              >
                {' '}
              查看{' '}
              </a>
            </AuthorityBtnWrap>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Detail
        visible={visible}
        data={businessInfo}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      />
      <SearchFormLayout
        needSearch
        url="/enterprise/query/Enterprise/list"
        onSearch={(fields) => { }}
        columns={columns}
      />
    </>
  );
};

export default TableList;
