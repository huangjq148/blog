import React from 'react';
import { CodeModelState, Code, ConnectProps, connect } from 'umi';

// interface PageProps extends ConnectProps {
interface PageProps {
  codes?: CodeModelState;
  code: string;
  value: string;
  dispatch: any;
}
const ShowLabel: React.FC<PageProps> = ({ codes, code, value, dispatch }) => {
  const codeObj = {};
  if ((!codes || !codes.codes || !codes.codes[code]) && dispatch) {
    dispatch({
      type: 'codes/query',
      code,
    });
  } else if (codes && codes.codes[code]) {
    // eslint-disable-next-line array-callback-return
    codes.codes[code].map((item: Code) => {
      codeObj[item.value] = item.label;
    });
  }

  return <>{codeObj[value] || value}</>;
};
export default connect(({ codes }: { codes: CodeModelState }) => ({
  codes,
}))(ShowLabel);
