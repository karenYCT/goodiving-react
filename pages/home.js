import React, { useState, useEffect, Fragment } from 'react';
import styles from '../styles/home.module.css';
import Navbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer2';
import LoginModal from '@/components/shirley/loginModal';
import SelectEllipse2Index from '@/components/dropdown/select-ellipse2-index';
import DatePickerIndex from '@/components/dropdown/date-picker-index';
import SelectEllipseIndex from '@/components/dropdown/select-ellipse-index';
import Button from '@/components/buttons/btnlg-icon-right';
import useRouter from 'next/router';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const router = useRouter;

  const pageLesson = () => {
    router.push('/lesson');
  };

  return (
    <div className={styles.page}>
      <Navbar openModal={openModal} />
      <LoginModal isOpen={isOpen} closeModal={closeModal} />
      <div className={styles.homeImgContainer}>
        <img className={styles.homeImg} src="/home-page.jpg" alt="" />
      </div>
      <div className={styles.homeContent}>
        <div className={styles.homeSlogan}>
          <h2>解鎖深海自由</h2>
          <h2>和你一起開啟海下冒險</h2>
          <h3>"The sea, once it casts its spell,</h3>
          <h3>holds one in its net of wonder forever."</h3>
          <h3 style={{ justifyContent: 'flex-end',}}>—Jacques Cousteau</h3>
        </div>
        <div className={styles.homeSearch}>
          <div className={styles.homeDropdown}>
          <SelectEllipse2Index />
          <DatePickerIndex />
          <SelectEllipseIndex />
          </div>
          <Button onClick={pageLesson}>搜尋課程</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
