import React, { useState } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import styles from '@/components/layouts/layout.module.css';
import Tab from '@/components/tab';
import stylesblog from './blog.module.css';
import Blogcard1 from '@/components/shirley/card1';
import Blogcard2 from '@/components/shirley/card2';
import Blogcard3 from '@/components/shirley/card3';

export default function Bolg() {
  // TAB
  const [activeTab, setActiveTab] = useState(0);
  const tabItemss = ['我的文章'];
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
              <div className={stylesblog['article-list-box']}>
                <Blogcard1 />
                <Blogcard2 />
                <Blogcard3 />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </Layout>
    </>
  );
}
