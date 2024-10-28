import styles from '@/components/tag/tag.module.css';
import { FaRegClock } from 'react-icons/fa6';

export default function MiniTime({children} ) {
  return (
    <>
      <div className={`${styles['tag-mini']} `}>
        <div
          className={`${styles['tagicon-container']} ${styles['tagicon-red']}`}
        >
          <FaRegClock />
        </div>
        {children} {/* 在這裡渲染按鈕文字 */}
      </div>
    </>
  );
}
