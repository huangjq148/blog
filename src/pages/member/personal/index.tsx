import React, { useState } from 'react';
import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import Detail from './detail';
import { fetchInfo } from './service';
import AuthorityBtnWrap from "@/components/AuthorityBtnWrap"

const TableList: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const [memberInfo, setMemberInfo] = useState({});

  const columns: SearchFormColumn[] = [
    {
      title: '平台用户编号',
      dataIndex: 'personalNo',
      isCondition: true,
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      isCondition: true,
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      isCondition: true,
    },
    {
      title: '身份证号',
      dataIndex: 'idNo',
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   type: 'code',
    //   code: 'PERSON_REAL_NAME_STATUS',
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
      authority: ["1010101"],
      render: (record) => {
        return (
          <>
            <AuthorityBtnWrap authority="1010101">
              <a
                onClick={async () => {
                  const member = await fetchInfo(record.id);
                  setMemberInfo(member);
                  setVisible(true);
                }}
              >
                查看
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
        data={memberInfo}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      />
      <SearchFormLayout
        needSearch
        url="/personal/query/personal/list"
        onSearch={(fields) => {
          console.log(fields);
        }}
        columns={columns}
      />
    </>
  );
};

export default TableList;
