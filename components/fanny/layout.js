import React, { useState, useEffect } from 'react';
import styles from './layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles['container']}>
      {children} {/* 在這裡渲染 Layout 的子內容 */}
    </div>
  );
}
