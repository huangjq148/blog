import React, { useRef, useState } from 'react';
import type { SearchFormColumn } from '@/components/SearchFormLayout';
import SearchFormLayout from '@/components/SearchFormLayout';
import { downloadFile } from '@/utils/utils';
import Detail from './detail';
import EditModal from './edit';
import { fetchInfo } from './service';
import AuthorityBtnWrap from '@/components/AuthorityBtnWrap';

const TableList: React.FC<{}> = () => {
  const [detailModal, setDetailModal] = useState({ visible: false, info: {} });
  const [editModal, setEditModal] = useState({ visible: false, info: {} });
  const ref = useRef({ click: () => { } });

  const columns: SearchFormColumn[] = [
    {
      title: '平台用户编号',
      dataIndex: 'enterpriseNo',
      fixed: 'left',
      isCondition: true,
    },
    {
      title: '企业名称',
      dataIndex: 'enterpriseName',
      isCondition: true,
    },
    {
      title: '企业虚拟账户',
      dataIndex: 'platformUserNo',
    },
    {
      title: '手机号码',
      dataIndex: 'contactPhone',
      isCondition: true,
    },
    {
      title: '账户余额',
      dataIndex: 'balance',
    },
    {
      title: '可用余额',
      dataIndex: 'availableBalance',
    },
    {
      title: '冻结金额',
      dataIndex: 'freezeBalance',
    },
    {
      title: '服务费率',
      dataIndex: 'serviceRate',
    },
    {
      title: '发票费率',
      dataIndex: 'invoiceRate',
    },
    {
      title: '所属通道',
      dataIndex: 'channelName',
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
      title: '账户状态',
      dataIndex: 'accStatus',
      cmpType: 'select',
      type: 'code',
      code: 'ACC_STATUS',
    },
    {
      title: '审核状态',
      dataIndex: 'auditStatus',
      type: 'code',
      code: 'ENTERPRISE_REAL_NAME_STATUS',
      searchProps: {
        cmpType: 'select',
      },
      isCondition: true,
    },
    {
      title: '文件状态',
      dataIndex: 'imageStatus',
      cmpType: 'select',
      type: 'code',
      code: 'IMAGE_STATUS',
    },
    {
      title: '开户时间',
      dataIndex: 'openDate',
    },
    {
      title: '操作',
      fixed: 'right',
      authority: ['1020202', '1020203', '1020204'],
      render: (record) => {
        let downloadBtn = (
          <a
            onClick={async () => {
              downloadFile(`/payadmin/enterprise/acc/downFile/${record.id}`);
            }}
          >
            下载授权书
          </a>
        );
        if (record.imageStatus === 1) {
          downloadBtn = <></>;
        }
        return (
          <>
            <AuthorityBtnWrap authority="1020203">
              <a
                style={{ marginRight: '10px' }}
                onClick={async () => {
                  const detail = await fetchInfo(record.id);
                  setDetailModal({ info: detail, visible: true });
                }}
              >
                {' '}
                通道查询{' '}
              </a>
            </AuthorityBtnWrap>
            <AuthorityBtnWrap authority="1020202">
              <a
                style={{ marginRight: '10px' }}
                onClick={async () => {
                  setEditModal({ info: record, visible: true });
                }}
              >
                {' '}
                费率设置{' '}
              </a>
            </AuthorityBtnWrap>
            <AuthorityBtnWrap authority="1020204">{downloadBtn}</AuthorityBtnWrap>
          </>
        );
      },
    },
  ];

  return (
    <>
      <EditModal
        title="费率设置"
        width="400px"
        visible={editModal.visible}
        data={editModal.info}
        onCancel={() => setEditModal({ ...editModal, visible: false })}
        onOk={() => {
          ref.current.click();
          setEditModal({ ...editModal, visible: false });
        }}
      />
      <Detail
        title="通道查询"
        visible={detailModal.visible}
        data={detailModal.info}
        onCancel={() => setDetailModal({ ...detailModal, visible: false })}
        onOk={() => setDetailModal({ ...detailModal, visible: false })}
      />
      <SearchFormLayout
        needSearch
        ref={ref}
        url="/enterprise/acc/query/enterprise/acc/list"
        onSearch={(fields) => { }}
        columns={columns}
      />
    </>
  );
};

export default TableList;
