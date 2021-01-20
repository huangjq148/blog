import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import EditFormModal from "./components/EditFormModal";
import type { TableListItem } from './data.d';
import { queryPage, remove } from './service';
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (ids: string) => {
  const hide = message.loading('正在删除');
  if (!ids) return true;

  try {
    await remove(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const [editModalData, setEditModalData] = useState({ visible: false, info: {} });
  /**
   * 国际化配置
   */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      search: { transform: () => "name_like" },
      tip: '人员姓名',
      render: (dom, entity) => {
        return (
          <a onClick={
            () => {
              setCurrentRow(entity);
              setShowDetail(true);
            }
          }
          >
            {dom}
          </a >
        );
      },
    },
    {
      title: '性别',
      dataIndex: 'sex',
      hideInForm: true,
      valueEnum: {
        "0": {
          text: '男',
        },
        "1": {
          text: '女',
        },
      },
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          onClick={() => {
            setEditModalData({ info: record, visible: true });
          }}
        >
          编辑
        </a>,
        <a onClick={() => {
          handleRemove(record.id);
          actionRef.current?.reloadAndRest?.();
        }}>删除</a>,
      ],
    },
  ];
  return (
    <>
      <EditFormModal
        title="人员信息"
        visible={editModalData.visible}
        data={editModalData.info}
        onCancel={() => setEditModalData({ info: {}, visible: false })}
        onOk={
          () => {
            setEditModalData({ ...editModalData, visible: false })
            actionRef?.current?.reload();
          }
        }
      />
      <ProTable<TableListItem>
        headerTitle="人员信息"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => setEditModalData({ info: {}, visible: true })}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => queryPage({ params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              {/* <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span> */}
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState.map((row) => row.id).join());
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          {/* <Button type="primary">批量审批</Button> */}
        </FooterToolbar>
      )}

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </>
  );
};

export default TableList;
