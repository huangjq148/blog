import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { changePassWord } from './service';

type Props = {
  title: string;
  onCancel: () => void;
  onOk: () => void;
  visible: boolean;
};
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const ChangePasswordModal: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  form?.resetFields();
  return (
    <Modal
      {...props}
      onOk={() => {
        const formValue = form.getFieldsValue();
        form
          .validateFields()
          .then(async (res) => {
            if (formValue.password !== formValue.twoPassWord) {
              message.error('两次输入密码不同');
              return;
            }

            try {
              await changePassWord(formValue);
              message.success('保存成功');
              props.onOk();
            } catch (e) {
              message.error('修改失败');
            }
          })
          .catch((e) => {
            console.error(e);
          });
      }}
    >
      <Form form={form} {...layout}>
        <Form.Item label="旧密码" name="oldPassWord" rules={[{
          required: true,
          min: 6
        }]}>
          <Input type="password" />
        </Form.Item>
        <Form.Item label="新密码" name="newPassWord" rules={[{
          required: true, min: 6,
          validator: (rule, value: string) => {
            if (/[a-zA-Z]/.test(value)) {
              return Promise.resolve();
            }
            return Promise.reject('密码中至少要有一个字母');
          }
        }]}>
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="newPassWordTwo"
          rules={[
            {
              required: true,
              min: 6,
              validator: (rule, value: string) => {
                if (form.getFieldValue('newPassWord') !== value) {
                  return Promise.reject('两次输入的密码不同');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
