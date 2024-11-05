import { on } from 'events'
import styles from './buttons.module.css'

export default function Button({
  onClick = () => {}, // 可選的onClick事件處理函式
  disabled = "", // 禁用狀態
  type = 'button', // 按鈕類型
  children = ' ',
  className = '', // 按鈕內容
}) {
  return (
    <button 
    onClick={onClick}
    type={type}
    className={`${styles.btn2} ${styles['fill-primary']} ${className}`}
    >
      {children} {/* 在這裡渲染按鈕文字 */}
    </button>
  )
}
