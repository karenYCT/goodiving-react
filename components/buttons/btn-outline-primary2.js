import styles from './buttons.module.css';

export default function Button({
  onClick = () => {}, // 可選的onClick事件處理函式
  disabled = false, // 禁用狀態
  type = 'button', // 按鈕類型
  children = ' ', // 按鈕內容
  className = '',
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${styles['btn4']} ${styles['outline-primary']} ${className}`}
    >
      {children} {/* 在這裡渲染按鈕文字 */}
    </button>
  );
}
