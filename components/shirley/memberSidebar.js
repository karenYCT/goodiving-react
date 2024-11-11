import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/components/layouts/layout.module.css';
import { useRouter } from 'next/router';
import { API_SERVER } from '@/configs/api-path';
import { useUser } from '@/context/user-context';
import Image from 'next/image';

export default function MemberSidebar(props) {
  const router = useRouter();
  const { userData } = useUser();

  // 選單列表
  const memberLists = [
    { label: '我的帳戶', href: '/member' },
    { label: '會員資料', href: '/member/modify' },
    { label: '點數紀錄', href: '/member/point' },
    { label: '訂單記錄', href: '#' },
    { label: '預定課程', href: '#' },
    { label: '發布文章', href: '#' },
    { label: '收藏清單', href: '#' },
    { label: '詢問紀錄', href: '/member/chat' },
  ];

  // console.log(
  //   '看一下memberSiderbar回應的result:',
  //   JSON.stringify(userData, null, 4)
  // );
  return (
    <>
      <div className={styles['user-pic']}>
        <div className={styles['avetar-box']}>
          <Image
            className={`${styles['avetar-box']} ${styles['avetar-cover']}`}
            src={`${API_SERVER}${userData.profile_picture}`}
            alt=""
            width={175}
            height={175}
          />
        </div>
        <div>
          <p className={`${styles['fs-20']} ${styles['fw-800']}`}>
            {userData.user_full_name} 您好
          </p>
        </div>
      </div>
      <ul className={styles['sidebar-list']}>
        {memberLists.map((memberList, i) => {
          return (
            <li
              key={i}
              className={
                router.pathname === memberList.href
                  ? `${styles['pd-12']} ${styles['active']}`
                  : styles['pd-12']
              }
            >
              <Link href={memberList.href}>{memberList.label}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
