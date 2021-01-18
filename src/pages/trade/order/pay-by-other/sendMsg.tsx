import React, { useEffect, useState } from 'react';
import { Modal, message, Form, Input, Button, Row, Col } from 'antd';
import { Props } from '@/components/Modal/data';
import { sendMsg, payOrder } from './service';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

let intervalHandler: NodeJS.Timeout;

const EditForm = (props: Props) => {
  const { data, onOk, visible } = props;
  const [form] = Form.useForm();
  const [checkCodeRequestNo, setCheckCodeRequestNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [btnText, setBtnText] = useState('发送验证码');
  // const [intervalHandler, setIntervalHandler] = useState()

  useEffect(() => {
    form.resetFields()
    setBtnText("发送验证码");
    setLoading(false);
    clearInterval(intervalHandler);
  }, [visible])

  return (
    <Modal
      {...props}
      onOk={async () => {
        try {
          form.validateFields().then(async (values: any) => {
            const result = await payOrder({
              platformOrderNo: data.platformOrderNo,
              ...values,
              checkCodeRequestNo,
            });
            if (result.code === 20003) {
              message.error(result.message)
            } else {
              message.success('操作成功');
              onOk();
            }
          }).catch(e => {
            console.log(e);
          })
        } catch (e) {
          message.error('操作失败');
          console.error(e);
        }

      }}
    >
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item label="接入商">{data.applierName}</Form.Item>
        <Form.Item label="下游批次号">{data.downOrderNo}</Form.Item>
        <Form.Item label="企业名称">{data.enterpriseName}</Form.Item>
        <Form.Item label="总金额">{data.payAmount}</Form.Item>
        <Form.Item label="笔数">{data.payCount}</Form.Item>
        <Form.Item label="验证码" required>
          <Row>
            <Col span={12}>
              <Form.Item name="checkCode" rules={[{
                required: true, validator: (rules, value: string) => {
                  if (!value?.trim()) {
                    return Promise.reject("验证码为必填项")
                  }
                  return Promise.resolve("通过")
                }
              }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                loading={loading}
                onClick={async () => {
                  let leftSeconds = 60;
                  setLoading(true);
                  setBtnText(`${leftSeconds}s可重发`);
                  intervalHandler = setInterval(() => {
                    leftSeconds -= 1;
                    setBtnText(`${leftSeconds}s可重发`);
                    if (leftSeconds === 0) {
                      clearInterval(intervalHandler);
                      setLoading(false);
                      setBtnText(`发送验证码`);
                    }
                  }, 1000);

                  try {
                    const checkCodeRequestNoTmp = await sendMsg(data.platformOrderNo);
                    message.success("消息已发送，请查收")
                    setCheckCodeRequestNo(checkCodeRequestNoTmp)
                  } catch (e) {
                    message.error("消息发送失败")
                  }
                }}
              >
                {btnText}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
