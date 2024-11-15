import React, { useState, useEffect } from 'react';
import styles from './logdraftcard.module.css';
import IconFillLightGreyXL from '../icons/icon-fill-lightgrey-xl';
import { formatDateForDisplay } from '@/utils/date';
import { API_SERVER } from '@/configs/api-path';

export default function DraftCard({
  draftData = null, // 接收完整的日誌數據
  onDraftEdit = () => {},
  onDraftDelete = () => {},
}) {
  const {
    date,
    region_name,
    site_name,
  } = draftData || {};

  const mainImage = draftData?.images?.find((img) => img.is_main)?.img_url
    ? `${API_SERVER}${draftData.images.find((img) => img.is_main).img_url}`
    : '/siteimg.JPG';

  return (
    <>
      <div className={`${styles['container']}`}>
        <div className={`${styles['section1']}`}>
          {/* 放照片的位置 */}
          <div className={`${styles['imgContainer']}`}>
            <img src={mainImage} alt={`${site_name}的圖片`} />
          </div>

          <div className={`${styles['itemContainer']}`}>
            {/* 放文字的位置 */}
            <p>{formatDateForDisplay(date) || '日期'}</p>
            <h6>{region_name|| '地區名稱'}</h6>
            <h6>{site_name || '潛點名稱'}</h6>
          </div>
        </div>

        {/* 放功能的位置 */}
        <div className={`${styles['rightContainer']}`}>
          <div className={`${styles['functionContainer']}`}>
            <IconFillLightGreyXL type="edit" onClick={onDraftEdit} />
            <IconFillLightGreyXL type="delete" onClick={onDraftDelete} />
          </div>
        </div>
      </div>
    </>
  );
}
