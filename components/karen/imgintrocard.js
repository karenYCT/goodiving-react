import React, { useState, useEffect } from 'react';
import styles from './imgintrocard.module.css';
import MiniTagGlass from '../tag/minitag-glass';
import { FaShareAlt } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa6';

export default function Imgintrocard({ data = {} }) {
  return (
    <div className={`${styles['imgContainer']}`}>
      <div className={`${styles['bodyContainer']}`}>
        <div className={`${styles['tagContainer']}`}>
          {/* 這裡會需要下變數如果是船潛就顯示type="boat"... */}
          <MiniTagGlass type={data.method_name === '船潛' ? 'boat' : 'shore'} />
          <MiniTagGlass type="level">{ data.level_name ||'難易度'}</MiniTagGlass>
          <MiniTagGlass type="depth">{ data.max_depth ||'最大深度'}</MiniTagGlass>
        </div>
        <div className={`${styles['textContainer']}`}>
          <div className={`${styles['regionContainer']}`}>
            <div className={`${styles['solid-line']}`}></div>
            <p>
              {data.region_name}
              {data.region_english}
            </p>
          </div>
          <h4>{data.site_name}</h4>
          <div className={`${styles['functionContainer']}`}>
            <FaRegBookmark /> <FaShareAlt />
          </div>
        </div>
      </div>
      <img src="/siteimg.JPG" alt="" />
    </div>
  );
}
