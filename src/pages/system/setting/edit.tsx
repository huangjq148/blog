import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { Props } from '@/components/Modal/data';
import { update } from './service';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const EditForm = (props: Props) => {
  const [form] = Form.useForm();
  const { onOk, data } = props;

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  return (
    <Modal
      {...props}
      onOk={async () => {
        form.validateFields().then(async (values: any) => {
          if (data.id) {
            const result = await update({ ...data, ...values });
            if (result.code === 20003) {
              message.error(result.message);
              return;
            }
            message.success('保存成功');
            onOk();
          }
        }).catch(console.log)

        //  else {
        //   await add(form.getFieldsValue());
        //   data.success('保存成功');
        // }
      }}
    >
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name="paramCode" label="参数编码" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="paramValue" label="参数值" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="remark"
          label="备注"
        // rules={[{ type: 'number', min: 0, max: 99 }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
