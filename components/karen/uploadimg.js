import React, { useState, useEffect } from 'react';
import styles from './uploadimg.module.css';
import IconFillPrimaryXL from '../icons/icon-fill-primary-xl';
import Progressbar from '@/components/karen/progressbar';
import { FaToggleOff } from "react-icons/fa6";

export default function UpLoadImg({
  onClick=() => {},
  img_url="",
  img_size="",
  progress=0
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
          <h6>{img_url}</h6>
          <p>{img_size}</p>
          <Progressbar  progress={progress} />
        </div>

      </div>

        {/* 放功能的位置 */}
        <div className={`${styles['rightContainer']}`}>
          <div className={`${styles['functionContainer']}`}>
          <IconFillPrimaryXL 
          type="magicedit"
          onClick={() => console.log("點擊編輯")} />
          <IconFillPrimaryXL
          type="delete"
          onClick={() => console.log("點擊刪除")} />
          </div>
          <div className={`${styles['toggle']}`}>
            <h6>首圖</h6>
            <FaToggleOff />
          </div>
        </div>
      </div>
    </>
  );
}
