import { useEffect, useState } from 'react';
import { fetchTable } from '@/services/base';

interface Props {
  url: string;
  conditions?: any;
}

function useTable(props: Props) {
  const [result, setResult] = useState({
    data: [],
    fetchData,
    pagination: { page: 1, size: 10, total: 0 },
  });
  const { url } = props;

  function fetchData(params?: any) {
    const query = async () => {
      try {
        const queryResult = await fetchTable(url, { ...params, total: undefined });
        const { records, total } = queryResult;
        // const { records } = result;
        setResult({
          ...result,
          data: records,
          pagination: {
            ...result.pagination,
            total,
          },
        });
      } catch (e) {
        console.error(`请求出错,url:${url},请检查url或者响应的数据`, e);
      }
    };

    query();
  }

  useEffect(() => {
    fetchData(result.pagination);
  }, []);

  return result;
}

export default useTable;
