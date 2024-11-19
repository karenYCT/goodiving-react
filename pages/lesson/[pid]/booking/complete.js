import React, { useState, useEffect } from 'react';
import styles from './complete.module.css';
import Layout from '@/components/layouts/layout';
import CheckoutFlow from '@/components/tzu/checkout-flow';
import { CiCircleCheck } from 'react-icons/ci';
import Card from '@/components/tzu/card-check';
import { useRouter } from 'next/router';
import Button1 from '@/components/buttons/btn-outline-primary';
import Button2 from '@/components/buttons/btn-fill-primary';
import { API_SERVER } from '@/configs/api-path';

export default function Complete() {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);

  // 獲取訂單資料
  useEffect(() => {
    const getOrderData = async () => {
      try {
        // 確保 order_id 存在
        const { order_id } = router.query;
        if (!order_id) return;

        const response = await fetch(`${API_SERVER}/order/${order_id}`, {
          method: 'GET',
          credentials: 'include',
        });

        const result = await response.json();

        if (result.success) {
          setOrderData(result.data);
        } else {
          console.error('Failed to fetch order data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    if (router.isReady) {
      getOrderData();
    }
  }, [router.isReady, router.query]);

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <CheckoutFlow currentStep={3} />
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
