import React, { useState, useEffect, Fragment } from 'react';
import styles from '../styles/home.module.css';
import Navbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer2';

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.homeImgContainer}>
      <img className={styles.homeImg} src="/home-page.jpg" alt="" />
      </div>
      <h1>home</h1>
      {/* <div style={{ height: '100vh' }}></div> */}
      <Footer />
    </div>
  );
}
