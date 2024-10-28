import React, { useState, useEffect, Fragment } from 'react';
import styles from '../styles/home.module.css';
import Navbar from '@/components/layouts/navbar';

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <img className={styles.homeImg} src="/home-page.jpg" alt="" />
      <h1>home</h1>
      <div style={{ height: '100vh' }}></div>
    </div>
  );
}
