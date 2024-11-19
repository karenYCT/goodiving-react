import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './imgcarousel-sm.module.css';
// import { API_SERVER } from '@/configs/api-path';

//2.在settings中使用
export default function ImgCaouselSM({ data = {} }) {
  // 處理圖片路徑的函數
  const getImageUrl = (imgUrl) => {
    if (!imgUrl) return '/siteimg.JPG';
    // 如果是完整的 URL（例如 http:// 或 https:// 開頭）就直接返回
    if (imgUrl.startsWith('http')) return imgUrl;
    // 否則加上 /divesites/ 前綴
    return `/divesites/${imgUrl}`;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // 3.渲染輪播
  // 如果沒有圖片，顯示預設圖片
  if (!data.images || data.images.length === 0) {
    return (
      <div className={styles.sliderWrapper}>
        <div className={styles.slide}>
          <p className={styles.slideText}>{data.site_intro}</p>
          <div className={styles.wrap}>
            <img
              src={getImageUrl(data.img_url) || '/siteimg.JPG'}
              alt={data.site_name || '潛點圖片'}
              className={styles.img}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.sliderWrapper}>
      <Slider {...settings}>
        {data.images.map((image, index) => (
          <div key={`${data.site_id}-${index}`}>
            <div className={styles.slide}>
              <p className={styles.slideText}>{image.site_intro}</p>
              <div className={styles.wrap}>
                <img
                  src={getImageUrl(image.img_url)}
                  alt={`${data.site_name} - 圖片 ${index + 1}`}
                  className={styles.img}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
