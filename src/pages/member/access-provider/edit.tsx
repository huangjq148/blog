import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { Props } from '@/components/Modal/data';
import JqSelect from '@/components/Select';
import { update, add } from './service';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const EditForm = (props: Props) => {
  const [form] = Form.useForm();
  const { onOk, data } = props;

  useEffect(() => {
    if (data.id) {
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [data]);

  return (
    <Modal
      {...props}
      forceRender={false}
      onOk={async () => {
        try {
          form.validateFields().then(async (value) => {
            if (data.id) {
              await update({ ...data, ...value });
              message.success('保存成功');
            } else {
              await add(value);
              message.success('保存成功');
            }
            onOk();
          }).catch(console.log)
        } catch (e) {
          message.error("操作失败")
        }
      }}
    >
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name="name" label="名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="手机号码" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="contactName" label="联系人" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="publicKey" label="接入商公钥">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="平台公钥" name="platformPublicKey">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="platformPrivateKey" label="平台私钥">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="callbackAddress" label="回调地址">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={[{ required: true }]}>
          <JqSelect code="APPLIER_STATUS" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
