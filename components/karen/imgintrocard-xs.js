import React, { useState, useEffect } from 'react';
import styles from './imgintrocard-xs.module.css';
import MiniTagGlass from '../tag/minitag-glass';
import { FaShareAlt } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa6';

export default function Imgintrocard({ 
  location_english="", 
  site_name="" 
}) {
  return (
    <div className={`${styles['imgContainer']}`}>
        <div className={`${styles['textContainer']}`}>
          <div className={`${styles['locationContainer']}`}>
            <div className={`${styles['solid-line']}`}></div>
            <p>{location_english}NORTHEAST COAST</p>
          </div>
          <h6>{site_name}鋼鐵礁</h6>
        </div>
      <img src="/siteimg.JPG" alt="" />
    </div>
  );
}
