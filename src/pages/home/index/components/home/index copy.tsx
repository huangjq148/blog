import React, { useState, useEffect } from 'react';
import { List, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { TableListItem, IconTextParam } from './data.d';
import { queryArticle } from './service';
import styles from './index.less';

const IconText = ({ icon, text }: IconTextParam) => (
  <Space className={styles.cursorPointer}>
    <span className={styles.iconHover}>{React.createElement(icon)}</span>
    {text}
  </Space>
);

const renderItem = (item: TableListItem) => (
  <List.Item
    key={item.title}
    actions={[
      <IconText icon={StarOutlined} text={item.star} key="list-vertical-star-o" />,
      <IconText icon={LikeOutlined} text={item.skr} key="list-vertical-like-o" />,
      <IconText icon={MessageOutlined} text={item.comment} key="list-vertical-message" />,
    ]}
  >
    <div>
      <a href={item.href} className={styles.articleTitle}>
        {item.title}
      </a>
    </div>
    <div className={styles.articleContent}>{item.content}</div>
  </List.Item>
);

const HomePage: React.FC<{}> = () => {
  const [listData, setListData] = useState<TableListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const queryData = async () => {
      const result = await queryArticle({ currentPage, pageSize });
      setListData(result.content);
      setTotal(result.total);
    };
    queryData();
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            setCurrentPage(page);
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
