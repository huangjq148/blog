export interface Props {
  title: string;
  visible?: boolean;
  width?: string | number;
  onCancel: () => void;
  onOk: () => void;
  column?: number;
  fields?: Item[];
  data: any;
  children?: JSX.Element;
  formItemLayout?: any;
}
