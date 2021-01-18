import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { Props } from '@/components/Modal/data';
import { updateRole, addRole } from './service';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const EditForm = (props: Props) => {
  const [form] = Form.useForm();
  const { onOk, data } = props;

  useEffect(() => {
    if (data.roleId) {
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [data]);

  return (
    <Modal
      {...props}
      onOk={async () => {
        try {
          form.validateFields().then(async (result: any) => {
            if (data.roleId) {
              await updateRole({ roleId: data.roleId, ...result });
              message.success('保存成功');
              onOk();
            } else {
              await addRole(result);
              message.success('保存成功');
            }
          }).catch(e => {
            console.log(e);
          })

        } catch (e) {
          message.error('操作失败');
        }
      }}
    >
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name="roleName" label="名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="roleDesc" label="描述">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
