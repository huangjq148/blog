import { BarChartOutlined } from '@ant-design/icons';
import { Col, DatePicker, Row, Card } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styles from '../index.less';
import { dailyStatistics } from '../service';

type Item = {
  num: number;
  name: string;
}

const getItem = (item: Item) => (
  <Row gutter={10}>
    <Col span={6} className={styles.itemIconWrap}>
      <BarChartOutlined className={styles.itemIcon} />
    </Col>
    <Col span={18}>
      <Row className={styles.itemNumber}>{item.num}</Row>
      <Row className={styles.itemName}>{item.name}</Row>
    </Col>
  </Row>
);

const PerDayCount: React.FC<{}> = () => {
  const [data, setData] = useState({
    enterpriseRecharge: 0,
    enterpriseWithdraw: 0,
    sysOrder: 0,
    perWithdraw: 0,
    enterprise: 0,
    personal: 0,
    refundOrder: 0,
  });
  const [queryDate, setQueryDate] = useState('');

  useEffect(() => {
    async function query() {
      const result = await dailyStatistics(queryDate);
      setData(result);
    }
    query();
  }, [queryDate]);

  return (
    <>
      <Card
        title="每日统计"
        extra={
          <DatePicker
            defaultValue={moment()}
            onChange={(val: any) => {
              setQueryDate(val.format('yyyy-MM-DD'));
            }}
          />
        }>
        <div className={styles.itemContainer}>
          <div className={styles.itemWrap}>
            {getItem({ num: data.enterpriseRecharge, name: '企业充值金额' })}
          </div>
          <div className={styles.itemWrap}>
            {getItem({ num: data.enterpriseWithdraw, name: '企业提现金额' })}
          </div>
          <div className={styles.itemWrap}>
            {getItem({ num: data.sysOrder, name: '企业代付金额' })}
          </div>
          <div className={styles.itemWrap}>
            {getItem({ num: data.perWithdraw, name: '个人提现金额' })}
          </div>
          <div className={styles.itemWrap} />
        </div>
        <div className={styles.itemContainer}>
          <div className={styles.itemWrap}>
            {getItem({ num: data.enterprise, name: '企业注册数' })}
          </div>
          <div className={styles.itemWrap}>{getItem({ num: data.personal, name: '个人注册数' })}</div>
          <div className={styles.itemWrap}>
            {getItem({ num: data.refundOrder, name: '退款金额' })}
          </div>
          <div className={styles.itemWrap} />
          <div className={styles.itemWrap} />
        </div>
      </Card>
    </>
  );
};

export default PerDayCount;
