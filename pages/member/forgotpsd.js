import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import NoSide from '@/components/layouts/noSide';
import Input from '@/components/shirley/input';
import BtnPrimary from '@/components/shirley/btn-fill-primary';
import BtnGray from '@/components/shirley/btn-fill-gray';
import styles from './forgotpsd.module.css';
import {
  AUTH_FORGOT_PASSWORD,
  AUTH_OTP,
  AUTH_SET_NEW_PASSWORD,
} from '@/configs/api-path.js';
import toast from 'react-hot-toast';
import InputPsd from '@/components/shirley/input-psd';
import { z } from 'zod';
import { useRouter } from 'next/router';

export default function Forgotpsd() {
  const router = useRouter();
  const [mobiletoggle, setMobiletoggle] = useState(false);
  const [userInputEmail, setUserInputEmail] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [userInputOTP, setUserInputOTP] = useState('');
  const [errorMessageOTP, setErrorMessageOTP] = useState('');
  const [isOPTCorrect, setIsOPTCorrect] = useState(false);
  const [userId, setUserId] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState({
    password: '',
    checkPassword: '',
    general: '',
  });

  const [newpassword, setNewpassword] = useState({
    password: '',
    checkPassword: '',
  });

  // 寄出 Email
  const sendUserEmail = async (e) => {
    e.preventDefault();

    setErrorMessageEmail('');

    try {
      const response = await fetch(AUTH_FORGOT_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({ user_email: userInputEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const result = await response.json();
      console.log('寄信結果的result', JSON.stringify(result, null, 4));

      if (result.success) {
        toast.success('驗證碼已寄出');

        setUserId(result.optdata.user_id);
        setIsOPTCorrect(false);
        setUserInputOTP('');
      } else {
        setErrorMessageEmail(result.error);
        setUserId('');
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const sendOTP = async (e) => {
    e.preventDefault();

    setErrorMessageOTP('');

    // 送出表單跟處理回應
    try {
      const response = await fetch(AUTH_OTP, {
        method: 'POST',
        body: JSON.stringify({
          user_typing_otp: userInputOTP,
          user_id: userId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const result = await response.json();
      console.log('送出OTP的result', JSON.stringify(result, null, 4));

      if (result.success) {
        toast.success('驗證成功');
        setIsOPTCorrect(true);
      } else {
        setErrorMessageOTP(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onchange = (e) => {
    const obj = { ...newpassword, [e.target.name]: e.target.value };
    setNewpassword(obj);
  };

  const passwordSchema = z.object({
    password: z
      .string()
      .min(8, { message: '密碼須至少8字元，包含英文及數字' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: '密碼須至少8字元，包含英文及數字',
      }),
    checkPassword: z
      .string()
      .min(8, { message: '密碼須至少8字元，包含英文及數字' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: '密碼須至少8字元，包含英文及數字',
      }),
  });

  // 密碼的 onBlur 的資料驗證
  const handlePasswordBlur = (field) => {
    const fieldSchema = passwordSchema.shape[field];
    if (!fieldSchema) {
      return;
    }

    const result = fieldSchema.safeParse(newpassword[field]);
    console.log('ZodError:', result);
    if (field) {
      setErrorMessagePassword((prev) => ({
        ...prev,
        [field]: result.success ? '' : result.error.issues[0].message,
      }));
    }

    // 檢查密碼是否匹配
    if (
      newpassword.password &&
      newpassword.checkPassword &&
      newpassword.password !== newpassword.checkPassword
    ) {
      setErrorMessagePassword((prev) => ({
        ...prev,
        general: '確認密碼與密碼不相符',
      }));
    } else {
      setErrorMessagePassword((prev) => ({
        ...prev,
        general: '',
      }));
    }
  };

  const sendPassword = async (e) => {
    e.preventDefault();

    setErrorMessagePassword({
      password: '',
      checkPassword: '',
      general: '',
    });

    // 送出表單、伺服器回應處理
    try {
      const response = await fetch(AUTH_SET_NEW_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({
          id: userId,
          password: newpassword.password,
          checkPassword: newpassword.checkPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const result = await response.json();
      console.log('送出密碼的 result', JSON.stringify(result, null, 4));

      if (!result.success) {
        setErrorMessagePassword((prev) => ({
          ...prev,
          general: result.error.issues[0].message,
        }));
      }

      if (result.success) {
        toast.success('密碼已更新');
        setTimeout(() => {
          router.replace('/');
        }, 700);
      }

      // if (result.success) {
      //   toast.success('密碼重設成功');
      //   // navigate('/login');
      // } else {
      //
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleresize = () => {
      setMobiletoggle(window.innerWidth < 700);
    };

    window.addEventListener('resize', handleresize);
    return () => {
      window.removeEventListener('resize', handleresize);
    };
  }, []);

  return (
    <Layout>
      <NoSide>
        <h4 className={styles['mb23']}>忘記密碼了嗎？</h4>
        {mobiletoggle ? (
          <>
            <form
              name="forgotPasswordForm"
              onSubmit={(e) => {
                sendUserEmail(e);
              }}
              className={styles['input-content']}
            >
              <div className={styles['input-top']}>
                <span
                  className={
                    userId ? styles['num-gray'] : styles['num-primary']
                  }
                >
                  1
                </span>
                <p className={styles['mb8']}>
                  輸入電子信箱後我們將把認證號碼傳送至您的信箱
                </p>
              </div>
              <div className={styles['w100']}>
                <Input
                  name="user_email"
                  value={userInputEmail}
                  onChange={(e) => {
                    setUserInputEmail(e.target.value);
                  }}
                  isError={errorMessageEmail}
                  errorMessage={errorMessageEmail}
                  onBlur={() => {
                    setErrorMessageEmail('');
                  }}
                />
              </div>
              <div className={styles['mt23']}>
                {userId ? (
                  <>
                    <BtnGray type="submit">送出</BtnGray>
                  </>
                ) : (
                  <>
                    <BtnPrimary type="submit">送出</BtnPrimary>
                  </>
                )}
              </div>
            </form>
            <form
              name="typingOTPForm"
              onSubmit={(e) => {
                sendOTP(e);
              }}
              className={styles['input-content']}
            >
              <div className={styles['input-top']}>
                <span
                  className={
                    userId && !isOPTCorrect
                      ? styles['num-primary']
                      : styles['num-gray']
                  }
                >
                  2
                </span>
                <p className={styles['mb8']}>請輸入認證信上的６位數字</p>
              </div>
              <div className={styles['w100']}>
                <Input
                  name="user_tpying_otp"
                  value={userInputOTP}
                  onChange={(e) => {
                    setUserInputOTP(e.target.value);
                  }}
                  isError={errorMessageOTP}
                  errorMessage={errorMessageOTP}
                  onBlur={() => {
                    setErrorMessageOTP('');
                  }}
                />
              </div>
              <div className={styles['mt23']}>
                {userId && !isOPTCorrect ? (
                  <>
                    <BtnPrimary type="submit">驗證</BtnPrimary>
                  </>
                ) : (
                  <>
                    <BtnGray type="submit">驗證</BtnGray>
                  </>
                )}
              </div>
            </form>
            <form
              name="newPasswordForm"
              onSubmit={(e) => {
                sendPassword(e);
              }}
              className={styles['input-content']}
            >
              <div className={styles['input-top']}>
                <span
                  className={
                    isOPTCorrect ? styles['num-primary'] : styles['num-gray']
                  }
                >
                  3
                </span>
                <p className={styles['mb8']}>請輸入您的新密碼</p>
              </div>
              <div className={styles['w100']}>
                <InputPsd
                  name="password"
                  value={newpassword.password}
                  onChange={onchange}
                  placeholder="至少８字元，須包含英文及數字"
                  isError={errorMessagePassword.general}
                  errorMessage={
                    errorMessagePassword.password ||
                    errorMessagePassword.general
                  }
                  onBlur={() => handlePasswordBlur('password')}
                />
                <InputPsd
                  name="checkPassword"
                  value={newpassword.checkPassword}
                  onChange={onchange}
                  placeholder="請再次輸入密碼"
                  isError={errorMessagePassword.general}
                  errorMessage={
                    errorMessagePassword.checkPassword ||
                    errorMessagePassword.general
                  }
                  onBlur={() => handlePasswordBlur('checkPassword')}
                />
              </div>
              <div className={styles['mt23']}>
                {isOPTCorrect ? (
                  <>
                    <BtnPrimary type="submit">驗證</BtnPrimary>
                  </>
                ) : (
                  <>
                    <BtnGray type="submit">驗證</BtnGray>
                  </>
                )}
              </div>
            </form>
          </>
        ) : (
          <>
            <form
              name="forgotPasswordForm"
              onSubmit={(e) => {
                sendUserEmail(e);
              }}
              className={styles['input-content']}
            >
              <span
                className={userId ? styles['num-gray'] : styles['num-primary']}
              >
                1
              </span>
              <div className={styles['w100']}>
                <p className={styles['mb8']}>
                  輸入電子信箱後我們將把認證號碼傳送至您的信箱
                </p>
                <Input
                  name="user_email"
                  value={userInputEmail}
                  onChange={(e) => {
                    setUserInputEmail(e.target.value);
                  }}
                  isError={errorMessageEmail}
                  errorMessage={errorMessageEmail}
                  onBlur={() => {
                    setErrorMessageEmail('');
                  }}
                />
              </div>
              <div className={styles['mt23']}>
                {userId ? (
                  <>
                    <BtnGray type="submit">送出</BtnGray>
                  </>
                ) : (
                  <>
                    <BtnPrimary type="submit">送出</BtnPrimary>
                  </>
                )}
              </div>
            </form>
            <form
              name="typingOTPForm"
              onSubmit={(e) => {
                sendOTP(e);
              }}
              className={styles['input-content']}
            >
              <span
                className={
                  userId && !isOPTCorrect
                    ? styles['num-primary']
                    : styles['num-gray']
                }
              >
                2
              </span>
              <div className={styles['w100']}>
                <p className={styles['mb8']}>請輸入認證信上的６位數字</p>
                <Input
                  name="user_tpying_otp"
                  value={userInputOTP}
                  onChange={(e) => {
                    setUserInputOTP(e.target.value);
                  }}
                  isError={errorMessageOTP}
                  errorMessage={errorMessageOTP}
                  onBlur={() => {
                    setErrorMessageOTP('');
                  }}
                />
              </div>
              <div className={styles['mt23']}>
                {userId && !isOPTCorrect ? (
                  <>
                    <BtnPrimary type="submit">驗證</BtnPrimary>
                  </>
                ) : (
                  <>
                    <BtnGray type="submit">驗證</BtnGray>
                  </>
                )}
              </div>
            </form>
            <form
              name="newPasswordForm"
              onSubmit={(e) => {
                sendPassword(e);
              }}
              className={styles['input-content2']}
            >
              <span
                className={
                  isOPTCorrect ? styles['num-primary'] : styles['num-gray']
                }
              >
                3
              </span>
              <div className={styles['w100']}>
                <p className={styles['mb8']}>請輸入您的新密碼</p>
                <InputPsd
                  name="password"
                  value={newpassword.password}
                  onChange={onchange}
                  placeholder="請輸入至少８字元，須包含英文及數字"
                  isError={errorMessagePassword.general}
                  errorMessage={
                    errorMessagePassword.password ||
                    errorMessagePassword.general
                  }
                  onBlur={() => handlePasswordBlur('password')}
                />
                {/* <p className={styles['mb8']}>請再輸入一次您的新密碼</p> */}
                <InputPsd
                  name="checkPassword"
                  value={newpassword.checkPassword}
                  onChange={onchange}
                  placeholder="請再次輸入密碼"
                  isError={errorMessagePassword.general}
                  errorMessage={
                    errorMessagePassword.checkPassword ||
                    errorMessagePassword.general
                  }
                  onBlur={() => handlePasswordBlur('checkPassword')}
                />
              </div>
              <div className={`${styles['mt23']}${styles['mb23']}`}>
                {isOPTCorrect ? (
                  <>
                    <BtnPrimary type="submit">驗證</BtnPrimary>
                  </>
                ) : (
                  <>
                    <BtnGray type="submit">驗證</BtnGray>
                  </>
                )}
              </div>
            </form>
          </>
        )}
      </NoSide>
    </Layout>
  );
}
