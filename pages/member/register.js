import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import NoSide from '@/components/layouts/noSide';
import Input from '@/components/shirley/input';
import InputPsd from '@/components/shirley/input-psd';
import styles from './register.module.css';
import DatePicker from '@/components/shirley/date-picker';
import InputRadio from '@/components/inputs/input-radio';
import BtnPrimary from '@/components/shirley/btn-fill-primary';
import BtnLight from '@/components/shirley/btn-fill-light';
import { z } from 'zod';
import { AUTH_REGISTER } from '@/configs/api-path';

export default function Register() {
  const [myForm, setMyForm] = useState({
    email: '',
    name: '',
    password: '',
    checkpassword: '',
    birthday: null,
    phone: '',
    sex: '',
  });

  const [errorMessage, setErrorMessage] = useState({
    email: '',
    name: '',
    password: '',
    checkpassword: '',
    birthday: '',
    phone: '',
    sex: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onchange = (e) => {
    const obj = { ...myForm, [e.target.name]: e.target.value };
    // console.log('看一下目前myForm狀態(obj物件)：' + JSON.stringify(obj, null, 2));
    setMyForm(obj);
  };

  const handleBlur = (field) => {
    const fieldSchema = registerSchema.shape[field];

    if (!fieldSchema) {
      return;
    }

    const result = fieldSchema.safeParse(myForm[field]);

    // 密碼和確認密碼比對檢查
    // if ((field !== 'password') || (field === 'checkpassword')) {
    //   if (myForm.password && myForm.checkpassword && myForm.password !== myForm.checkpassword) {
    //     setErrorMessage((prev) => ({
    //       ...prev,
    //       password: '確認密碼與密碼不相符',
    //       checkpassword: '確認密碼與密碼不相符',
    //     }));
    //     // return;
    //   } 
    //   else {
    //     setErrorMessage((prev) => ({
    //       ...prev,
    //       password: '',
    //       checkpassword: '',
    //     }));
    //   }
    // }

    if (field) {
      setErrorMessage((prev) => ({
        ...prev,
        [field]: result.success ? '' : result.error.issues[0].message,
      }));
    }
  };

  const handleRadioChange = (value) => {
    setMyForm(() => {
      return { ...myForm, sex: value };
    });
  };

  const handleDateChange = (value) => {
    setMyForm(() => {
      return { ...myForm, birthday: value };
    });
  };

  const options = [
    { label: '男生', value: '1' },
    { label: '女生', value: '2' },
  ];

  // ZOD 資料驗證的 Schema
  const registerSchema = z.object({
    email: z
      .string()
      .email({ message: '請輸入正確的Email格式' })
      .min(1, { message: 'Email 為必填欄位' }),
    name: z
      .string()
      .min(2, { message: '請輸入正確的中文姓名' })
      .regex(/^[\u4e00-\u9fa5]+$/, { message: '請輸入正確的中文姓名' }),
    password: z
      .string()
      .min(8, { message: '密碼須至少8字元，包含英文及數字' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: '密碼須至少8字元，包含英文及數字',
      }),
    checkpassword: z
      .string()
      .min(8, { message: '密碼須至少8字元，包含英文及數字' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: '密碼須至少8字元，包含英文及數字',
      }),
    phone: z.string().regex(/^09\d{2}-?\d{3}-?\d{3}$/, {
      message: '前端請輸入正確的手機格式',
    }),
    sex: z.string().min(1, { message: '請選擇性別' }),
    birthday: z.date({
      required_error: '生日為必填欄位',
      invalid_type_error: '請輸入有效的日期格式',
    }),
  });

  useEffect(() => {
    if (!isSubmitting) return;

    const fromData = {
      ...myForm,
      birthday: myForm.birthday || '',
    };

    // 執行 zod 檢查
    const zodresult = registerSchema.safeParse(fromData);
    // console.log('看一下zod檢查結果:', JSON.stringify(zodresult, null, 2));
    let newErrorMessage = { ...errorMessage };

    // 錯誤訊息設定: zod的訊息
    if (!zodresult.success) {
      const errs = zodresult.error.issues;
      errs.forEach((err) => {
        if (err) {
          const path = err.path[0];
          const zodErrorMessage = err.message;
          newErrorMessage[path] = zodErrorMessage;
        }
      });
    }
    // 錯誤訊息設定: 比對密碼是否樣
    if (myForm.password !== myForm.checkpassword) {
      newErrorMessage['checkpassword'] = '確認密碼與密碼不相符';
      newErrorMessage['password'] = '確認密碼與密碼不相符';
    }

    setErrorMessage(newErrorMessage);
    // console.log('newErrorMessage:', JSON.stringify(newErrorMessage, null, 4));
    setIsSubmitting(false);
  }, [isSubmitting]);

  // 按下「確定送出」按鈕
  const sendData = async (e) => {
    e.preventDefault();

    // 清空錯誤訊息並設置提交狀態
    setErrorMessage({
      email: '',
      name: '',
      password: '',
      checkpassword: '',
      birthday: '',
      phone: '',
      sex: '',
    });
    setIsSubmitting(true);

    try {
      const response = await fetch(AUTH_REGISTER, {
        method: 'POST',
        body: JSON.stringify(myForm),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const result = await response.json();
      console.log(JSON.stringify(result, null, 4));
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Layout>
      <NoSide>
        <h4>輸入會員資料</h4>
        <form
          name="registerFrom"
          onSubmit={(e) => {
            sendData(e);
          }}
        >
          <div className={styles['input-content']}>
            <div className={styles['input-box']}>
              <label htmlFor="email" className={styles['input-label']}>
                <span>電子信箱</span>
              </label>
              <Input
                name="email"
                placeholder="請輸入您的電子信箱地址"
                value={myForm.email}
                onChange={onchange}
                isError={errorMessage.email}
                errorMessage={errorMessage.email}
                onBlur={() => handleBlur('email')}
              />
            </div>
            <div className={styles['input-box']}>
              <label htmlFor="name" className={styles['input-label']}>
                <span>姓名</span>
              </label>
              <Input
                name="name"
                placeholder="請輸入姓名"
                value={myForm.name}
                onChange={onchange}
                isError={errorMessage.name}
                errorMessage={errorMessage.name}
                onBlur={() => handleBlur('name')}
              />
            </div>
            <div className={styles['input-box']}>
              <label htmlFor="password" className={styles['input-label']}>
                <span>密碼</span>
              </label>
              <InputPsd
                name="password"
                type="password"
                placeholder="請輸入至少8字元，需包含英文字母及數字"
                value={myForm.password}
                onChange={onchange}
                isError={errorMessage.password}
                errorMessage={errorMessage.password}
                onBlur={() => handleBlur('password')}
              />
            </div>
            <div className={styles['input-box']}>
              <label htmlFor="checkpassword" className={styles['input-label']}>
                <span>確認密碼</span>
              </label>
              <InputPsd
                name="checkpassword"
                type="password"
                placeholder="請再次輸入密碼"
                value={myForm.checkpassword}
                onChange={onchange}
                isError={errorMessage.password}
                errorMessage={errorMessage.password}
                onBlur={() => handleBlur('checkpassword')}
              />
            </div>
            <div className={styles['input-box']}>
              <label htmlFor="birthday" className={styles['input-label2']}>
                <span>生日</span>
              </label>
              <div className={styles['date-picker-box']}>
                <DatePicker
                  name="birthday"
                  value={myForm.birthday}
                  onChange={handleDateChange}
                  isError={!!errorMessage.birthday}
                  errorMessage={errorMessage.birthday}
                  onBlur={() => handleBlur('birthday')}
                />
              </div>
            </div>
            <div className={styles['input-box']}>
              <label htmlFor="phone" className={styles['input-label']}>
                <span>手機號碼</span>
              </label>
              <Input
                name="phone"
                placeholder="請輸入09開頭的10碼數字"
                value={myForm.phone}
                onChange={onchange}
                isError={errorMessage.phone}
                errorMessage={errorMessage.phone}
                onBlur={() => handleBlur('phone')}
              />
            </div>
            <div className={styles['input-box']}>
              <label htmlFor="sex" className={styles['input-label']}>
                <span>性別</span>
              </label>
              <div className={styles['radio-box']}>
                <InputRadio
                  name="sex"
                  options={options}
                  selectedRadio={myForm.sex}
                  onChange={handleRadioChange}
                  isError={errorMessage.sex}
                  errorMessage={errorMessage.sex}
                  onBlur={() => handleBlur('phone')}
                />
              </div>
            </div>
          </div>
          <div className={styles['btn-box']}>
            <BtnLight>重新填寫</BtnLight>
            <BtnPrimary type="submit">確定送出</BtnPrimary>
          </div>
        </form>
      </NoSide>
    </Layout>
  );
}
