import styles from './buttons.module.css'
import { FaChevronCircleRight } from 'react-icons/fa'

export default function Button() {
  return (
    <button className={`${styles['btn-icon-right']} ${styles['fill-primary']}`}>
      點擊按鈕
      <span className={`${styles['icon-right-white']}`}>
        <FaChevronCircleRight />
      </span>
    </button>
  )
}
