export type TableListItem = {
  id: string;
  key: number;
  code?: string;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
}

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
}

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  params?: Record<string, any>;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
}
