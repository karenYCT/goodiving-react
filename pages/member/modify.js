import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import Tab from '@/components/tab';
import styles from '@/components/layouts/layout.module.css';

export default function Modify({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // Tab選項
  const tabItemss = ['更新個人資訊', '更新密碼'];

  return (
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
        <div>
          {activeTab === 0 && <p>這裡是個人資訊表單</p>}
          {activeTab === 1 && <p>這裡是更新密碼表單</p>}
        </div>
      </div>
    </Layout>
  );
}
