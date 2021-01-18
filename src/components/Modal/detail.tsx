import React from 'react';
import { Modal, Form, Row, Col } from 'antd';
import ShowLabel from '@/components/ShowLabel';
import dayjs from 'dayjs';
import { Props } from './data';

export interface Item {
  label: string;
  key: string;
  type?: string;
  code?: string;
  format?: string;
  render?: () => JSX.Element;
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

function getFieldLabel(data: any, item: Item) {
  let result;
  const keys = item.key.split(',');
  if (item.render) {
    return <>{item.render()}</>;
  }
  switch (item.type) {
    case 'dateRange':
      result = `${dayjs(data[keys[0]]).format(item.format || 'YYYY-MM-DD')}至${dayjs(
        data[keys[1]],
      ).format(item.format || 'YYYY-MM-DD')}`;
      break;
    case 'date':
      result = dayjs(data[item.key]).format(item.format || 'YYYY-MM-DD');
      break;
    case 'code':
      result = <ShowLabel code={item.code || ''} value={data[item.key]} />;
      break;
    case 'diff':
      result = data[keys[0]] - data[keys[1]];
      break;
    default:
      result = data[item.key];
  }

  return <>{result}</>;
}

const DetailForm = (props: Props) => {
  const { data, column = 1, fields = [], children = <></> } = props;
  const innerFormItemLayout = props.formItemLayout || formItemLayout;
  return (
    <Modal {...props} onCancel={() => props.onCancel()} onOk={() => props.onOk()}>
      <Form {...innerFormItemLayout}>
        <Row>
          {fields.map((item: any) => (
            <Col span={24 / column} key={item.key}>
              <Form.Item label={item.label} style={{ marginBottom: '10px' }} key={item.key}>
                {getFieldLabel(data, item)}
              </Form.Item>
            </Col>
          ))}
        </Row>
      </Form>
      {children}
    </Modal>
  );
};

export default DetailForm;
