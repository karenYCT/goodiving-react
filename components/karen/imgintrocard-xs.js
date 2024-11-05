import React, { useState, useEffect } from 'react';
import styles from './imgintrocard-xs.module.css';
import MiniTagGlass from '../tag/minitag-glass';
import { FaShareAlt } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa6';

export default function Imgintrocard({data = {}}) {
  return (
    <div className={`${styles['imgContainer']}`}>
      <div className={`${styles['textContainer']}`}>
        <div className={`${styles['regionContainer']}`}>
          <div className={`${styles['solid-line']}`}></div>
          <p>{data.region_english}</p>
        </div>
        <h6>{data.site_name}</h6>
      </div>
      <img src="/siteimg.JPG" alt="" />
    </div>
  );
}
