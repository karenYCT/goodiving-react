import React, { useState } from 'react';
import Modal from '@/components/shirley/modal';
import styles from './loginModal.module.css';
import { FaLine } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Input from '@/components/shirley/input';
import InputPsd from './input-psd';
import ButtonOutline from '@/components/shirley/btn-outline-primary';
import ButtonFillPrimary from '@/components/shirley/btn-fill-primary';
import Link from 'next/link';
import { AUTH_LOGIN } from '@/configs/api-path';

export default function LoginModal({ isOpen, closeModal }) {
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');

  // 按下登入按鈕
  const sendData = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    let result = { success: false };

    try {
      const r = await fetch(AUTH_LOGIN, {
        method: 'POST',
        body: fd,
        credentials: 'include',
      });

      result = await r.json();
      console.log(JSON.stringify(result, null, 4));

      if (!result.success) {
        // 處理錯誤或顯示錯誤消息
        console.log(result.message); // 例如 "帳號或密碼錯誤" 或 "系統錯誤，請稍後再試"
      } else {
        // 請求成功
        console.log(result.message); // 例如 "登入成功"
        // 進一步使用 result.data 中的資料
      }
    } catch (ex) {
      console.log(ex);
    }
  };

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
      <form
        name="loginFrom"
        onSubmit={(event) => {
          sendData(event);
        }}
        className={styles['w100']}
      >
        <div className={styles['input-box']}>
          <Input
            name="email"
            placeholder="帳號"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputPsd
            name="password"
            type="password"
            placeholder="密碼"
            value={psw}
            onChange={(e) => setPsw(e.target.value)}
          />
        </div>
        <div className={styles['btn-box']}>
          <div className={styles['btn-left']}>
            <Link
              href="/member/register"
              onClick={closeModal}
              className={styles['text-color-primary']}
            >
              <ButtonOutline>註冊</ButtonOutline>
            </Link>
          </div>

          <div className={styles['btn-right']}>
            <ButtonFillPrimary type="submit">登入</ButtonFillPrimary>
            <Link
              href="/member/forgotpsd"
              onClick={closeModal}
              className={styles['text-color-primary']}
            >
              忘記密碼?
            </Link>
          </div>
        </div>
      </form>
    </Modal>
  );
}
