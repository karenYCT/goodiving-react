import React, { useState, useEffect, Fragment } from 'react';
import styles from '../styles/home.module.css';
import Navbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer2';
import SelectContentIndex from '@/components/dropdown/select-content-index';

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.homeImgContainer}>
        <img className={styles.homeImg} src="/home-page.jpg" alt="" />
      </div>
      <div className={styles.homeTitle}>
        <div className={styles.homeSlogan}>
          <h2>解鎖深海自由</h2>
          <h2>和你一起開啟海下冒險</h2>
          <h3>"The sea, once it casts its spell,</h3>
          <h3>holds one in its net of wonder forever."</h3>
          <h3>—Jacques Cousteau</h3>
        </div>
        <div className={styles.homeDropdown}>
          <SelectContentIndex />
          <SelectContentIndex />
          <SelectContentIndex />
        </div>
      </div>
      <Footer />
    </div>
  );
}
