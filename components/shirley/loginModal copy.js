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
import { useRouter } from 'next/router';

export default function LoginModal({ isOpen, closeModal }) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    success: false,
    code: 0,
    error: '',
  });

  // 按下登入按鈕
  const sendData = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    let result = { success: false };

    setErrorMessage({
      success: false,
      code: 0,
      error: '',
    });

    try {
      const response = await fetch(AUTH_LOGIN, {
        method: 'POST',
        body: fd,
        credentials: 'include',
      });

      result = await response.json();
      console.log(
        '這是伺服器回應過來的result',
        JSON.stringify(result, null, 4)
      );

      if (!result.success) {
        // 處理錯誤或顯示錯誤消息
        setErrorMessage((prev) => ({
          ...prev,
          code: result.code,
          error: result.error,
        }));
        // 例如 "帳號或密碼錯誤"
      } else {
        // 請求成功
        router.push('/'); // 例如 "登入成功"
        closeModal();
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  console.log('這是errorMessage狀態：', JSON.stringify(errorMessage, null, 4));

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
            isError={errorMessage.error}
          />
          <InputPsd
            name="password"
            type="password"
            placeholder="密碼"
            value={psw}
            onChange={(e) => setPsw(e.target.value)}
            isError={errorMessage.error}
            errorMessage={errorMessage.error}
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
