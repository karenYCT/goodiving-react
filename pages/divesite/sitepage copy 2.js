import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './sitepage.module.css';
import Imgintrocard from '../../components/karen/imgintrocard';
import ImgcarouselSM from '../../components/karen/imgcarousel-sm';
import Logcard from '../../components/karen/logcard';
import ButtoniconR from '../../components/buttons/btn-icon-right';
import ImgintrocardXS from '../../components/karen/imgintrocard-xs';
import Rating from '../../components/karen/rating';
import LeftQua from '@/public/leftquatation.svg';
import RightQua from '@/public/rightquatation.svg';
import { useDragScroll } from '@/hooks/usedragscroll';
import Modal from '@/components/karen/modal-460';

export default function Sitepage({isOpen, data, currentSites, onClose }) {
  const router = useRouter();
  const dragScroll = useDragScroll();
  const containerRef = useRef(null);
  // 在 Modal 內部過濾相關景點
  const relatedSites = currentSites.filter(
    (site) =>
      site.region_id === data?.region_id && // 相同區域
      site.site_id !== data?.site_id // 排除當前景點
  );

  //監聽內頁變化
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [data]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      router.replace('/divesite', undefined, { shallow: true });
    }, 200);
  };

  if (!isOpen || !data) return null;


  return (
    <Modal isOpen={isOpen} closeModal={handleClose}>
      <div
        ref={containerRef}
        className={`${styles.container} ${styles.dragScroll}`}
        {...dragScroll}
      >
        <div className={styles.imgintro}>
          <Imgintrocard data={data} />
        </div>
        <div className={styles.section}>
          <h5>
            {data.region_name}|{data.site_name}
          </h5>
          <p>
            {data.site_intro}
          </p>
          <div className={styles.carouselContainer}>
            <ImgcarouselSM />
          </div>
        </div>

        {/* <div className={styles.section}>
          <h5>評分</h5>
          <div className={styles.ratingContainer}>
            <Rating />
          </div>
        </div> */}

        <div className={styles.section}>
          <h5>深藍日誌</h5>
          <div
            className={`${styles.logContainer} ${styles.dragScroll}`}
            {...dragScroll}
          >
            <Logcard showOptions={false} />
            <Logcard showOptions={false} />
            <Logcard showOptions={false} />
            <Logcard showOptions={false} />
            <Logcard showOptions={false} />
          </div>
        </div>

        <div className={styles.descContainer}>
          <div className={styles.quotationContainer}>
            <LeftQua className={styles.quotation} />
            <h5> 每一段冒險都源於一顆向往自由的心 </h5>
            <RightQua className={styles.quotation} />
          </div>
          <p>
            大海呼喚著，來發現它的秘密擁抱它的無邊廣闊，讓靈魂隨波逐流點擊下方按鈕，一起來開啟您與大海的深度探索
          </p>
          <ButtoniconR>立即預定您的深藍假期</ButtoniconR>
        </div>
        {relatedSites.length > 0 && (
          <div className={styles.section}>
            <h5>查看{data.region_name}更多潛點</h5>
            <div
              className={`${styles.cardContainer} ${styles.dragScroll}`}
              {...dragScroll}
            >
              {relatedSites.map((site) => (
                <ImgintrocardXS 
                  key={site.site_id} 
                  data={site}
                  onClick={() => {
                    router.push(`/divesite/site/${site.site_id}`, undefined, { 
                      shallow: true 
                    });
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
