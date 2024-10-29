import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import NoSide from '@/components/layouts/noSide';
import Input from '@/components/shirley/input';
import BtnPrimary from '@/components/buttons/btn-fill-primary';
import BtnLight from '@/components/buttons/btn-fill-light';
import styles from '@/styles/shirley/forgotpsd.module.css';

export default function Forgotpsd(props) {
  return (
    <Layout>
      <NoSide>
        <h4 className={styles['mb23']}>忘記密碼了嗎？</h4>
        <div className={styles['input-content']}>
          <span className={styles['num']}>1</span>
          <div className={styles['w100']}>
            <p className={styles['mb8']}>輸入電子信箱後我們將把認證號碼傳送至您的信箱</p>
            <Input />
          </div>
          <div className={styles['mt23']} >
            <BtnPrimary>送出</BtnPrimary>
          </div>
        </div>
        <div className={styles['input-content']}>
          <span className={styles['num']}>2</span>
          <div className={styles['w100']}>
            <p className={styles['mb8']}>請輸入您收到的Ｏ字元認證碼</p>
            <Input />
          </div >
          <div className={styles['mt23']} >
          <BtnLight>驗證</BtnLight>
          </div>
        </div>
      </NoSide>
    </Layout>
  );
}
