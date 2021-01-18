import { useEffect, useState } from 'react';
import request from '@/utils/request';

interface Props {
  url?: string;
  code?: string;
  type?: string;
  value?: string;
  params?: string;
  keyMap?: { valueName: 'value'; labelName: 'label' };
  dataSourceType?: string;
}

function useRequest(props: Props) {
  const {
    url = '',
    code,
    type,
    dataSourceType,
    keyMap = { valueName: 'value', labelName: 'label' },
    params = { params: { page: 1, size: 1000 } },
  } = props;
  const [dataSource, setDataSource] = useState([]);

  // function arr2obj(arr: Array<Code>, codeName: string = "code", valueName: string = "value") {
  //     const result = {}
  //     // eslint-disable-next-line array-callback-return
  //     arr.map((item: Code) => {
  //         result[item[codeName]] = item[valueName]
  //     })
  //     return result;
  // }

  async function fetchArr() {
    let result = await request.get(url, params);

    if (dataSourceType === 'table') {
      result = result.records.map((item: any) => ({
        value: item[keyMap.valueName],
        label: item[keyMap.labelName],
      }));
    }
    setDataSource(
      result || [
        { value: '1', label: '女' },
        { value: '0', label: '男' },
      ],
    );
  }
  async function fetchCode() {
    setDataSource([
      { value: '1', label: '女code' },
      { value: '0', label: '男code' },
    ]);
  }

  useEffect(() => {
    if (code) {
      fetchCode();
    } else if (url) {
      fetchArr();
    }
  }, [code, url]);

  return { dataSource };
}

export default useRequest;
