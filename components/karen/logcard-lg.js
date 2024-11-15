import React, { useState, useEffect } from 'react';
import styles from './logcard-lg.module.css';
import { FaRegCalendar } from 'react-icons/fa';
import MiniTagGlass from '../tag/minitag';
import TagGlass from '../tag/tag-bg-shadow';
import { FaEllipsisVertical } from 'react-icons/fa6';

export default function Logcard({
  onClick = () => {}, // 預設測試用 handler
  date = '',
  site_name = '',
  log_exp = '',
  bottom_time = '', // 潛水時間
  water_temp = '', // 水溫
  max_depth = '', // 最大深度
  likes_count = '', // 喜愛數
  region = '綠島', //地區
  showOptions = true, // 新增控制選項按鈕顯示的 prop
  className = '',
  children = '',
}) {
  const truncateText = (text, maxLength = 30) => {
    if (!text) {
      return '';
    } else if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  };

  return (
    <div className={styles['container']}>
      {/* 圖片的位置 */}
      <div className={`${styles['imgContainer']}`}>
        <div className={`${styles['tagContainer']}`}>
          {region && <TagGlass>{region}</TagGlass>}

          {showOptions && (
            <FaEllipsisVertical
              onClick={(e) => {
                e.stopPropagation();
                console.log('按鈕點擊');
              }}
            />
          )}
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
      <p>{truncateText(log_exp)}</p>
      {/* 日誌標籤的位置 */}
      <div className={`${styles['minitag']}`}>
        <MiniTagGlass type="loves" likes_count={likes_count} />
        <MiniTagGlass type="time" bottom_time={bottom_time} />
        <MiniTagGlass type="temp" water_temp={water_temp} />
        <MiniTagGlass type="depth" max_depth={max_depth} />
      </div>
    </div>
  );
}
