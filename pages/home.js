import React, { useState, useEffect } from 'react';
import styles from '@/styles/home.module.css';
import Navbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer2';
import LoginModal from '@/components/shirley/loginModal';
import SelectEllipse2Index from '@/components/dropdown/select-ellipse2-index';
import DatePickerIndex from '@/components/dropdown/date-picker-index';
import SelectEllipseIndex from '@/components/dropdown/select-ellipse-index';
import Button from '@/components/buttons/btnlg-icon-right';
import useRouter from 'next/router';
import Image from 'next/image';

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
            <div className={styles.homeDropdown}>
              <SelectEllipse2Index />
              <DatePickerIndex />
              <SelectEllipseIndex />
            </div>
            <Button onClick={pageLesson}>搜尋課程</Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
