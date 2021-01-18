import React from 'react';
import { Card, Row, Col } from 'antd';
import styles from './index.less';
import PerDayCount from './components/PerDayCount';
import ExpRank from './components/expRank';
import AccessRank from './components/accessRank';
import Report from './components/report';


const Dashboard: React.FC<{}> = () => (
  <div>
    <Row>
      <Col span={24}>
        <PerDayCount />
      </Col>
    </Row>
    <Row gutter={16} className={styles.blockWrap}>
      <Col span={12}>
        <ExpRank />
      </Col>
      <Col span={12}>
        <AccessRank />
      </Col>
    </Row>
    <Row className={styles.blockWrap} >
      <Col span={24}>
        <Report />
      </Col>
    </Row>
  </div>
);

export default Dashboard;
