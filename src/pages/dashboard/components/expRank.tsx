import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import RankTemplate from './rankTemplate';
import { monthlyRankingOfEnterprisePayment } from '../service';
import { BarChartOutlined } from '@ant-design/icons';

const PerDayCount: React.FC<{}> = () => {
  const [queryDate, setQueryDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    async function query() {
      const result = await monthlyRankingOfEnterprisePayment(queryDate);
      setDataSource(result);
    }
    query();
  }, [queryDate]);

  return (
    <>
      <RankTemplate
        data={dataSource.map((item: any) => ({
          id: item.enterpriseId,
          name: item.enterpriseName,
          number: item.successAmount,
        }))}
        onDateChange={(date: string) => setQueryDate(date)}
        title={<><BarChartOutlined />    企业代付金额排名</>}
      />
    </>
  );
};

export default PerDayCount;
