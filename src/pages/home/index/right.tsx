import React from 'react';
import { Tabs } from 'antd';
import styles from "./right.less";
import Home from "./components/home/index"

const { TabPane } = Tabs;

function callback(key: string) {
    console.log(key);
}

const OperationsSlot = {
    left: <div className={styles.tabHeaderLeft} />
};

const HomePage: React.FC<{}> = () => {

    const position = ["left"]

    const slot = React.useMemo(() => {
        if (position.length === 0) return null;

        return position.reduce(
            (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
            {},
        );
    }, [position]);

    return (
        <div className={styles.container}>
            <Tabs tabBarExtraContent={slot} defaultActiveKey="1" className={styles.tabWrap} onChange={callback}>
                <TabPane className={styles.contentWrap} tab="Home" key="1">
                    <Home />
                </TabPane>
                <TabPane className={styles.contentWrap} tab="Links" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane className={styles.contentWrap} tab="About" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
};
export default HomePage;
