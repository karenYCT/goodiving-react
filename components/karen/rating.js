import React, { useState, useEffect } from 'react';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import { FaHeart } from 'react-icons/fa6';
import styles from './rating.module.css';


export default function SiteIntroCard({ data = '', onClick = () => {} }) {
  return (
    <div className={`${styles['container']}`}>
      {/* 放照片的位置 */}
      <div className={`${styles['imgContainer']}`}>
        <img src="/siteimg.JPG" alt="{data.name}" />
      </div>
      {/* 放愛心的位置 */}
      <div className={`${styles['ratingContainer']}`}>
        <FaHeart />
        <FaHeart />
        <FaHeart />
        <FaHeart />
        <FaHeart />
      </div>
      {/* 放功能的位置 */}
      <div className={`${styles['btnContainer']}`}>
          <ButtonFP2 onClick={onClick}>發佈</ButtonFP2>
      </div>
    </div>
  );
}
