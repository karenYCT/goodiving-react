import styles from './icons.module.css';
import { FaChevronLeft } from 'react-icons/fa';

export default function Button({ classname = '', onClick = () => {} }) {
  return (
    <button
      className={`${styles['color-fill-light']} ${styles['size-lg']} `}
      onClick={onClick}
      aria-label="Previous"
    >
      <FaChevronLeft />
    </button>
  );
}
