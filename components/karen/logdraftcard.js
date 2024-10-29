import React, { useState, useEffect } from 'react';
import styles from './logdraftcard.module.css';
import IconFillLightGreyXL from '../icons/icon-fill-lightgrey-xl';

export default function SiteIntroCard({
  date="",
  locaion_name="",
  site_name="",
}) {
  return (
    <>
      <div className={`${styles['container']}`}>
      <div className={`${styles['section1']}`}>
        
        {/* 放照片的位置 */}
        <div className={`${styles['imgContainer']}`}>
          <img src="/siteimg.JPG" alt="" />
        </div>

        <div className={`${styles['itemContainer']}`}>
          {/* 放文字的位置 */}
          <p>{date}2024-01-01</p>
          <h6>{locaion_name}地區名稱</h6>
          <h6>{site_name}潛點名稱</h6>
        </div>

      </div>

        {/* 放功能的位置 */}
        <div className={`${styles['rightContainer']}`}>
          <div className={`${styles['functionContainer']}`}>
          <IconFillLightGreyXL 
          type="edit"
          onClick={() => console.log("點擊編輯")} />
          <IconFillLightGreyXL 
          type="delete"
          onClick={() => console.log("點擊刪除")} />
          </div>
        </div>
      </div>
    </>
  );
}
