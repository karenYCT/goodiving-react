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

export default function Register(props) {
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');

  const options = [
    { label: '男生', value: 'man' },
    { label: '女生', value: 'woman' },
  ];
  const [selectedRadio, setSelectedRadio] = useState('預設值(選value)');
  const handleRadioChange = (value) => {
    setSelectedRadio(value);
  };

  const [selectedDate, setSelectedDate] = useState('');

  return (
    <Layout>
      <NoSide>
        <h4>輸入會員資料</h4>
        <form className={styles['w100]']} name="registerFrom">
          <div className={styles['input-content']}>
            <div className={styles['input-box']}>
              <label htmlFor="email" className={styles['input-label']}>
                <span>電子信箱</span>
              </label>
              <Input
                name="email"
                placeholder="請輸入您的電子信箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles['input-box']}>
              <label htmlFor="name" className={styles['input-label']}>
                <span>姓名</span>
              </label>
              <Input
                name="name"
                placeholder="請輸入姓名"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles['input-box']}>
              <label htmlFor="password" className={styles['input-label']}>
                <span>密碼</span>
              </label>
              <InputPsd
                name="password"
                type="password"
                placeholder="請輸入6-12個字元包含英文字母與數字混合之密碼"
                value={psw}
                onChange={(e) => setPsw(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles['input-box']}>
              <label htmlFor="birthday" className={styles['input-label2']}>
                <span>生日</span>
              </label>
              <div className={styles['date-picker-box']}>
                <DatePicker
                  name="birthday"
                  value={selectedDate}
                  onChange={setSelectedDate}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  selectedRadio={selectedRadio}
                  onChange={handleRadioChange}
                />
              </div>
            </div>
          </div>
          <div className={styles['btn-box']}>
            <BtnLight>重新填寫</BtnLight>
            <BtnPrimary>確定送出</BtnPrimary>
          </div>
        </form>
      </NoSide>
    </Layout>
  );
}
