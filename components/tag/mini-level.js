import styles from '@/components/tag/tag.module.css';
import { FaStar } from 'react-icons/fa6';

export default function MiniLevel({children} ) {
  return (
    <>
      <div className={`${styles['tag-mini']} `}>
        <div
          className={`${styles['tagicon-container']} ${styles['tagicon-yellow']}`}
        >
          <FaStar />
        </div>
        {children} {/* 在這裡渲染按鈕文字 */}
      </div>
    </>
  );
}
