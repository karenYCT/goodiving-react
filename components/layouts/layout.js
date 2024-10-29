import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import LoginModal from '@/components/shirley/loginModal';
import { useRouter } from 'next/router';
import styles from './layout.module.css';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Navbar openModal={openModal} />
      <LoginModal isOpen={isOpen} closeModal={closeModal} />
      <div className={styles['container']}>
        {children} {/* 渲染主要內容 */}
      </div>
    </>
  );
}
