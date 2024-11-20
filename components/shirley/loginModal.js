import React, { useEffect, useState } from 'react';
import Modal from '@/components/shirley/modal';
import styles from './loginModal.module.css';
import Input from '@/components/shirley/input';
import InputPsd from './input-psd';
import ButtonOutline from '@/components/shirley/btn-outline-primary';
import ButtonFillPrimary from '@/components/shirley/btn-fill-primary';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';

export default function LoginModal({ isOpen, closeModal }) {
  // const router = useRouter();
  const { auth, login, errorMessage } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayedSuccessToast, setDisplayedSuccessToast] = useState(false);

  useEffect(() => {
    if (!auth.token && !isOpen) {
      setDisplayedSuccessToast(false);
    }
  }, [auth.token, isOpen]);

  useEffect(() => {
    if (errorMessage.success == true && !displayedSuccessToast) {
      toast.success('登入成功');
      setDisplayedSuccessToast(true);
    }
  }, [errorMessage.success, displayedSuccessToast]);

  if (!isOpen || auth.user_id) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div>
        <button
          className={styles['fast-login']}
          onClick={(e) => {
            login('user2@example.com', 'zz123456');
          }}
        >
          user 2
        </button>
        <h2>會員登入</h2>
        <button
          className={styles['fast-login']}
          onClick={(e) => {
            login('user207@example.com', 'zz123456');
          }}
        >
          user 207
        </button>
      </div>
      {/* <div className={styles['quick-login']}>
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
      </div> */}
      <form name="loginFrom" className={styles['w100']}>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isError={errorMessage.error}
            errorMessage={errorMessage.error}
          />
        </div>
        <div className={styles['btn-box']}>
          <button
            className={styles['fast-login']}
            onClick={(e) => {
              login('user208@example.com', 'zz123456');
            }}
          >
            user 208
          </button>
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
            <ButtonFillPrimary
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                login(email, password);
              }}
            >
              登入
            </ButtonFillPrimary>
            <Link
              href="/member/forgotpsd"
              onClick={closeModal}
              className={styles['text-color-primary']}
            >
              忘記密碼?
            </Link>
          </div>
          <button
            className={styles['fast-login']}
            onClick={(e) => {
              login('user209@example.com', 'zz123456');
            }}
          >
            user 209
          </button>
        </div>
      </form>
    </Modal>
  );
}
