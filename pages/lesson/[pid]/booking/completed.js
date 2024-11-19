import React, { useState, useEffect } from 'react';
import styles from './completed.module.css';
import Layout from '@/components/layouts/layout';
import CheckoutFlow from '@/components/tzu/checkout-flow';
import { CiCircleCheck } from 'react-icons/ci';
import Card from '@/components/tzu/card-check';
import { useRouter } from 'next/router';
import Button1 from '@/components/buttons/btn-outline-primary';
import Button2 from '@/components/buttons/btn-fill-primary';

export default function Completed() {
  const router = useRouter();

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <CheckoutFlow />
          <div className={styles.main}>
            <div className={styles.info}>
              <CiCircleCheck />
              <h4>預訂完成</h4>
            </div>
            <Card />
          </div>
          <div className={styles.buttons}>
            <Button1
              onClick={() => {
                router.push(`/member/booking`);
              }}
            >
              前往課程管理
            </Button1>
            <Button2
              onClick={() => {
                router.push(`/lesson`);
              }}
            >
              預訂其他課程
            </Button2>
          </div>
        </div>
      </Layout>
    </>
  );
}
