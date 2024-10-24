import styles from './buttons.module.css'
import { FaChevronCircleRight } from 'react-icons/fa'

export default function Button() {
  return (
    <button
      className={` ${styles['btnLG-outline-icon-right']} ${styles['outline-primary']} `}
    >
      點擊按鈕
      <span className={`${styles['iconLG-right-primary']}`}>
        <FaChevronCircleRight />
      </span>
    </button>
  )
}
