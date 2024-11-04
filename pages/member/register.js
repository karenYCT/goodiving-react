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
import {AUTH_REGISTER} from '@/configs/api-path'

export default function Register(props) {
  const [myForm, setMyForm] = useState({
    email: '',
    name: '',
    password: '',
    checkpassword: '',
    birthday: null,
    phone: '',
    sex: '',
  });

  const onchange = (e) => {
    const obj = { ...myForm, [e.target.name]: e.target.value };
    console.log("看一下目前myForm狀態(obj物件)："+JSON.stringify(obj, null, 2))
    setMyForm(obj);
  };
  const handleRadioChange = (value) => {
    setMyForm(() => {
      return { ...myForm, sex: value };
    });
  };
  // const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (value) => {
    setMyForm(() => {
      return { ...myForm, birthday: value };
    });
  };

  const options = [
    { label: '男生', value: '1' },
    { label: '女生', value: '2' },
  ];

  // 按下「確定送出」按鈕
  const sendData = async (e) => {
    e.preventDefault();

    console.log('檢查輸出的表單狀態(myFrom):'+JSON.stringify(myForm, null, 2)) // 檢查輸出的表單資料


    // 資料驗證
    const registerSchema = z.object({
      email: z
        .string()
        .email({ message: '請輸入正確的Email格式' })
        .min(1, { message: 'Email 為必填欄位' }),
      name: z.string().min(2, { message: '請輸入正確的姓名' }),
      password: z
        .string()
        .min(8, { message: '密碼至少需有 8 個字元' })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
          message: '密碼須包含英文及數字',
        }),
      phone: z
        .string()
        .regex(/^09\d{2}-?\d{3}-?\d{3}$/, { message: '請輸入正確的手機號碼' }),
      sex:  z.string().min(1, { message: "請選擇性別" } )
    });

    const zodresult = registerSchema.safeParse(myForm);
    console.log('看一下zod檢查結果:',JSON.stringify(zodresult, null, 2));

    try {
      const r = await fetch(AUTH_REGISTER, {
        method: 'POST',
        body: JSON.stringify(myForm),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      const result = await r.json();
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
