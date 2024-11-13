import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import styles from '@/components/layouts/layout.module.css';
import Tab from '@/components/tab';
import CardList from '@/components/tzu/card-list';
import stylesfavorite from './favorite.module.css';

export default function Favorite(props) {
  // TAB
  const [activeTab, setActiveTab] = useState(0);
  const tabItemss = ['收藏課程', '收藏商品'];
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
              <div className={stylesfavorite['card-favorite']}>
                <CardList />
                <CardList />
                <CardList />
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
