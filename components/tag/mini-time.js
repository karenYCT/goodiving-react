import styles from '@/components/tag/tag.module.css';
import { FaRegClock } from 'react-icons/fa6';

export default function MiniTime() {
  return (
    <>
      <div className={`${styles['tag-mini']} `}>
        <div
          className={`${styles['tagicon-container']} ${styles['tagicon-red']}`}
        >
          <FaRegClock />
        </div>
        時間
      </div>
    </>
  );
}
