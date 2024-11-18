import styles from './logcard.module.css';
import { FaRegCalendar } from 'react-icons/fa';
import MiniTag from '@/components/tag/minitag';
import TagGlass from '@/components/tag/tag-bg-shadow';
import { FaRegSquare, FaRegSquareCheck } from 'react-icons/fa6';
import { API_SERVER } from '@/configs/api-path';
import { formatDateForDisplay } from '@/utils/date';

export default function Logcard({
  diaryData = {}, // 接收完整的日誌數據
  onDiaryClick = () => {},
}) {
  console.log('Received diaryData:', diaryData);
  // 如果沒有提供 diaryData，使用預設值
  if (!diaryData) return null;
  console.log('No diaryData provided to Logcard');
  // 解構diaryData中的數據
  const {
    date = '',
    site_name = '',
    bottom_time = '',
    water_temp = '',
    max_depth = '',
    method_name = '',
    is_privacy = '',
    images = [],
    user_full_name = '', 
  } = diaryData || {};

  console.log('Images in Logcard:', images);
  // 處理圖片 URL
  let mainImage = '/siteimg.JPG'; // 預設圖片
  if (images && images.length > 0) {
    const mainImageObj = images.find((img) => img.is_main === 1) || images[0];
    if (mainImageObj && mainImageObj.img_url) {
      // 如果 img_url 已經包含完整路徑，就直接使用
      mainImage = mainImageObj.img_url.startsWith('http')
        ? mainImageObj.img_url
        : `${API_SERVER}${mainImageObj.img_url}`;
    }
  }

  console.log('Main image URL:', mainImage); // 調試最終使用的圖片 URL

  const handleClick = () => {
    if (diaryData.log_id) {
      onDiaryClick(diaryData.log_id);
    }
  };


  return (
    <button className={styles['container']} onClick={handleClick}>
      {/* 圖片的位置 */}
      <div className={`${styles['imgContainer']}`}>
        <div className={`${styles['tagContainer']}`}>
          <TagGlass>
            {is_privacy === 0 || is_privacy === '0' ? '私人' : '公開'}
          </TagGlass>
        </div>
        <img 
          src={mainImage} 
          alt={`${site_name || '潛點'}的圖片`}
          onError={(e) => {
            console.log('Image load error, falling back to default');
            e.target.src = '/siteimg.JPG';
          }}
        />
      </div>
      {/* 發佈者 */}
      <div className={styles.userInfo}>
        <span className={styles.userName}>{user_full_name}</span>
      </div>
      {/* 日期的位置 */}
      <div className={`${styles['dateContainer']}`}>
        <div className={`${styles['iconContainer']}`}>
          <FaRegCalendar />
        </div>
        <p>{formatDateForDisplay(date)}</p>
      </div>
      {/* 潛點名稱的位置 */}
      <h5>{site_name}</h5>
      {/* 日誌標籤的位置 */}
      <div className={`${styles['minitag']}`}>
        <MiniTag type={method_name === '船潛' ? 'boat' : 'shore'} />
        <MiniTag type="time" bottom_time={bottom_time} />
        <MiniTag type="temp" water_temp={water_temp} />
        <MiniTag type="depth" max_depth={max_depth} />
      </div>
    </button>
  );
}
