import styles from './icons.module.css'
import { FaChevronRight } from 'react-icons/fa'

export default function Button() {
  return (
    <button
      className={`${styles['color-fill-secondary']} ${styles['size-lg']} `}
    >
      <FaChevronRight />
    </button>
  )
}
