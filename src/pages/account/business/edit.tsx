import React, { useEffect } from 'react';
import { Modal, Form, message, InputNumber } from 'antd';
import { Props } from '@/components/Modal/data';
import { updateRate } from './service';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const EditForm = (props: Props) => {
  const { onOk, data } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  return (
    <Modal
      {...props}
      onOk={async () => {
        if (data.id) {
          const result = await updateRate({ ...data, ...form.getFieldsValue() });
          if (result.code === 20003) {
            message.error(result.message);
            return;
          }
          message.success('保存成功');
          onOk();
        }
      }}
    >
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name="serviceRate" label="服务费率" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} min={0} max={1} step={0.1} />
        </Form.Item>
        <Form.Item name="invoiceRate" label="发票费率" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} min={0} max={1} step={0.1} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
