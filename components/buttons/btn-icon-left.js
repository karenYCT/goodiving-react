import styles from './buttons.module.css';
import { FaChevronCircleLeft } from 'react-icons/fa';

export default function Button({
  onClick = () => {}, // 可選的onClick事件處理函式
  disabled = false, // 禁用狀態
  type = 'button', // 按鈕類型
  children = ' ', // 按鈕內容
  gray = false, // 灰色按鈕
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${styles['btn-icon-left']} ${styles['fill-gray']} ${
        gray ? styles.gray : ''
      }`}
    >
      <span className={`${styles['icon-left-white']}`}>
        <FaChevronCircleLeft />
      </span>
      {children} {/* 在這裡渲染按鈕文字 */}
    </button>
  );
}
