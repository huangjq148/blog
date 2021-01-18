import useRequest from '@/hooks/useRequest';
import { Select } from 'antd';
import React from 'react';
import type { CodeModelState} from 'umi';
import { connect } from 'umi';

type SelectProps = {
  codes?: CodeModelState;
  url?: string;
  code?: string;
  value?: string;
  dataSourceType?: string;
  params?: any;
  onChange?: () => void;
  dispatch?: (params: any) => void;
}

const JqSelect: React.FC<SelectProps> = (props) => {
  const { url, codes, value, code, onChange, dispatch } = props;
  const { dataSource } = useRequest(props);
  let codeArr = [];
  if (url) {
    codeArr = dataSource;
  } else if (code && (!codes || !codes.codes || !codes.codes[code]) && dispatch) {
    dispatch({
      type: 'codes/query',
      code,
    });
  } else if (code && codes && codes.codes[code]) {
    // eslint-disable-next-line array-callback-return
    codeArr = codes.codes[code];
  }

  return <Select allowClear onChange={onChange} value={value} options={codeArr} />;
};
export default connect(({ codes }: { codes: CodeModelState }) => ({
  codes,
}))(JqSelect);
