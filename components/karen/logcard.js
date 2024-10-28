import React, { useState, useEffect } from 'react';
import styles from './logcard.module.css';
import { FaRegCalendar } from 'react-icons/fa';
import MiniTagGlass from '../tag/minitag';
import { FaEllipsisVertical } from "react-icons/fa6";

export default function Logcard({
  onClick = () => {}, 
  date = "", 
  site_name = "", 
  bottom_time = "",    // 潛水時間
  water_temp = "",     // 水溫
  max_depth = "",      // 最大深度
  likes_count = "",    // 喜愛數
  className = "",
  }) {
  return (
    <div 
    className={`${styles['container']}`}
    onClick={() => console.log("點擊卡片666")}
    >
      {/* 圖片的位置 */}
      <div className={`${styles['imgContainer']}`}>
        <div className={`${styles['tagContainer']}`}>
          {/* 這裡會需要下地區的變數 */}
          <MiniTagGlass 
          type="time"
          bottom_time={bottom_time} />
          <FaEllipsisVertical 
            onClick={() => console.log("點擊")}
          />
          
        </div>
        <img src="/siteimg.JPG" alt="" />
      </div>

      {/* 日期的位置 */}
      <div className={`${styles['dateContainer']}`}>
        <div className={`${styles['iconContainer']}`}>
          <FaRegCalendar />
        </div>
        <p>{date}</p>
      </div>
      {/* 潛點名稱的位置 */}
      <h5>{site_name}</h5>
      {/* 日誌標籤的位置 */}
      <div className={`${styles['minitag']}`}>
        <MiniTagGlass type="loves" 
          likes_count={likes_count}
        />
        <MiniTagGlass type="time" 
          bottom_time={bottom_time}
        />
        <MiniTagGlass type="temp" 
          water_temp={water_temp}
        />
        <MiniTagGlass type="depth" 
          max_depth={max_depth}
        />
        
      </div>
    </div>
  );
}
