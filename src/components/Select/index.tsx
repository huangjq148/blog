import { Select } from 'antd';
import React from 'react';
import { useModel } from 'umi';

type SelectProps = {
  url?: string;
  code?: string;
  value?: string;
  dataSourceType?: string;
  params?: any;
  onChange?: () => void;
  dispatch?: (params: any) => void;
}

const JqSelect: React.FC<SelectProps> = (props) => {
  
  const { value, code, onChange } = props;
  const { codes, getCode } = useModel('code');

  if (code) {
    getCode(code)
  }

  return <Select allowClear onChange={onChange} value={value} options={codes[code]} />;
};

export default JqSelect;
// export default connect(({ codes }: { codes: CodeModelState }) => ({
//   codes,
// }))(JqSelect);
