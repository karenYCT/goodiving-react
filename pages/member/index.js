import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import React, { useState, useEffect } from 'react';
import styles from '@/components/layouts/layout.module.css';


export default function Home({ children }) {
  console.log('server render');

  return (
    <>
      <Layout>
        <LeftSide>
          <MemberSidebar />
        </LeftSide>
        <div className={styles.main}>
          <h1>會員中心</h1>
          <p></p>
        </div>
      </Layout>
    </>
  );
}
