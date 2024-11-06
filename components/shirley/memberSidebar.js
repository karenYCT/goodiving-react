import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/components/layouts/layout.module.css';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';
import { API_SERVER, MEMBER_LIST } from '@/configs/api-path';

export default function MemberSidebar(props) {
  const router = useRouter();
  const { auth } = useAuth();
  const [userData, setUserData] = useState({});

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

  const user_id = auth.user_id;
  useEffect(() => {
    if (!user_id) return;
    const findUserData = async () => {
      try {
        const response = await fetch(MEMBER_LIST, {
          method: 'POST',
          body: JSON.stringify({ user_id }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const resulet = await response.json();
        if (resulet) {
          setUserData(resulet);
        }
      } catch (ex) {}
    };
    findUserData();
  }, [user_id]);

  console.log(
    '看一下memberSiderbar回應的result:',
    JSON.stringify(userData, null, 4)
  );
  return (
    <>
      <div className={styles['user-pic']}>
        <div className={styles['avetar-box']}>
          <img
            className={`${styles['avetar-box']} ${styles['avetar-cover']}`}
            src={`${API_SERVER}${userData.profile_picture}`}
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
      </ul>
    </>
  );
}
