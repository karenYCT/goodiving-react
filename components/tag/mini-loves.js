import styles from '@/components/tag/tag.module.css';
import { FaHeart } from "react-icons/fa6";

export default function MiniLoves({children} ) {
  return (
    <>
      <div className={`${styles['tag-mini']} `}>
        <div
          className={`${styles['tagicon-container']} ${styles['tagicon-pink']}`}
        >
          <FaHeart />
        </div>
        {children} {/* 在這裡渲染按鈕文字 */}
      </div>
    </>
  );
}
