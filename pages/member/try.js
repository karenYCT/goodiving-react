import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import styles from '@/components/layouts/layout.module.css';
import RightSide from '@/components/layouts/rightSide';
import MemberSidebar from '@/components/shirley/memberSidebar'


export default function Try(props) {
  return (
    <>
      <Layout>
        <div className={styles.main}></div>
        <RightSide>
          <MemberSidebar />
        </RightSide>
      </Layout>
    </>
  );
}
