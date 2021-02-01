import type { Props } from '@/components/Modal/Edit/data';
import { Form, Input, message, Modal } from 'antd';
import React, { useEffect } from 'react';
import JqSelect from '@/components/Select';

export type Item = {
    label: string;
    name: string;
    type?: string;
    code?: string;
    rules?: any[];
    format?: string;
    required?: boolean;
    render?: () => JSX.Element;
}

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const getFormComponent = (item: Item) => {
    let component = <></>

    switch (item.type) {
        case "textarea":
            component = <Input.TextArea />;
            break;
        case "password":
            component = <Input.Password />;
            break;
        case "jqSelect":
            component = <JqSelect code={item.code} />;
            break;
        default:
            component = <Input />;
    }

    return component;
}

const EditForm = (props: Props) => {
    const [form] = Form.useForm();
    const { fields = [], onOk = () => { }, data, add, findById, update } = props;

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
            getContainer={false}
            forceRender={false}
            onOk={async () => {
                const hide = message.loading('正在保存');
                try {
                    form.validateFields().then(async (value) => {
                        if (props.beforeSubmit) {
                            await props.beforeSubmit();
                        }

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
            asdasd
            <Form {...(props.layout || layout)} form={form} name="nest-messages">
                {fields.map((item: Item) => (
                    <Form.Item
                        name={item.name}
                        key={item.name}
                        label={item.label}
                        rules={[{ required: item.required }, ...(item.rules || [])]}>
                        {getFormComponent(item)}
                    </Form.Item>
                ))}
            </Form>
        </Modal>
    );
};

export default EditForm;
