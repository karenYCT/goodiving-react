import React, { useState } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import styles from '@/components/layouts/layout.module.css';


export default function Point() {
  return (
    <Layout>
      <LeftSide>
        <MemberSidebar />
      </LeftSide>
      <div className={styles.main}>
        <p>123點</p>
        <p>123點</p>
        <p>123點</p>
        <p>123點</p>
        <p>123點</p>
        <p>123點</p>
        <p>123點</p>
        <p>123點</p>

        
      </div>
    </Layout>
  );
}
