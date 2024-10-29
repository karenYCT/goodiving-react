import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import Tab from '@/components/fanny/tab';
import React, { useState, useEffect } from 'react';
import styles from '@/components/layouts/layout.module.css';
import tabStyles from '@/components/tab.module.css';
import Navbar from '@/components/fanny/navbar';
import Card from '@/components/card/card.';
import Search1lg from '@/components/fanny/search-1-lg';

export default function Home({ children }) {
  // 選單列表
  const memberLists = [
    '我的帳戶',
    '會員資料',
    '點數紀錄',
    '訂單記錄',
    '預定課程',
    '發布文章',
    '收藏清單',
    '詢問紀錄',
  ];

  // Tab選項
  const tabItems = ['更新個人資訊', '更新密碼'];

  return (
    <>
      <Navbar/>
      <Search1lg/>
      <Layout>
        <LeftSide>
          <MemberSidebar memberLists={memberLists} />
        </LeftSide>
        <div className={styles.main}>
        <Tab tabItems={tabItems} />
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        
        </div>
      </Layout>
    </>
  );
}
