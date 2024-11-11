import ImgcarouselSM from '../../components/karen/imgcarousel-sm';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import ButtonFG from '@/components/buttons/btn-fill-gray2';
import { FaRegCalendar } from 'react-icons/fa';
import MiniTag from '@/components/tag/minitag';
import Modal from '@/components/karen/modal-460';
import styles from './diarypage.module.css';

export default function DiaryPage() {
  return (
    <>
    <Modal>
      <div className={styles.functionContainer}>
          <ButtonFP2 >編輯</ButtonFP2>
      </div>

      <div className={styles.container}>
        <div className={styles.carouselContainer}>
          <ImgcarouselSM />
        </div>


        <div className={styles.dateContainer}>
          <div className={styles.iconContainer}>
            <FaRegCalendar />
          </div>
          <p>2024-10-11</p>
        </div>

        <div className={styles.textContainer}>
        <span>隱私設定：</span>
        <h4>鋼鐵礁</h4>
        <p>在綠島鋼鐵礁的潛水經歷令人難忘。這裡的海水透明度極佳，水底的能見度相當驚人，讓人感覺宛如進入一座湛藍色的水下樂園。鋼鐵礁周圍的珊瑚礁群生命力旺盛，各種色彩斑斕的珊瑚、海葵和熱帶魚令人目不暇給。潛入後，最驚豔的是這裡的大型魚群，有時甚至可以看到黑鮪魚和梭魚群快速穿梭。這片潛點也吸引了許多水下攝影愛好者，在這裡捕捉到壯觀的水下景象。由於鋼鐵礁地形複雜，對於技術潛水者來說更是挑戰與樂趣兼具的地方。在這裡，我深刻感受到大自然的雄偉與美麗，並體會到與海洋共處的平靜與奇妙。</p>
        </div>

        <div className={styles.minitagContainer}>
          <MiniTag type="boat" method="" />
          <MiniTag type="time" bottom_time="" />
          <MiniTag type="temp" water_temp="" />
          <MiniTag type="depth" max_depth="" />
        </div>
      </div>
    </Modal>
    </>
  )
}
