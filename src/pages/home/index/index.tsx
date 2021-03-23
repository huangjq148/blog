import React from 'react';
import { Row, Col } from "antd";
import Left from "./left"
import Right from "./right"

const HomePage: React.FC<{}> = () => (
  <Row>
    <Col span={6}>
      <Left />
    </Col>
    <Col span={18}>
      <Right />
    </Col>
  </Row>
);

export default HomePage;
