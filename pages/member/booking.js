import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import CardCheck from '@/components/tzu/card-check';
import styles from '@/components/layouts/layout.module.css';
import Tab from '@/components/tab';
import stylesbook from './booking.module.css';

export default function Booking(props) {
  // TAB
  const [activeTab, setActiveTab] = useState(0);
  const tabItemss = ['即將來臨', '已完成'];
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <Layout>
        <LeftSide>
          <MemberSidebar />
        </LeftSide>
        <div className={styles.main}>
          <Tab
            tabItems={tabItemss}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />

          {activeTab === 0 ? (
            <>
              <div className={stylesbook['card-booking']}>
                <CardCheck />
                <CardCheck />
                <CardCheck />
              </div>
            </>
          ) : (
            <>
              <div className={stylesbook['card-booking']}>
                <CardCheck />
                <CardCheck />
                <CardCheck />
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
