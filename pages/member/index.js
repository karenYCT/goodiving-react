import React, { useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import styles from '@/components/layouts/layout.module.css';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { auth, openModal } = useAuth();

  //如果沒登入的阻擋
  useEffect(() => {
    if (!auth.token) {
      router.replace('/');
      openModal();
    }
  }, [auth.token, openModal]);

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
        </div>
      </Layout>
    </>
  );
}
