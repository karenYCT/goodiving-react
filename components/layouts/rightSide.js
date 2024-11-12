import React from 'react';
import styles from './layout.module.css';

export default function RightSide({ children }) {
  return (
    <>
      <div className={styles['right-side']}>
        {children} {/* 在這裡渲染左側的子內容 */}
      </div>
    </>
  );
}
