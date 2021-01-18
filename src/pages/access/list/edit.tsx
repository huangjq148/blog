import React, { useEffect } from 'react';
import { Modal, Form, Input, message, Radio } from 'antd';
import type { Props } from '@/components/Modal/data';
import { add, update } from './service';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const EditForm = (props: Props) => {
  const [form] = Form.useForm();
  const { onOk, data } = props;

  useEffect(() => {
    if (data.paymentChannelId) {
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [data]);

  return (
    <Modal
      {...props}
      onOk={async () => {
        form.validateFields().then(async (values) => {
          if (data.paymentChannelId) {
            await update({ ...data, ...form.getFieldsValue() });
            message.success('保存成功');
            onOk();
          } else {
            await add(form.getFieldsValue());
            message.success('保存成功');
          }
          onOk();
        }).catch(e => console.log(e))

      }}
    >
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name="name" label="通道名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="code" label="通道编码" rules={[{ required: true }]} >
          <Input />
        </Form.Item>
        <Form.Item name="configData" label="配置">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="status" label="状态" >
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
