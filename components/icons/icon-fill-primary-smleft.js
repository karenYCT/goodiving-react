import styles from './icons.module.css'
import { FaChevronLeft } from 'react-icons/fa'

export default function Button() {
  return (
    <button className={`${styles['color-fill-primary']} ${styles['size-sm']} `}>
      <FaChevronLeft />
    </button>
  )
}
