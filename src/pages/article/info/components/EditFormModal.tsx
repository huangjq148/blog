import React, { useEffect } from 'react';
import { Modal, Form, Input, message, InputNumber } from 'antd';
import type { Props } from '@/components/Modal/data';
import { update, add, findById } from '../service';
import JqSelect from '@/components/Select';
import MarkdownEditor from "@/components/MarkdownEditor"

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const EditForm = (props: Props) => {
  const [form] = Form.useForm();
  const { onOk, data } = props;

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
  }, [data]);

  return (
    <Modal
      {...props}
      forceRender={false}
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
        <Form.Item name="title" label="标题" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="类型" >
          <JqSelect code="ARTICLE_TYPE" />
        </Form.Item>
        <Form.Item name="content" label="内容" rules={[{ required: true }]}>
          <MarkdownEditor/>
        </Form.Item>
        <Form.Item name="sortNo" label="序号" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
