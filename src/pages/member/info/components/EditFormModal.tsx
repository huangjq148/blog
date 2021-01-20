import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, message, Upload } from 'antd';
import type { Props } from '@/components/Modal/data';
import JqSelect from '@/components/Select';
import { update, add, findById } from '../service';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const EditForm = (props: Props) => {
  const [form] = Form.useForm();
  const { onOk, data, visible } = props;
  const [imageUrl, setImageUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (_imageUrl: string) => {
        setLoading(false);
        setImageUrl(_imageUrl);
      }
        // this.setState({
        //   imageUrl,
        //   loading: false,
        // }),
      );
    }
  };

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
        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="sex" label="性别" rules={[{ required: true }]}>
          <JqSelect code="APPLIER_STATUS" />
        </Form.Item>
        <Form.Item name="avatar" label="头像" rules={[{ required: true }]}>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/server/uploader/upload"
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
