import styles from '@/components/tag/tag.module.css';
import { FaHeart } from "react-icons/fa6";

export default function MiniLoves() {
  return (
    <>
      <div className={`${styles['tag-mini']} `}>
        <div
          className={`${styles['tagicon-container']} ${styles['tagicon-pink']}`}
        >
          <FaHeart />
        </div>
        喜愛度
      </div>
    </>
  );
}
