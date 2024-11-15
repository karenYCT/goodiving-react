import React, { useState, useEffect } from 'react';
import styles from '@/components/fanny/layout.module.css';

export default function LeftSide({ children }) {
  return (
    <>
      <div style={{ height: 'fit-content' }} className={styles['left-side']}>
        {children}
        {/* 在這裡渲染左側的子內容 */}
      </div>
    </>
  );
}
