import React, { useState, useEffect } from 'react';
import Layout from '@/components/fanny/layout';
import LeftSide from '@/components/fanny/leftSide';
import Tab2 from '@/components/fanny/tab2';
import styles from '@/components/fanny/layout.module.css';
import tabStyles from '@/components/fanny/tab';
import Navbar from '@/components/layouts/navbar';
import Card from '@/components/fanny/card';
import Search1lg from '@/components/fanny/search-1-lg';
import leftSide from '@/components/fanny/leftSide';
import MemberSidebar2 from '@/components/fanny/memberSidebar2';
import Pagination from '@/components/fanny/pagination';
import Button from '@/components/fanny/btn-fill-primary';
import Post from '@/components/fanny/post';
import MassageCard from '@/components/fanny/massage-card';
import AddComment from '@/components/fanny/add-comment';
import DeleteCard from '@/components/fanny/delete-card'


export default function Blog() {
  
  // Tab選項
  const tabItems = ['最新', '人氣'];

  return (
    <>
      <Navbar />
      <Search1lg />
      <Layout>
        <LeftSide>
          <MemberSidebar2 />
        </LeftSide>
        <div className={styles.main}>
          <DeleteCard />
          <DeleteCard />
          <DeleteCard />
          <DeleteCard />
          <DeleteCard />
          <DeleteCard />
          <DeleteCard /> 
          <DeleteCard />
          <DeleteCard />
          <Pagination />       
        </div>
      </Layout>
    </>
  );
}
