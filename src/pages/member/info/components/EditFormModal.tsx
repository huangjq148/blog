import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, message, Upload } from 'antd';
import type { Props } from '@/components/Modal/data';
import JqSelect from '@/components/Select';
import { update, add, findById } from '../service';
import JqAvatarUploader from "@/components/Upload/Avatar"

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
      getContainer={false}
      onOk={async () => {
        const hide = message.loading('正在保存');
        try {
          form.validateFields().then(async (value) => {
            if (data.id) {
              await update({ ...data, ...value });
            } else {
              await add(value);
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
        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="sex" label="性别" rules={[{ required: true }]}>
          <JqSelect code="SEX" />
        </Form.Item>
        <Form.Item name="avatar" label="头像" rules={[{ required: true }]}>
          <JqAvatarUploader/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
