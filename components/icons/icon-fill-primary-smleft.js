import styles from './icons.module.css';
import { FaChevronLeft } from 'react-icons/fa';

export default function Button({ classname = '', onClick = () => {} }) {
  return (
    <button
      className={`${styles['color-fill-primary']} ${styles['size-sm']} `}
      onClick={onClick}
      aria-label="Previous"
    >
      <FaChevronLeft />
    </button>
  );
}
