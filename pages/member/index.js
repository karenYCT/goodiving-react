import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import React, { useState, useEffect } from 'react';
import styles from '@/components/layouts/layout.module.css';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';

export default function Home({ children }) {
  const router = useRouter();
  const { auth, openModal, closeModal } = useAuth();

  console.log('到會員中心首頁看一下auth狀態：', JSON.stringify(auth, null, 4));

  useEffect(() => {
    if (!auth.token) {
      router.replace('/');
      openModal;
    }
  }, [auth.token]);

  if (!auth.token) {
    return null;
  }

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
