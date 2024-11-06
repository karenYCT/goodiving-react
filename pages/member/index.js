import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import React, { useState, useEffect } from 'react';
import styles from '@/components/layouts/layout.module.css';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';

export default function Home({ children }) {
  const router = useRouter();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // 新增 isLoading 狀態

  useEffect(() => {
    if (!auth.token) {
      router.push('/');
      confirm('請先登入會員');
    } else {
      setIsLoading(false); // 確認已登入後才顯示內容
    }
  }, [auth.token, router]);

  if (isLoading) return null; // 未完成驗證前，不顯示內容

  // const closeModal = () => setShowLoginModal(false);

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
