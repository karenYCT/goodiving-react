import React, { useState, useEffect } from 'react';
import styles from '@/styles/home.module.css';
import Navbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer2';
import LoginModal from '@/components/shirley/loginModal';
import SelectEllipse2Index from '@/components/dropdown/select-ellipse2-index';
import DatePickerIndex from '@/components/dropdown/date-picker-index';
import SelectEllipseIndex from '@/components/dropdown/select-ellipse-index';
import Button from '@/components/buttons/btnlg-icon-right';
import SelectEllipse2Indexsm from '@/components/dropdown/select-ellipse2-index-sm';
import DatePickerIndexsm from '@/components/dropdown/date-picker-index-sm';
import SelectEllipseIndexsm from '@/components/dropdown/select-ellipse-index-sm';
import Buttonsm from '@/components/buttons/btn-icon-right';
import Router from 'next/router';
import Image from 'next/image';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocSelected, setIsLocSelected] = useState('');
  const [isDateSelected, setIsDateSelected] = useState('');
  const [isTypeSelected, setIsTypeSelected] = useState('');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const locOptions = ['東北角', '墾丁', '小琉球', '綠島', '蘭嶼'];
  const typeOptions = [
    '體驗課程',
    '旅遊課程',
    '基礎證照課程',
    '進階證照課程',
    '專業證照課程',
  ];

  return (
    <div className={styles.page}>
      <Navbar openModal={openModal} />
      <LoginModal isOpen={isOpen} closeModal={closeModal} />
      <div className={styles.homeImgContainer}>
        <Image
          className={styles.homeImg}
          src="/home-page.jpg"
          alt="home"
          width={1920}
          height={1080}
          sizes="(max-width: 576px) 440px, (max-width: 1024px) 1024px, 1920px"
          priority
        />
        <div className={styles.homeContent}>
          <div className={styles.homeSlogan}>
            <h2>
              解鎖深海自由
              <br />
              和你一起開啟海下冒險
            </h2>
            <div className={styles.homeSloganEN}>
              <h3>&quot;The sea, once it casts its spell,</h3>
              <h3 style={{ width: 'fit-content' }}>
                holds one in its net of wonder forever.&quot;
              </h3>
              <h3 style={{ textAlign: 'right' }}>—Jacques Cousteau</h3>
            </div>
          </div>
          <div className={styles.homeSearch}>
            <div className={styles.desktopOnly}>
              <div className={styles.homeDropdown}>
                <SelectEllipse2Index
                  options={locOptions}
                  onChange={setIsLocSelected}
                  option={isLocSelected}
                />
                <DatePickerIndex
                  selectedDate={isDateSelected}
                  setSelectedDate={setIsDateSelected}
                />
                <SelectEllipseIndex
                  options={typeOptions}
                  onChange={setIsTypeSelected}
                  option={isTypeSelected}
                />
              </div>
              <Button
                onClick={() => {
                  Router.push('/lesson');
                }}
              >
                搜尋課程
              </Button>
            </div>
            <div className={styles.mobileOnly}>
              <div className={styles.homeDropdown}>
                <SelectEllipse2Indexsm
                  options={locOptions}
                  onChange={setIsLocSelected}
                  option={isLocSelected}
                />
                <DatePickerIndexsm
                  selectedDate={isDateSelected}
                  setSelectedDate={setIsDateSelected}
                />
                <SelectEllipseIndexsm
                  options={typeOptions}
                  onChange={setIsTypeSelected}
                  option={isTypeSelected}
                />
              </div>
              <Buttonsm
                onClick={() => {
                  Router.push('/lesson');
                }}
              >
                搜尋課程
              </Buttonsm>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
