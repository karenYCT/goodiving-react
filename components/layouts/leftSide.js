import React, { useState, useEffect } from 'react'
import styles from './layout.module.css';

export default function LeftSide({children}) {
  return (
    <>
        <div className={styles['left-side']}>
             {children} {/* 在這裡渲染左側的子內容 */}
        </div>

    </>
  )
}