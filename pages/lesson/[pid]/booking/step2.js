import React, { useState, useEffect } from 'react';
import styles from './step2.module.css';
import Layout from '@/components/layouts/layout';
import CheckoutFlow from '@/components/tzu/checkout-flow';
import { FaRegCircle, FaRegDotCircle } from 'react-icons/fa';
import { FaCircleExclamation } from 'react-icons/fa6';
import Router from 'next/router';
import Button from '@/components/buttons/btn-icon-right';

export default function Step2() {
  const [isCheck1, setIsCheck1] = useState(false);
  const [isCheck2, setIsCheck2] = useState(false);

  const handleIsCheck1 = () => {
    setIsCheck1(!isCheck1);
    isCheck2 && setIsCheck2(false);
  };

  const handleIsCheck2 = () => {
    setIsCheck2(!isCheck2);
    isCheck1 && setIsCheck1(false);
  };

  const lesson = {
    id: 1,
    dept: 'PADI',
    name: 'Discover Scuba Diving',
    nameTC: '潛水體驗課程(無需證照)',
    category: '課程類別',
    loc: '課程地點',
    coach_id: 2,
    start: '2022-01-01',
    end: '2022-01-03',
    price: 4980,
    quota: 3,
    image_a: '/lesson-1.jpg',
    image_b: '/lesson-2.jpg',
    image_c: '/lesson-3.jpg',
    image_d: '/lesson-4.jpg',
  };

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <CheckoutFlow />
          <div className={styles.main}>
            <div className={styles.info}>
              <div className={styles.section}>
                <h4>付款方式</h4>
                <div className={styles.payWay}>
                  <h6 style={{ display: 'flex', alignItems: 'center' }}>
                    {isCheck1 ? (
                      <FaRegDotCircle
                        style={{ color: '#023e8a' }}
                        onClick={handleIsCheck1}
                        role="presentation"
                      />
                    ) : (
                      <FaRegCircle
                        style={{ color: '#aaa' }}
                        onClick={handleIsCheck1}
                        role="presentation"
                      />
                    )}
                    &nbsp;Line Pay
                  </h6>
                  <h6 style={{ display: 'flex', alignItems: 'center' }}>
                    {isCheck2 ? (
                      <FaRegDotCircle
                        style={{ color: '#023e8a' }}
                        onClick={handleIsCheck2}
                        role="presentation"
                      />
                    ) : (
                      <FaRegCircle
                        style={{ color: '#aaa' }}
                        onClick={handleIsCheck2}
                        role="presentation"
                      />
                    )}
                    &nbsp; 信用卡
                  </h6>
                  <div className={styles.warning}>
                    <p>
                      <FaCircleExclamation />
                      &nbsp; 取消政策
                    </p>
                    <div className={styles.warningItem}>
                      <p>&nbsp; ．開課日期 7 天(含)前取消，可免費取消</p>
                      <p>
                        &nbsp; ．開課日期 4 - 6 天前取消，將收取 20％ 手續費
                      </p>
                      <p>
                        &nbsp; ．開課日期 3 天(含)前取消，將收取全額費用概不退費
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.sidebar}>
              <div className={styles.payInfo}>
                <h4>付款明細</h4>
                <div className={styles.payItem}>
                  <h6>支付金額</h6>
                  <h4 style={{ color: '#023e8a' }}>NT$&nbsp;{lesson.price}</h4>
                </div>
                <div className={styles.payItem}>
                  <h6>訂單完成後回饋點數</h6>
                  <h6>{Math.floor(lesson.price * 0.01)}&nbsp;點</h6>
                </div>
              </div>
              <Button
                onClick={() => {
                  Router.push(`/lesson/${lesson.id}/booking/step3`);
                }}
              >
                前往付款
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
