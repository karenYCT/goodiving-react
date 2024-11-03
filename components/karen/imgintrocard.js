import React, { useState, useEffect } from 'react';
import styles from './imgintrocard.module.css';
import MiniTagGlass from '../tag/minitag-glass';
import { FaShareAlt } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa6';

export default function Imgintrocard({ region_name, site_name }) {
  return (
    <div className={`${styles['imgContainer']}`}>
      <div className={`${styles['bodyContainer']}`}>
        <div className={`${styles['tagContainer']}`}>
          {/* 這裡會需要下變數如果是船潛就顯示type="boat"... */}
          <MiniTagGlass type="boat" />
          <MiniTagGlass type="level">簡單</MiniTagGlass>
          <MiniTagGlass type="depth">20</MiniTagGlass>
        </div>
        <div className={`${styles['textContainer']}`}>
          <div className={`${styles['regionContainer']}`}>
            <div className={`${styles['solid-line']}`}></div>
            <p>{region_name}綠島GREEN ISLAND</p>
          </div>
          <h4>{site_name}鋼鐵礁</h4>
          <div className={`${styles['functionContainer']}`}>
            <FaRegBookmark /> <FaShareAlt />
          </div>
        </div>
      </div>
      <img src="/siteimg.JPG" alt="" />
    </div>
  );
}
