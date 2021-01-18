import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, DatePicker, message } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import JqSelect from '@/components/Select';
import { Column } from '@/components/Table/data';
import JqTable from '@/components/Table';
import { useModel } from 'umi';
import lodash from 'lodash';
import { fetchTable } from '@/services/base';
import styles from './index.less';

export interface SearchFormColumn extends Column {
  searchProps?: {
    searchKey?: string;
    cmpType: string;
    // 表码类型
    type?: string;
    code?: string;
    dataSourceType?: string;
    params?: {
      page: number;
      size: number;
    };
    keyMap?: {
      valueName: string;
      labelName: string;
    };
    url?: string;
  };
  authority?: string[];
}

type Props = {
  searchColumnNum?: 2 | 3 | 4 | 6;
  needSearch?: boolean;
  url: string;
  tableScroll?: any;
  columns: Column[];
  tableRowKey?: string;
  customBtn?: () => JSX.Element;
};

const genSearchFormField = (item: SearchFormColumn) => {
  let result;
  const { searchProps = { cmpType: '', params: { page: 1, size: 100 } } } = item;
  const { params = { page: 1, size: 100 } } = searchProps;
  if (item.code) {
    searchProps.code = item.code;
  }
  if (item.type) {
    searchProps.type = item.type;
  }
  switch (searchProps.cmpType) {
    case 'select':
      result = <JqSelect {...searchProps} params={{ params }} />;
      break;
    case 'RangePicker':
      result = <DatePicker.RangePicker />;
      break;
    default:
      result = <Input />;
  }
  return (
    <Form.Item
      key={item.dataIndex}
      label={item.title}
      name={item.searchProps?.searchKey || item.dataIndex}
    >
      {result}
    </Form.Item>
  );
};

const isMoreBtn = (isShowMore: boolean) => {
  const down = <Button className={styles.moreBtnIcon} type="link" icon={<DownOutlined />} />;
  const up = <Button className={styles.moreBtnIcon} type="link" icon={<UpOutlined />} />;
  return (
    <span>
      {!isShowMore ? '更多' : '收起'} {!isShowMore ? down : up}
    </span>
  );
};

const getOffset = (len: number, isShowMore: boolean, searchColumnNum: number) => {
  const colSpan = 24 / searchColumnNum;
  if (len === searchColumnNum - 1) {
    return 0;
  }
  if (len < searchColumnNum) {
    return colSpan;
  }
  if (!isShowMore) {
    return 0;
  }
  return (searchColumnNum - 1 - (len % searchColumnNum)) * colSpan;
};

// 权限过滤，如果没有操作按钮，则把操作列隐藏掉
const authColumnFilter = (columns: SearchFormColumn[]) => {
  const { initialState } = useModel('@@initialState');
  const menuCodes = initialState?.currentUser?.menuCodes;
  return columns.filter((item: SearchFormColumn) => {
    if (!item.authority?.length) {
      return true;
    }

    const intersection = lodash.intersection(item.authority, menuCodes);
    if (intersection.length > 0) {
      return true;
    }
    return false;
  });
};

