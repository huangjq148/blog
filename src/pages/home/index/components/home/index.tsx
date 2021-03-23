import React, { useState, useEffect } from 'react';
import { List, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import type { TableListItem, IconTextParam } from './data.d';
import { queryArticle } from './service';
import styles from './index.less';
import { markdown } from "markdown";
import htmlText from "html-text";
// import VirtualList from 'react-tiny-virtual-list';

const IconText = ({ icon, text }: IconTextParam) => (
  <Space className={styles.cursorPointer}>
    <span className={styles.iconHover}>{React.createElement(icon)}</span>
    {text}
  </Space>
);

const handleClick = (item: string) => {
  return item;
};

const renderItem = (item: TableListItem) => (
  <List.Item
    key={item.id}
    actions={[
      <IconText
        icon={StarOutlined}
        onClick={() => {
          handleClick('star-');
        }}
        text={item.star}
        key="list-vertical-star-o"
      />,
      <IconText
        icon={LikeOutlined}
        onClick={() => {
          handleClick('skr-');
        }}
        text={item.skr}
        key="list-vertical-like-o"
      />,
      <IconText
        icon={MessageOutlined}
        onClick={() => {
          handleClick('comment-');
        }}
        text={item.comment}
        key="list-vertical-message"
      />,
    ]}
  >
    <div>
      <a href={item.href} className={styles.articleTitle}>
        {item.title}
      </a>
    </div>
    <div className={styles.articleContent}>{htmlText(markdown.toHTML(item.content))}</div>
  </List.Item>
);

const HomePage: React.FC<{}> = () => {
  const [listData, setListData] = useState<TableListItem[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const queryData = async () => {
      const result = await queryArticle({ current, pageSize });
      if (result?.success) {
        setListData(result.data);
        setTotal(result.total);
      }
    };
    queryData();
  }, [current, pageSize]);

  return (
    <div className={styles.container}>
      <List
        itemLayout="vertical"
        size="large"
        rowKey="id"
        pagination={{
          onChange: (page, pageSizeNum) => {
            setCurrent(page);
            if (pageSizeNum) {
              setPageSize(pageSizeNum)
            }
          },
          pageSize,
          total,
        }}
        dataSource={listData}
        renderItem={renderItem}
      />
    </div>
  );
};

export default HomePage;
