import React from 'react';
import { Avatar } from 'antd';
import styles from './left.less';

const HomePage: React.FC<{}> = () => (
  <div className={styles.container}>
    <div className={styles.userInfo}>
      <Avatar
        className={styles.cursorPointer}
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2070453827,1163403148&fm=26&gp=0.jpg"
      />
      <div className={styles.siteName}>HELLO REACT BLOG</div>
      <div className={styles.siteDesc}>Simple is beautiful</div>
    </div>
    <div className={styles.footer}>Start at 2020-10-20</div>
  </div>
);

export default HomePage;
