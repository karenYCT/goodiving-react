import React, { useState, useEffect } from 'react'
import styles from './layout.module.css';

export default function NoSide({children}) {
  return (
    <>
      <div className={styles['no-side']}>
             {children} {/* 在這裡渲染左側的子內容 */}
      </div>
    </>
  )
}
