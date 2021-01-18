import { DatePicker, Progress, Card } from 'antd';
import moment from 'moment';
import React from 'react';
import styles from './index.less';

type Props = {
  title: string | React.ReactNode;
  onDateChange: Function;
  data: any;
}

type Item = {
  id: string;
  name: string;
  number: number
}

const PerDayCount: React.FC<Props> = (props: Props) => {
  const { data, onDateChange } = props;

  return (
    <Card className={styles.container}
      title={props.title}
      extra={<DatePicker
        defaultValue={moment()}
        onChange={(val: any) => {
          onDateChange(val.format('yyyy-MM-DD'));
        }}
      />}>
      <ul className={styles.rankList}>
        {data.map((item: Item) => (
          <li className={styles.rankItem} key={item.id}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.moneyPro}>
              <Progress percent={100} showInfo={false} size="small" />
            </div>
            <div className={styles.money}>{item.number}</div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default PerDayCount;
