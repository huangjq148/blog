export interface TableListItem {
  id: string;
  href: string;
  title: string;
  star: number;
  skr: number;
  comment: number;
  avatar: string;
  description: string;
  content: string;
}
export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export declare interface IconTextParam {
  icon: any;
  text: number;
  onClick?: Function;
  // className: string
}
