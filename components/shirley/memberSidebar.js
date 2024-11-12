import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/components/layouts/layout.module.css';
import { useRouter } from 'next/router';
import { UPLOAD_FILE } from '@/configs/api-path';
import { useUser } from '@/context/user-context';
import Image from 'next/image';
import UploadAvatarForm from '@/components/shirley/uploadAvatarForm';
import { FaRegPenToSquare } from 'react-icons/fa6';

export default function MemberSidebar() {
  const router = useRouter();
  const { userData } = useUser();

  // 設定修改圖片的Modal
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const openModal = () => setIsAvatarModalOpen(true);
  const closeModal = () => setIsAvatarModalOpen(false);

  // console.log('照片的路徑:', `${API_SERVER}/${userData.profile_picture}`);

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

  return (
    <>
      <div className={styles['user-pic']}>
        <div className={styles['avetar-box']}>
          <Image
<<<<<<< HEAD
            className={`${styles['avetar-cover']}`}
            src={`${UPLOAD_FILE}${userData.profile_picture}`}
=======
            className={`${styles['avetar-box']} ${styles['avetar-cover']}`}
            src={`${API_SERVER}${userData.profile_picture}`}
>>>>>>> tzu
            alt=""
            width={175}
            height={175}
          />
          <FaRegPenToSquare onClick={openModal} className={styles['icon']} />
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

      <UploadAvatarForm
        isAvatarModalOpen={isAvatarModalOpen}
        closeModal={closeModal}
      />
    </>
  );
}
