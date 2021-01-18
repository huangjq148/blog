import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 深圳市鑫库有限公司技术部出品"
    links={[
      {
        key: 'bz',
        title: '帮助',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'ys',
        title: "隐私",
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'tk',
        title: '条款',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);
