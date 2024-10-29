import React, { useState, useEffect } from 'react';
import Modal from '@/components/shirley/modal';
import styles from './loginModal.module.css';
import { FaLine } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Input from '@/components/shirley/input';
import ButtonOutline from '@/components/buttons/btn-outline-primary';
import ButtonFillPrimary from '@/components/buttons/btn-fill-primary';
import Link from 'next/link';

export default function LoginModal({ isOpen, closeModal }) {
  // const [isOpen, setIsOpen] = useState(false);

  // const openModal = () => setIsOpen(true);
  // const closeModal = () => router.push('/');

  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');

  if (!isOpen) return null; // 如果關閉狀態則不渲染

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div>
        <h2>會員登入</h2>
      </div>
      <div className={styles['quick-login']}>
        <h5>快速登入</h5>
        <div className={styles['third-btn-box']}>
          <div className={styles['third-btn']}>
            <FaLine className={styles['third-btn-icon']} />
            <p>LINE帳號</p>
          </div>
          <div className={styles['third-btn']}>
            <FcGoogle className={styles['third-btn-icon']} />
            <p>Google帳號</p>
          </div>
        </div>
      </div>
      <div className={styles['input-box']}>
        <Input
          placeholder="帳號"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="密碼"
          value={psw}
          onChange={(e) => setPsw(e.target.value)}
        />
      </div>
      <div className={styles['btn-box']}>
        <Link
          href="/member/register"
          onClick={closeModal}
          className={styles['text-color-primary']}
        >
          <ButtonOutline>註冊</ButtonOutline>
        </Link>

        <div className={styles['btn-right']}>
          <ButtonFillPrimary>登入</ButtonFillPrimary>
          <Link
            href="/member/forgotpsd"
            onClick={closeModal}
            className={styles['text-color-primary']}
          >
            忘記密碼?
          </Link>
        </div>
      </div>
    </Modal>
  );
}
