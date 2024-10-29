import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/components/layouts/layout.module.css';

export default function MemberSidebar({ memberLists }) {
  return (
    <>
      <div className={styles['user-pic']}>
        <div className={styles['avetar-box']}>
          <img
            className={`${styles['avetar-box']} ${styles['avetar-cover']}`}
            src="/avetar1.jpg"
            alt=""
          />
        </div>
        <div>
          <p className={`${styles['fs-20']} ${styles['fw-800']}`}>
            王＊明 您好
          </p>
        </div>
      </div>
      <ul className={styles['sidebar-list']}>
        {/* {memberLists.map((memberList, i)=>{
          return (
            <li key={i} className={`${styles['pd-12']} `}>
              <Link href="#">{memberList}</Link>
              </li>
              )
              })} */}
        <li className={`${styles['pd-12']}`}>
          <Link href="#">我的帳戶</Link>
        </li>
        <li className={`${styles['pd-12']} ${styles['active']}`}>
          <Link href="#">會員資料</Link>
        </li>
        <li className={`${styles['pd-12']}`}>
          <Link href="#">點數紀錄</Link>
        </li>
        <li className={`${styles['pd-12']}`}>
          <Link href="#">訂單記錄</Link>
        </li>
        <li className={`${styles['pd-12']}`}>
          <Link href="#">預定課程</Link>
        </li>
        <li className={`${styles['pd-12']}`}>
          <Link href="#">發布文章</Link>
        </li>
        <li className={`${styles['pd-12']}`}>
          <Link href="#">收藏清單</Link>
        </li>
        <li className={`${styles['pd-12']}`}>
          <Link href="#">詢問紀錄</Link>
        </li>
      </ul>
    </>
  );
}
