import React, { useState, useEffect } from 'react';
import styles from './logcard.module.css';
import { FaRegCalendar } from 'react-icons/fa';
import MiniTag from '../tag/minitag';
import TagGlass from '../tag/tag-bg-shadow';
import { FaEllipsisVertical } from 'react-icons/fa6';

export default function Logcard({
  diaryData = null, // 接收完整的日誌數據
  showOptions = true,
  className = '',
  onClick = () => console.log('點擊測試'),
  children = '',
}) {

  // 檢查:接收到的 diaryData
  console.log('LogCard 接收到的 diaryData:', diaryData);

  // 解構diaryData中的數據
  const {
    date = '',
    region = '',
    site_name = '',
    bottom_time = '',
    water_temp = '',
    max_depth = '',
    region_name = '綠島',
    method_name = '',
    images = [],
  } = diaryData || {};

  // 檢查:解構diaryData後的數據
  console.log('LogCard 解構後的數據:', {
    date,
    site_name,
    region_name,
    method_name,
    images
  });

  // 使用 diaryData 中的圖片（如果有的話）
  const mainImage =
    diaryData?.images?.find((img) => img.is_main)?.img_url || '/siteimg.JPG';

  return (
    <div
      className={styles['container']}
      onClick={onClick}
      role="button"
      tabIndex="0"
      onKeyDown
    >
      {/* 圖片的位置 */}
      <div className={`${styles['imgContainer']}`}>
        <div className={`${styles['tagContainer']}`}>
          {region_name && <TagGlass>{region_name}</TagGlass>}

          {showOptions && (
            <FaEllipsisVertical
              onClick={(e) => {
                e.stopPropagation();
                console.log('按鈕點擊');
              }}
            />
          )}
        </div>
        <img src={mainImage} alt={`${site_name}的圖片`} />
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
        <MiniTag type={method_name === '船潛' ? 'boat' : 'shore'} />
        <MiniTag type="time" bottom_time={bottom_time} />
        <MiniTag type="temp" water_temp={water_temp} />
        <MiniTag type="depth" max_depth={max_depth} />
      </div>
    </div>
  );
}
