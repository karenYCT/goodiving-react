import React, { useState, useEffect } from 'react';
import ButtonFP from '@/components/buttons/btn-fill-primary';
import { FaMapMarkerAlt, FaShareAlt } from 'react-icons/fa';
import { FaHeart, FaRegBookmark } from 'react-icons/fa6';
import styles from './siteintrocard.module.css';
import MiniTag from '../tag/minitag';

export default function SiteIntroCard(props) {
  return (
    <>
      <div className={`${styles['container']}`}>
        
        {/* 放照片的位置 */}
        <div className={`${styles['imgContainer']}`}>
          <img src="/siteimg.JPG" alt="" />
        </div>

        <div className={`${styles['itemContainer']}`}>
          {/* 放文字的位置 */}
          <h5>潛點名稱</h5>
          <div>
            <span className={`${styles['locationContainer']}`}>
              <FaMapMarkerAlt />
              潛點地區
            </span>
            {/* <span>潛點地區</span> */}
          </div>

          <div>
            <span className={`${styles['heartContainer']}`}>
              <span className={`${styles['rating']}`}>
              4.0
              </span> 
              <FaHeart />
            </span>
          </div>
          <div className={`${styles['tagContainer']}`}>
            {/* 這裡會需要下變數如果是船潛就顯示type="boat"... */}
            <MiniTag type="boat" /> 
            <MiniTag type="level">簡單</MiniTag>
          </div>
        </div>

        {/* 放功能的位置 */}
        <div className={`${styles['rightContainer']}`}>
          <div className={`${styles['functionContainer']}`}>
            <FaRegBookmark /> <FaShareAlt />
          </div>

          <div className={`${styles['buttonWrapper']}`}>
            <ButtonFP>介紹</ButtonFP>
          </div>
        </div>
      </div>
    </>
  );
}
