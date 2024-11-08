import React from 'react';
import Navbar from './navbar';
import LoginModal from '@/components/shirley/loginModal';
import styles from './layout.module.css';
import { useAuth } from '@/context/auth-context';

export default function Layout({ children }) {
  const { openModal, isOpen, closeModal } = useAuth();

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
