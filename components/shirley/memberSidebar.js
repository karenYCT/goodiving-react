import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/components/layouts/layout.module.css';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';

export default function MemberSidebar(props) {
  const router = useRouter();
  const { auth } = useAuth();

  // 選單列表
  // const memberLists = ["我的帳戶", "會員資料", "點數紀錄", "訂單記錄", "預定課程", "發布文章", "收藏清單", "詢問紀錄"]
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
  // const [currentPath, setCurrentPath] = useState('');

  // useEffect(() => {
  //   setCurrentPath(window.location.pathname);
  // }, []);

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
            {auth.user_full_name} 您好
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
        {/* <li className={`${styles['pd-12']}`}>
          <Link href="/member/">我的帳戶</Link>
        </li>
        <li className={`${styles['pd-12']} ${styles['active']}`}>
          <Link href="/member/modify">會員資料</Link>
        </li>
        <li className={`${styles['pd-12']}`}>
          <Link href="/member/point">點數紀錄</Link>
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
          <Link href="/member/chat">詢問紀錄</Link>
        </li> */}
      </ul>
    </>
  );
}

// className={`${styles['pd-12']} `}
