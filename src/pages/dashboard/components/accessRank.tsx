import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import RankTemplate from './rankTemplate';
import { monthlyRankingOfApplierPayment } from '../service';
import { BarChartOutlined } from '@ant-design/icons';

const PerDayCount: React.FC<{}> = () => {
  const [queryDate, setQueryDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    async function query() {
      const result = await monthlyRankingOfApplierPayment(queryDate);
      setDataSource(
        result
      );
    }
    query();
  }, [queryDate]);

  return (
    <RankTemplate
      data={dataSource.map((item: any) => ({
        id: item.applierId,
        name: item.applierName,
        number: item.successAmount,
      }))}
      onDateChange={(date: string) => setQueryDate(date)}
      title={<><BarChartOutlined />  接入商代付金额排名</>}
    />
  );
};

export default PerDayCount;
