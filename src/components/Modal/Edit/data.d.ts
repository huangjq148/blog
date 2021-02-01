export type Props = {
  title?: string;
  visible?: boolean;
  width?: string | number;
  onCancel?: () => void;
  onOk?: () => void;
  beforeSubmit?: () => Promise<boolean>;
  column?: number;
  fields?: Item[];
  data?: any;
  layout?: {
    labelCol: { span: number };
    wrapperCol: { span: number };
  };
  children?: JSX.Element;
  formItemLayout?: any;
  add: (data) => void;
  findById: (id: string) => void;
  update: (data) => void;
};
