import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './imgcarousel.module.css';
import IconOutlinePrimaryLGR from '@/components/icons/icon-outline-primary-lgright';
import IconOutlinePrimaryLGL from '@/components/icons/icon-outline-primary-lgleft';
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
function App() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, //自動播放
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />, //讓 react-slick 控制渲染
    nextArrow: <NextArrow />,
    // 添加以下設置以確保內容居中
    //centerMode: true,
    //centerPadding: '0px',
  };

  // 3.渲染輪播
  return (
    <div className={styles.sliderWrapper}>
      <Slider {...settings}>
        {divingimgs.map((divingimg) => (
          <div key={divingimg.name} className={styles.wrap}>
            <img src={divingimg.url} alt={divingimg.name} className={styles.img} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default App;
