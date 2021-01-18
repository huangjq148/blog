import React from 'react';
import { useModel } from 'umi';

type Props = {
    children: any;
    authority: string;
}

export default (props: Props) => {
    const { initialState } = useModel('@@initialState');
    const { authority, children } = props;
    let childrenEl = (<></>)

    if (initialState?.currentUser?.menuCodes?.includes(authority)) {
        childrenEl = children
    }

    return (<>
        {childrenEl}
    </>)
};
