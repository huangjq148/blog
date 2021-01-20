import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import type { Props } from '@/components/Modal/data';
import JqSelect from '@/components/Select';
import { update, add, findById } from '../service';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const EditForm = (props: Props) => {
  const [form] = Form.useForm();
  const { onOk, data, visible } = props;

  useEffect(() => {

    async function query(id: string) {
      const result = await findById(id)
      form.setFieldsValue(result);
    }

    if (data.id) {
      query(data.id)
    } else {
      form.resetFields();
    }
  }, [data, visible]);

  return (
    <Modal
      {...props}
      forceRender={false}
      onOk={async () => {
        const hide = message.loading('正在保存');
        try {
          form.validateFields().then(async (values) => {
            if (values.password !== values.twoPassword) {
              message.error('两次输入密码不同');
              return;
            }
            if (data.id) {
              await update({ ...data, ...values, twoPassword: undefined });
            } else {
              await add({ ...values, twoPassword: undefined });
            }
            message.success('保存成功');
            hide();
            onOk();
          }).catch(console.log)
        } catch (e) {
          hide();
          message.error('保存失败请重试！');
        }
      }}
    >
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name="username" label="账号" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              min: 6,
              validator: (rule, value: string) => {
                if (/[a-zA-Z]/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('密码中至少要有一个字母');
              }
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="twoPassword"
          label="二次密码"
          rules={[
            {
              required: true,
              min: 6,
              validator: (rule, value: string) => {
                if (form.getFieldValue('password') !== value) {
                  return Promise.reject('两次输入的密码不同');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={[{ required: true }]}>
          <JqSelect code="APPLIER_STATUS" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
