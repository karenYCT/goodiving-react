import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import layoutStyles from '@/components/layouts/layout.module.css';
import styles from './index.module.css';
import Card2 from '@/components/eden/card2';
import CheckoutFlow from '@/components/eden/checkout-flow';

export default function Lesson() {
  return (
    <>
      <div></div>
      <Layout>
        <LeftSide>
          <div className={styles.layout}>
            <h4>排序</h4>
            <h4>篩選</h4>
          </div>
        </LeftSide>
        <div className={layoutStyles.main}>
          <Card2 />
          <CheckoutFlow />
          <h1>Lesson</h1>
          <h1>Lesson</h1>
        </div>
      </Layout>
    </>
  );
}