const SearchFormLayout = React.forwardRef((props: Props, ref: any) => {
  const {
    columns,
    needSearch = true,
    tableScroll = { x: 'max-content' },
    url,
    tableRowKey = 'id',
    searchColumnNum = 3,
    customBtn = () => <></>,
  } = props;

  // 条件字段
  const conditions = columns.filter((item: Column) => item.isCondition);
  // 查询日期字段
  const rangDateProps = columns.filter(
    (item: SearchFormColumn) => item.searchProps && item.searchProps.cmpType === 'RangePicker',
  );
  const authColumns = authColumnFilter(columns);
  const [form] = Form.useForm();
  let searchArea = <></>;
  const [isShowMore, setIsShowMore] = useState(false);
  // 查询条件
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, total: 0, size: 10 });
  const [tableLoading,setTableLoading] = useState(false);

  // 查询数据
  async function fetchData(paginationInfo?: any) {
    const condition = {
      ...form.getFieldsValue(),
      page: paginationInfo.current,
      size: paginationInfo.pageSize || paginationInfo.size,
    };
    setTableLoading(true)
    // 重新构造查询条件
    rangDateProps.map((item) => {
      const tmp = condition[item.dataIndex || ''];
      if (tmp && tmp.length > 0) {
        condition.startDate = tmp[0].format('yyyy-MM-DD hh:mm:ss');
        condition.endDate = tmp[1].format('yyyy-MM-DD hh:mm:ss');
        delete condition[item.dataIndex || ''];
      }
      return '';
    });

    const query = async () => {
      try {
        const queryResult = await fetchTable(url, { ...condition, total: undefined });
        const { records, total } = queryResult;
        setTableData(records);
        setPagination({ ...paginationInfo, total });
        setTableLoading(false)
      } catch (e) {
        message.error("请求失败")
        setTableLoading(false)
        console.error(`请求出错,url:${url},请检查url或者响应的数据`, e);
      }
    };

    query();
  }

  // 表格分页改变事件
  function onTableChange(pageInfo: any) {
    fetchData(pageInfo);
  }

  // 生成查询区域按钮
  const genSearchFormBtn = (colSpan: number) => {
    const searchFormBtns = [];
    const searchAndResetBtn = (
      <>
        <Button
          type="primary"
          // ref={ref}
          onClick={() => {
            fetchData({ ...pagination, current: 1 });
          }}
          style={{ display: conditions.length > 0 ? 'inline-block' : 'none' }}
        >
          查询
        </Button>
        <Button
          type="primary"
          onClick={() => {
            form.resetFields();
          }}
          style={{ display: conditions.length > 0 ? 'inline-block' : 'none' }}
        >
          重置
        </Button>
      </>
    );
    const customBtnEl = customBtn();
    const moreBtnEl = (
      <a
        className={conditions.length > searchColumnNum - 1 ? '' : styles.hidden}
        onClick={() => {
          setIsShowMore(!isShowMore);
        }}
      >
        {isMoreBtn(isShowMore)}
      </a>
    );

    searchFormBtns.push(customBtnEl);
    searchFormBtns.push(moreBtnEl);
    return (
      <Col
        span={colSpan}
        offset={
          conditions.length > 0 ? getOffset(conditions.length, isShowMore, searchColumnNum) : 0
        }
        className={styles.btnWrap}
      >
        {searchAndResetBtn}
        {customBtnEl}
        {moreBtnEl}
      </Col>
    );
  };

  // 查询区域
  if (needSearch) {
    const colSpan = 24 / searchColumnNum;

    searchArea = (
      <div className={styles.formWrap}>
        <Form name="basic" form={form} initialValues={{ remember: true }}>
          <Row gutter={16}>
            {conditions.map((item: Column, index: number) => (
              <Col
                span={
                  index <
                    (conditions.length > searchColumnNum - 1
                      ? searchColumnNum - 1
                      : searchColumnNum) || isShowMore
                    ? colSpan
                    : 0
                }
                key={item.dataIndex}
              >
                {genSearchFormField(item)}
              </Col>
            ))}
            {genSearchFormBtn(colSpan)}
          </Row>
        </Form>
      </div>
    );
  }

  useEffect(() => {
    fetchData(pagination);
  }, []);

  return (
    <div className={styles.container}>
      <Button
        style={{ position: "absolute", top: "-1000" }}
        ref={ref}
        onClick={() => {
          fetchData(pagination);
        }}
      >
      </Button>
      {searchArea}
      <div className={styles.tableWrap}>
        <JqTable
          loading={tableLoading}
          rowKey={tableRowKey}
          pagination={pagination}
          scroll={tableScroll}
          tableDataSource={tableData}
          onChange={onTableChange}
          columns={authColumns}
        />
      </div>
    </div>
  );
});

export default SearchFormLayout;
