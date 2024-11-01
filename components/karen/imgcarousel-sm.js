import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './imgcarousel-sm.module.css';
import divingimgs from '@/data/divingimg.json';

//2.在settings中使用
function App() {
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
