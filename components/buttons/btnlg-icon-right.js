import styles from './buttons.module.css';
import { FaChevronCircleRight } from 'react-icons/fa';

export default function Button() {
  return (
    <button
      className={`${styles['btnLG-icon-right']} ${styles['fill-primary']}`}
    >
      點擊按鈕
      <span className={`${styles['iconLG-right-white']}`}>
        <FaChevronCircleRight />
      </span>
    </button>
  );
}
