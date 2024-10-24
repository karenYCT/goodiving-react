import styles from '@/components/tag/tag.module.css';
import { FaStar } from 'react-icons/fa6';

export default function MiniLevel() {
  return (
    <>
      <div className={`${styles['tag-mini']} `}>
        <div
          className={`${styles['tagicon-container']} ${styles['tagicon-yellow']}`}
        >
          <FaStar />
        </div>
        難易度
      </div>
    </>
  );
}
