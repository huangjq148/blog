import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { Props } from '@/components/Modal/data';
import JqSelect from '@/components/Select';
import { addUser } from './service';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const EditForm = (props: Props) => {
  const [form] = Form.useForm();
  const { onOk, data } = props;

  form.resetFields();

  return (
    <Modal
      {...props}
      onOk={async () => {
        const formValue = form.getFieldsValue();
        form
          .validateFields()
          .then(async (res) => {
            if (formValue.passWord !== formValue.twoPassWord) {
              message.error('两次输入密码不同');
              return;
            }

            try {
              await addUser({ userId: data.userId, ...form.getFieldsValue() });
              message.success('保存成功');
              onOk();
            } catch (e) {
              message.error('修改失败');
            }
            onOk();
          })
          .catch((e) => {
            console.error(e);
          });
      }}
    >
      <Form {...layout} form={form} name="nest-messages">
        <Form.Item name="realName" label="姓名">
          <Input />
        </Form.Item>
        <Form.Item
          name="userName"
          label="用户名"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="手机号码">
          <Input />
        </Form.Item>
        <Form.Item
          name="passWord"
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
          name="twoPassWord"
          label="二次密码"
          rules={[
            {
              required: true,
              min: 6,
              validator: (rule, value: string) => {
                if (form.getFieldValue('passWord') !== value) {
                  return Promise.reject('两次输入的密码不同');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <JqSelect code="USE_STATUS" />
        </Form.Item>
        <Form.Item name="roleId" label="角色">
          <JqSelect
            url="/sys/role_list"
            dataSourceType="table"
            keyMap={{
              valueName: 'roleId',
              labelName: 'roleName',
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
