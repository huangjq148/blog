export interface Column {
  title?: string;
  dataIndex?: string;
  key?: string;
  isCondition?: boolean;
  cmpType?: string;
  url?: string;
  type?: string;
  // 查询区域key
  searchKey?: string;
  // 数据源类型 table|""
  dataSourceType?: string;
  keyMap?: { valueName?: string; labelName?: string };
  params?: any;
  code?: string;
  fixed?: string;
  width?: number;
  render?: (val: any, record: any) => JSX.Element;
}

export interface TableProps {
  scroll: any;
  pagination: any;
  tableDataSource: any;
  columns: Column[];
  rowKey: string;
  onChange: (pageInfo) => void;
}
