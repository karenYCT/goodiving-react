import styles from './icons.module.css';
import { FaChevronRight } from 'react-icons/fa';

export default function Button({ classname = '', onClick = () => {} }) {
  return (
    <button
      className={`${styles['color-fill-light']} ${styles['size-lg']} `}
      onClick={onClick}
      aria-label="Next"
    >
      <FaChevronRight />
    </button>
  );
}
