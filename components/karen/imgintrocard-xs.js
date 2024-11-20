import React, { useState, useEffect } from 'react';
import styles from './imgintrocard-xs.module.css';
import MiniTagGlass from '../tag/minitag-glass';
import { FaShareAlt } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa6';

export default function Imgintrocard({ data = {}, onClick = () => {} }) {
  // 處理圖片路徑的函數
  const getImageUrl = (imgUrl) => {
    if (!imgUrl) return '/siteimg.JPG';
    // 如果是完整的 URL（例如 http:// 或 https:// 開頭）就直接返回
    if (imgUrl.startsWith('http')) return imgUrl;
    // 否則加上 /divesites/ 前綴
    return `/divesites/${imgUrl}`;
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`${styles['imgContainer']}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className={`${styles['textContainer']}`}>
        <div className={`${styles['regionContainer']}`}>
          <div className={`${styles['solid-line']}`}></div>
          <p>{data.region_english}</p>
        </div>
        <h6>{data.site_name}</h6>
      </div>
      <img
        src={getImageUrl(data.img_url) || '/siteimg.JPG'}
        alt={data.site_name || '潛點圖片'}
      />
    </button>
  );
}
