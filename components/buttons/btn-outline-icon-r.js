import styles from './buttons.module.css'
import { FaChevronCircleRight } from 'react-icons/fa'

export default function Button({children}) {
  return (
    <button
      className={`${styles['btn-outline-icon-right']} ${styles['outline-primary']}`}
    >
      {children} {/* 在這裡渲染按鈕文字 */}
      <span className={`${styles['icon-right-primary']}`}>
        <FaChevronCircleRight />
      </span>
    </button>
  )
}
