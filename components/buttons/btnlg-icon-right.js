import styles from './buttons.module.css';
import { FaChevronCircleRight } from 'react-icons/fa';

export default function Button({
  onClick = () => {}, // 可選的onClick事件處理函式
  disabled = false, // 禁用狀態
  type = 'button', // 按鈕類型
  children = ' ', // 按鈕內容
}) {
  return (
    <button
      onClick={() => {}}
      type={type}
      disabled={disabled}
      className={`${styles['btnLG-icon-right']} ${styles['fill-primary']}`}
    >
      {children} {/* 在這裡渲染按鈕文字 */}
      <span className={`${styles['iconLG-right-white']}`}>
        <FaChevronCircleRight />
      </span>
    </button>
  );
}
