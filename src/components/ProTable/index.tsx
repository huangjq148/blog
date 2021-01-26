
import ProTable from '@ant-design/pro-table';
import type { ProTableProps } from '@ant-design/pro-table';
import type { ParamsType } from '@ant-design/pro-provider';
import type { JqColumns } from './data.d';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import _ from "lodash"


const JqProTable = <T extends Record<string, any>, U extends ParamsType, ValueType>(
    props: ProTableProps<T, U, ValueType> & {
        defaultClassName?: string;
        columns: JqColumns[]
    },
) => {
    const [columns, setColumns] = useState<JqColumns[]>([])
    const { codes, codeEnum, getCode } = useModel('code');
    useEffect(() => {
        const tmp: JqColumns[] = []
        // eslint-disable-next-line array-callback-return
        props.columns.map(async (item: JqColumns) => {
            if (!item.code) {
                tmp.push(item)
            } else {
                getCode(item.code, item.isCodeCache)
                tmp.push({
                    ...item, valueEnum: codeEnum[item.code], fieldProps: {
                        options: codes[item.code]
                    }
                })
            }

        })
        setColumns(tmp)
    }, [codeEnum, getCode, props.columns])

    return (
        <ProTable
            {...props}
            columns={columns}
        />
    );
};
export default JqProTable;
