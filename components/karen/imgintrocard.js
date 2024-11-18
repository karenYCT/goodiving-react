import React, { useState, useEffect } from 'react';
import styles from './imgintrocard.module.css';
import MiniTagGlass from '../tag/minitag-glass';
import { FaShareAlt } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa6';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function Imgintrocard({ data = {} }) {
  const router = useRouter();
  // 處理圖片路徑的函數
  const getImageUrl = (imgUrl) => {
    if (!imgUrl) return '/siteimg.JPG';
    // 如果是完整的 URL（例如 http:// 或 https:// 開頭）就直接返回
    if (imgUrl.startsWith('http')) return imgUrl;
    // 否則加上 /divesites/ 前綴
    return `/divesites/${imgUrl}`;
  };

  // 獲取主圖 URL
  const getMainImageUrl = () => {
    // 如果有 images 陣列，先找主圖
    if (data.images && Array.isArray(data.images) && data.images.length > 0) {
      const mainImage = data.images.find(img => img.img_main === 1) || data.images[0];
      if (mainImage && mainImage.img_url) {
        return getImageUrl(mainImage.img_url);
      }
    }
    
    // 如果沒有 images 陣列，使用 img_url
    if (data.img_url) {
      return getImageUrl(data.img_url);
    }

    // 都沒有就用預設圖
    return '/siteimg.JPG';
  };
  //windows
  // const handleShare = async () => {
  //   const currentUrl = `${window.location.origin}/divesite?siteId=${data.site_id}`;
    
  //   try {
  //     if (navigator.share) {
  //       // Use Web Share API if available
  //       await navigator.share({
  //         title: `${data.region_name} | ${data.site_name}`,
  //         text: `探索這個潛點: ${data.site_name}`,
  //         url: currentUrl
  //       });
  //     } else {
  //       // Fallback to clipboard copy
  //       await navigator.clipboard.writeText(currentUrl);
  //       // You might want to add a toast notification here
  //       alert('網址已複製到剪貼簿');
  //     }
  //   } catch (error) {
  //     console.error('分享失敗:', error);
  //   }
  // };
  //跨平台
  // const handleShare = async () => {
  //   const currentUrl = `${window.location.origin}/divesite?siteId=${data.site_id}`;
  //   const shareData = {
  //     title: `${data.region_name} | ${data.site_name}`,
  //     text: `探索這個潛點：${data.site_name}`,
  //     url: currentUrl
  //   };
    
  //   try {
  //     // 檢查是否支援原生分享
  //     if (navigator.canShare && navigator.canShare(shareData)) {
  //       // 使用原生分享功能
  //       await navigator.share(shareData);
  //     } else {
  //       // 複製到剪貼簿
  //       await navigator.clipboard.writeText(currentUrl);
  //       alert('網址已複製到剪貼簿');
  //     }
  //   } catch (error) {
  //     if (error.name === 'AbortError') {
  //       console.log('使用者取消分享');
  //       return;
  //     }
  //     console.error('分享失敗:', error);
  //     await navigator.clipboard.writeText(currentUrl);
  //     alert('網址已複製到剪貼簿');
  //   }
  // };
  //apple
  const handleShare = async () => {
    const currentUrl = `${window.location.origin}/divesite?siteId=${data.site_id}`;
    
    try {
      // 在移動設備上使用 Web Share API
      if (navigator.share && !(/Macintosh/.test(navigator.userAgent))) {
        await navigator.share({
          title: `${data.region_name} | ${data.site_name}`,
          text: `探索這個潛點：${data.site_name}`,
          url: currentUrl
        });
      } else {
        // 在 Mac 和其他不支援的設備上直接複製
        await navigator.clipboard.writeText(currentUrl);
        toast.success('網址已複製到剪貼簿');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('使用者取消分享');
        return;
      }
      console.error('分享失敗:', error);
      toast.error('分享功能暫時無法使用，請稍後再試');
    }
  };

  return (
    <div className={`${styles['imgContainer']}`}>
      <div className={`${styles['bodyContainer']}`}>
        <div className={`${styles['tagContainer']}`}>
          {/* 這裡會需要下變數如果是船潛就顯示type="boat"... */}
          <MiniTagGlass type={data.method_name === '船潛' ? 'boat' : 'shore'} />
          <MiniTagGlass type="level">
            {data.level_name || '難易度'}
          </MiniTagGlass>
          <MiniTagGlass type="depth">
            {data.max_depth || '最大深度'}
          </MiniTagGlass>
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
            {/* <FaRegBookmark />  */}
            <FaShareAlt 
              onClick={handleShare}
              aria-label="分享"
            />
          </div>
        </div>
      </div>
      <img
            src={getMainImageUrl(data.img_url)|| '/siteimg.JPG'}
            alt={data.site_name || '潛點圖片'}
          />
    </div>
  );
}
