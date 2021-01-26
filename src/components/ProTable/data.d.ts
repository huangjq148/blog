import type { ProColumns } from '@ant-design/pro-table';

export type JqColumns<T = any, ValueType = 'text'> = {
  code?: string;
} & ProColumns<T, ValueType>;


export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  params?: { [key: string]: any };
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
