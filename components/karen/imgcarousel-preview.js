import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/components/karen/imgcarousel-preview.module.css';
import IconOutlinePrimaryLGR from '@/components/icons/icon-outline-primary-lgright';
import IconOutlinePrimaryLGL from '@/components/icons/icon-outline-primary-lgleft';
import { FaCamera } from 'react-icons/fa6';
import divingimgs from '@/data/divingimg.json';  //照片資料

// 1.先定義箭頭的組件
// 添加左邊箭頭的位置容器
const PrevArrow = (props) => {
  const { onClick, currentSlide } = props;
  return (
    // 外層定位容器
    <div className={styles.prevArrow}>
      <IconOutlinePrimaryLGL
        onClick={onClick}
        className={currentSlide === 0 ? styles.disabled : ''}
      />
    </div>
  );
};

// 添加右邊箭頭的位置容器
const NextArrow = (props) => {
  const { onClick, currentSlide, slideCount } = props;
  return (
    <div className={styles.nextArrow}>
      <IconOutlinePrimaryLGR
        onClick={onClick}
        className={currentSlide === slideCount - 1 ? styles.disabled : ''}
      />
    </div>
  );
};


//2.在settings中使用
function PreviewCarousel({images, onAddMore}) {
  const settings = {
    dots: true,
    infinite: images.length>1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: images.length>1,
    autoplay: images.length>1, //自動播放
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />, //讓 react-slick 控制渲染
    nextArrow: <NextArrow />,
    // 添加以下設置以確保內容居中
    //centerMode: true,
    //centerPadding: '0px',
  };
  // 如果沒有圖片，顯示上傳按鈕
  if (images.length === 0) {
    return (
      <div 
        className={styles.uploadContainer}
        onClick={onAddMore}
      >
        <FaCamera size={40} />
        <h5>點擊新增照片</h5>
      </div>
    );
  }

  // 3.渲染輪播
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.sliderWrapper}>
        <Slider {...settings}>
          {images.map((image,index) => (
            <div key={index} className={styles.wrap}>
            <div className={styles.imageWrapper}>
              <img 
              src={image.preview || `/uploads/${image.filename}`} 
              alt={`預覽圖 ${index + 1}`} 
              className={styles.image}
              onError={(e) => (
                console.log('圖片載入失敗'),
                e.target.src = '/example.jpg')}
              />
              {image.isMain === true &&  (
                <div className={styles.mainImageBadge}>
                主圖
                </div>
              )}
            </div>
            </div>
          ))}
        </Slider>
      </div>
      <button 
          className={styles.addMoreButton}
          onClick={onAddMore}
        >
          <FaCamera />
          <span>新增更多照片</span>
        </button>
    </div>
  );
}

export default PreviewCarousel;
