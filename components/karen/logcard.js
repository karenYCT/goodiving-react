import styles from './logcard.module.css';
import { FaRegCalendar } from 'react-icons/fa';
import MiniTag from '../tag/minitag';
import TagGlass from '../tag/tag-bg-shadow';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { API_SERVER } from '@/configs/api-path';

export default function Logcard({
  diaryData = null, // 接收完整的日誌數據
  showOptions = true,
  onDiaryClick = () => {},
}) {
  // 解構diaryData中的數據
  const {
    date = '',
    // region = '',
    site_name = '',
    bottom_time = '',
    water_temp = '',
    max_depth = '',
    // region_name = '',
    method_name = '',
    is_privacy = '',
    // images = [],
  } = diaryData || {};

  // 使用 diaryData 中的圖片（如果有的話）
  const mainImage = diaryData?.images?.find((img) => img.is_main)?.img_url
    ? `${API_SERVER}${diaryData.images.find((img) => img.is_main).img_url}`
    : '/siteimg.JPG';

  // 格式化日期
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toISOString().split('T')[0];
  };

  return (
    <button className={styles['container']} onClick={onDiaryClick}>
      {/* 圖片的位置 */}
      <div className={`${styles['imgContainer']}`}>
        <div className={`${styles['tagContainer']}`}>
          <TagGlass>{is_privacy === 0 || is_privacy === '0' ? '私人' : '公開'}</TagGlass>
          {showOptions && (
            <FaEllipsisVertical
              onClick={(e) => {
                e.stopPropagation();
                console.log('按鈕點擊');
              }}
            />
          )}
        </div>
        <img src={mainImage} alt={`${site_name}的圖片`} />
      </div>

      {/* 日期的位置 */}
      <div className={`${styles['dateContainer']}`}>
        <div className={`${styles['iconContainer']}`}>
          <FaRegCalendar />
        </div>
        <p>{formatDate(date)}</p>
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
