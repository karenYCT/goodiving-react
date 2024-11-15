import ImgcarouselSM from '../../components/karen/imgcarousel-sm';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import { FaRegCalendar } from 'react-icons/fa';
import MiniTag from '@/components/tag/minitag';
import Modal from '@/components/karen/modal-460';
import styles from './diarypage.module.css';
import { formatDateForDisplay } from '@/utils/date';

export default function DiaryPage({ diaryData, onClose, onEdit, onUpdateSuccess }) {
  //如果沒有資料，就不選染組件
  console.log('DiaryPage 完整接收到的資料:', {
    fullData: diaryData,
    hasImages: Boolean(diaryData?.images),
    imageCount: diaryData?.images?.length,
    properties: Object.keys(diaryData || {}),
  });

  if (!diaryData) return null;

  //解構需要的資料
  const {
    date = '',
    site_name = '',
    method_name = '',
    bottom_time = '',
    water_temp = '',
    max_depth = '',
    log_exp = '',
    is_privacy = '',
    visibility = '',
    images = [],
    log_id = '', 
  } = diaryData || {};

  // 格式化日期
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toISOString().split('T')[0];
  };

  // 處理編輯按鈕點擊
  const handleEditClick = () => {
    onEdit(diaryData.log_id, onUpdateSuccess);  // 調用父組件傳來的編輯處理函數
  };

  return (
    <>
      <Modal closeModal={onClose}>
        <div className={styles.functionContainer}>
          <ButtonFP2 onClick={handleEditClick}>編輯</ButtonFP2>
        </div>

        <div className={styles.container}>
          <div className={styles.carouselContainer}>
            <ImgcarouselSM images={images} />
          </div>

          <div className={styles.dateContainer}>
            <div className={styles.iconContainer}>
              <FaRegCalendar />
            </div>
            <p>{formatDateForDisplay(date)}</p>
          </div>

          <div className={styles.textContainer}>
            <span> 隱私設定：{is_privacy ? '私密' : '公開'} </span>
            <h4>{site_name}</h4>
            <p>{log_exp}</p>
          </div>

          <div className={styles.minitagContainer}>
            <MiniTag
              type={method_name === '船潛' ? 'boat' : 'shore'}
              method={method_name}
            />
            <MiniTag type="time" bottom_time={bottom_time} />
            <MiniTag type="temp" water_temp={water_temp} />
            <MiniTag type="depth" max_depth={max_depth} />
            <MiniTag type="visi" visi_name={visibility} />
          </div>
        </div>
      </Modal>
    </>
  );
}
