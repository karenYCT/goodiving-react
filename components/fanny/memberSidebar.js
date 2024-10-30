import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/components/layouts/layout.module.css';

export default function MemberSidebar({ memberLists }) {
  return (
    <>
      <div className={styles['user-pic']}>
        <div className={styles['avetar-box']}>
        </div>
        <div>
          <p className={`${styles['fs-20']} ${styles['fw-800']}`}>
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
          <Link href="#">討論區規則</Link>
        </li>
        <li className={`${styles['pd-12']} ${styles['active']}`}>
          <Link href="#">全部</Link>
        </li>
        
        <li className={`${styles['pd-12']}`}>
          <Link href="#">教練</Link>
        </li>
        <li className={`${styles['pd-12']}`}>
          <Link href="#">氣瓶</Link>
        </li>
        <li className={`${styles['pd-12']}`}>
          <Link href="#">裝備</Link>
        </li>
        <li className={`${styles['pd-12']}`}>
          <Link href="#">課程 </Link>
        </li>
        <li className={`${styles['pd-12']}`}>
          <Link href="#">潛點</Link>
        </li>
      </ul>
    </>
  );
}
