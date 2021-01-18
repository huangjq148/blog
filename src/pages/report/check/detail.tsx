import React from 'react';
import DetailModal, { Item } from "@/components/Modal/detail"
import { Props } from "@/components/Modal/data"

const DetailForm = (props: Props) => {

    const fields: Item[] = [
        { label: "平台用户编码", key: "name" },
        { label: "余额", key: "phone" },
        { label: "可用余额", key: "name", type: "text" },
        { label: "冻结余额", key: "name", type: "text" },
        { label: "收款虚拟账户名称", key: "name", type: "text" },
        { label: "收款虚拟战虎卡号", key: "date", type: "date" },
        { label: "用户角色", key: "name", type: "text" },
        { label: "审核状态", key: "name", type: "text" },
        { label: "用户状态", key: "name", type: "text" },
    ]

    return (
        <DetailModal
            fields={fields}
            {...props} />
    )
}


export default DetailForm;
