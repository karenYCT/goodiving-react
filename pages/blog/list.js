import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/fanny/layout';
import LeftSide from '@/components/fanny/leftSide';
import Tab from '@/components/fanny/tab';
import styles from '@/components/fanny/layout.module.css';
import tabStyles from '@/components/fanny/tab';
import Navbar from '@/components/layouts/navbar';
import Card from '@/components/fanny/card';
import Search1lg from '@/components/fanny/search-1-lg';
import leftSide from '@/components/fanny/leftSide';
import MemberSidebar from '@/components/fanny/memberSidebar';
import Pagination from '@/components/fanny/pagination';
import Button from '@/components/fanny/btn-fill-primary';


export default function Blog() {
  // Tab選項
  const tabItems = ['最新', '人氣'];

  return (
    <>
      <Navbar />
      <Search1lg />
      <Layout>
        <LeftSide>
          <MemberSidebar />
          <Link href="/blog/postmodal">
          <Button>新增文章</Button>
          </Link>
        </LeftSide>
        <div className={styles.main}>
          <Tab tabItems={tabItems} />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Pagination />
        </div>
      </Layout>
    </>
  );
}
