import React, { useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import styles from '@/components/layouts/layout.module.css';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';
import Btnfillprimary from '@/components/shirley/btn-fill-primary';
import styleshome from './home.module.css';
import Logcard from '@/components/karen/logcard';

export default function Home() {
  const router = useRouter();
  const { auth, openModal } = useAuth();

  // 如果沒登入的阻擋
  useEffect(() => {
    if (!auth.token) {
      openModal();
      router.replace('/');
    }
  }, [auth.token, openModal, router]);

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
          <div className={styleshome['top-box']}>
            <Btnfillprimary>一般會員</Btnfillprimary>
            <p className={styleshome['level-notify']}>
              升級至水晶會員12 個月內累積消費額達 NT$3000 即可升級
            </p>
          </div>
          <h3>近期日誌</h3>
          <div className={styleshome['log-box']}>
            <Logcard />
            <Logcard />
          </div>
        </div>
      </Layout>
    </>
  );
}
