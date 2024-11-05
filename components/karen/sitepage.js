import styles from './sitepage.module.css';
import Imgintrocard from './imgintrocard';
import ImgcarouselSM from './imgcarousel-sm';
import Logcard from './logcard';
import ButtoniconR from '../buttons/btn-icon-right';
import ImgintrocardXS from './imgintrocard-xs';
import Rating from './rating';
import LeftQua from '@/public/leftquatation.svg';
import RightQua from '@/public/rightquatation.svg';
import { useDragScroll } from '@/hooks/usedragscroll';
import Modal from '@/components/karen/modal-460';
import { useSitepageModal } from '@/context/sitepage-context';

export default function Sitepage() {
  const { sitepageModal, closeSitepageModal } = useSitepageModal();
  const { isOpen, data, currentSites } = sitepageModal;
  const dragScroll = useDragScroll();

  // 在 Modal 內部過濾相關景點
  const relatedSites = currentSites.filter(
    (site) =>
      site.region_id === data?.region_id && // 相同區域
      site.site_id !== data?.site_id // 排除當前景點
  );

  // 檢查資料是否正確傳入
  console.log('SitepageModal received Data:', data);
  console.log('Current sites:', currentSites);
  console.log('Related sites:', relatedSites);

  // 如果關閉狀態則不渲染
  if (!isOpen || !data) return null;

  return (
    <Modal isOpen={isOpen} closeModal={closeSitepageModal}>
      <div
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
            鋼鐵礁位於龜灣與大白沙之間的海域，是一座以鋼鐵建造的人工魚礁。鋼鐵礁一共有四座，長寬各自約為10公尺，潛點的深度範圍自頂部的約21公尺開始，中層為約25公尺，最深處則達31公尺，是一個適合探索不同深度的潛水點。
          </p>
          <div className={styles.carouselContainer}>
            <ImgcarouselSM />
          </div>
        </div>

        <div className={styles.section}>
          <h5>評分</h5>
          <div className={styles.ratingContainer}>
            <Rating />
          </div>
        </div>

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
        <div className={styles.section}>
          <h5>查看{data.region_name}更多潛點</h5>
          <div
            className={`${styles.cardContainer} ${styles.dragScroll}`}
            {...dragScroll}
          >
            {relatedSites.map((site) => (
              <ImgintrocardXS key={site.site_id} data={site} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
