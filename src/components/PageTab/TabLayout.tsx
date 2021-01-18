import React from 'react'
// import { TabLayout } from 'antd-pro-page-tabs';
import TabPages from './index';

// const contextMenuLabels = {
//   closeTab: '关闭标签',
//   closeRightTabs: '关闭右侧标签',
//   closeAllTabs: '关闭所有标签'
// }

export default (props: any) => {
  const { children } = props
  return (
    <TabPages
    {...props}
    maxTab="8"
    // preventReload
    remberRefresh
    // animated
    homePage="/dashboard"
    errorPage="/exception/404" />
    // <TabLayout {...props} contextMenuLabels={contextMenuLabels} />
  )
}
