import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './imgcarousel-sm.module.css';
import { API_SERVER } from '@/configs/api-path';

//2.在settings中使用
export default function ImgCaouselSM({ images = [] }) {
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
  if (!images || images.length === 0) {
    return (
      <div className={styles.sliderWrapper}>
        <div className={styles.wrap}>
          <img src="/siteimg.JPG" alt="default" className={styles.img} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.sliderWrapper}>
      <Slider {...settings}>
        {images.map((images) => (
          <div key={images.img_id} className={styles.wrap}>
            <img
              src={`${API_SERVER}${images.img_url}`}
              alt={`Diving image ${images.img_id}`}
              className={styles.img}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
