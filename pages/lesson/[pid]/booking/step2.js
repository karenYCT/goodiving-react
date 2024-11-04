import React, { useState, useEffect } from 'react';
import styles from './step2.module.css';
import Layout from '@/components/layouts/layout';
import CheckoutFlow from '@/components/eden/checkout-flow';
import InputComponent from '@/components/inputs/input-component2';
import Card from '@/components/tzu/card-booking';
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa';
import Router from 'next/router';
import Button from '@/components/buttons/btn-icon-right';

export default function Step1() {
  const [isCheck, setIsCheck] = useState(false);
  const [isDiscount, setIsDiscount] = useState(false);

  const handleIsCheck = () => {
    setIsCheck(!isCheck);
  };

  const handleIsDiscount = () => {
    setIsDiscount(!isDiscount);
  };

  const user = {
    id: 1,
    name: '王大明',
    email: 'y9wZt@example.com',
    phone: '0987-654-321',
    points: 150,
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
                <h4>會員資料</h4>
                <div className={styles.memberInfo}>
                  <div className={styles.memberItem}>
                    <h6>會員姓名</h6>
                    <InputComponent disabled inputValue={user.name} />
                  </div>
                  <div className={styles.memberItem}>
                    <h6>電子信箱</h6>
                    <InputComponent inputValue={user.email} />
                  </div>
                  <div className={styles.memberItem}>
                    <h6>手機號碼</h6>
                    <InputComponent inputValue={user.phone} />
                  </div>
                  <div>
                    <h6 style={{ display: 'flex', alignItems: 'center' }}>
                      {isCheck ? (
                        <FaCheckSquare
                          style={{ color: '#023e8a' }}
                          onClick={handleIsCheck}
                          role="presentation"
                        />
                      ) : (
                        <FaRegSquare
                          style={{ color: '#aaa' }}
                          onClick={handleIsCheck}
                          role="presentation"
                        />
                      )}
                      &nbsp; 為本人參加
                    </h6>
                  </div>
                </div>
              </div>
              <div className={styles.section}>
                <h4>課程明細</h4>
                <Card />
              </div>
            </div>
            <div className={styles.sidebar}>
              <div className={styles.payInfo}>
                <h4>付款明細</h4>
                <div className={styles.payItem}>
                  <h6>
                    {isDiscount ? (
                      <FaCheckSquare
                        style={{ color: '#023e8a' }}
                        onClick={handleIsDiscount}
                        role="presentation"
                      />
                    ) : (
                      <FaRegSquare
                        style={{ color: '#aaa' }}
                        onClick={handleIsDiscount}
                        role="presentation"
                      />
                    )}
                    &nbsp;會員點數折抵
                  </h6>
                  <h6>{user.points}&nbsp;點</h6>
                </div>
                <div className={styles.payItem}>
                  <h6>支付金額</h6>
                  <h4>
                    NT$&nbsp;
                    {isDiscount
                      ? Number(lesson.price) - Number(user.points)
                      : lesson.price}
                  </h4>
                </div>
                <div className={styles.payItem}>
                  <h6>訂單完成後回饋點數</h6>
                  <h6>{Math.floor(lesson.price * 0.01)}&nbsp;點</h6>
                </div>
              </div>
              <Button
                onClick={() => {
                  Router.push(`/lesson/${lesson.id}/booking/step2`);
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
