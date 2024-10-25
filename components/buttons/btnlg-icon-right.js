import styles from './buttons.module.css';
import { FaChevronCircleRight } from 'react-icons/fa';

export default function Button({children}) {
  return (
    <button
      className={`${styles['btnLG-icon-right']} ${styles['fill-primary']}`}
    >
      {children} {/* 在這裡渲染按鈕文字 */}
      <span className={`${styles['iconLG-right-white']}`}>
        <FaChevronCircleRight />
      </span>
    </button>
  );
}
