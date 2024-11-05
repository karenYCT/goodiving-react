import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/fanny/layout';
import LeftSide from '@/components/fanny/leftSide';
import Tab from '@/components/fanny/tab';
import styles from '@/components/fanny/layout.module.css';
import Navbar from '@/components/layouts/navbar';
import Card from '@/components/fanny/card';
import Search1lg from '@/components/fanny/search-1-lg';
import MemberSidebar from '@/components/fanny/memberSidebar';
import Pagination from '@/components/fanny/pagination';
import Button from '@/components/fanny/btn-fill-primary';

export default function Blog() {
  // Tab選項
  const tabItems = ['最新', '人氣'];
  const [activeTab, setActiveTab] = useState(tabItems[0]); // 預設選擇第一個 tab

  // 假設的文章數據
  const popularPosts = [
    { id: 1, title: '熱門文章1', content: '這是熱門文章1的內容' },
    { id: 2, title: '熱門文章2', content: '這是熱門文章2的內容' },
    { id: 3, title: '熱門文章3', content: '這是熱門文章3的內容' },
  ];

  const newPosts = [
    { id: 1, title: '最新文章1', content: '這是最新文章1的內容' },
    { id: 2, title: '最新文章2', content: '這是最新文章2的內容' },
    { id: 3, title: '最新文章3', content: '這是最新文章3的內容' },
    { id: 3, title: '最新文章3', content: '這是最新文章3的內容' },
    { id: 3, title: '最新文章3', content: '這是最新文章3的內容' },
  ];

  // 資料庫抓所有文章資訊
  

  // 根據當前的 activeTab 渲染卡片
  const renderPosts = () => {
    const posts = activeTab === '人氣' ? popularPosts : newPosts;
    //點擊卡片進入詳細頁
    return posts.map((post) => (
      <Link href={`/blog/${post.id}`} key={post.id}>
        <Card  title={post.title} content={post.content} />
      </Link>
    ));
  };

  return (
    <>
      <Navbar />
      <Search1lg />
      <Layout>
        <LeftSide>
          <MemberSidebar />
          <br />
          <Link href="/blog/postmodal">
            <Button>新增文章</Button>
          </Link>
        </LeftSide>
        <div className={styles.main}>
          <Tab 
            tabItems={tabItems} 
            activeTab={activeTab} 
            onSelect={setActiveTab} // 傳遞切換函數
          />
          <div>
            {renderPosts()} {/* 渲染當前選中的卡片 */}
          </div>
          <Pagination />
        </div>
      </Layout>
    </>
  );
}
