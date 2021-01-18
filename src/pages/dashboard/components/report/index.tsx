import { Column } from '@ant-design/charts';
import { DatePicker, Card } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { everyDayMonthOrder } from '../../service';
import styles from './index.less';

const Dashboard: React.FC<{}> = () => {
  const [data, setData] = useState([]);
  const [queryDate, setQueryDate] = useState(dayjs().format('YYYY-MM'));
  const config = {
    data,
    xField: 'date',
    yField: '代付金额(元)',
    meta: { formatter: () => 'asdasd' },
  };

  useEffect(() => {
    async function query() {
      const result = await everyDayMonthOrder(`${queryDate}-01`);
      let tmp = [];
      tmp = Object.keys(result).map((item: string) => ({
        date: item,
        "代付金额(元)": parseFloat(result[item]),
      }));
      setData(tmp);
    }
    query();
  }, [queryDate]);
  return (
    <Card
      title="代付月度报表"
      extra={
        <DatePicker
          picker="month"
          defaultValue={moment()}
          onChange={(val: any) => {
            setQueryDate(val.format('yyyy-MM'));
          }}
        />
      }
    >
      <Column {...config} />
    </Card>
  );
};

export default Dashboard;
