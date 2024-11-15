import React, { useState, useEffect } from 'react';
import styles from './layout.module.css';
import LoginModal from '@/components/shirley/loginModal';
import { useAuth } from '@/context/auth-context';
import Navbar from '@/components/layouts/navbar';

export default function Layout({ children }) {
  const { openModal, isOpen, closeModal } = useAuth();

  return (
    <>
      <Navbar openModal={openModal} />
      <LoginModal isOpen={isOpen} closeModal={closeModal} />
      <div className={styles['container']}>
        {children} {/* 在這裡渲染 Layout 的子內容 */}
      </div>
    </>
  );
}
