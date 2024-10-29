import React, { useState, useEffect } from 'react'
import styles from './progressbar.module.css'

export default function Progressbar({ progress = 0 }) {

  // 確保進度值在 0-100 之間
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
      <div className={`${styles['container']}`}>
        <div className={`${styles['outer']}`}>
          <div 
          className={`${styles['inner']}`}
          style={{ width: `${normalizedProgress}%` }}
          >
            <div 
            className={`${styles['text']}`}>
            {Math.round(normalizedProgress)}%
            </div>
          </div>
        </div>
      </div>
  )
}
