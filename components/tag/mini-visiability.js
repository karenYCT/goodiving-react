import styles from '@/components/tag/tag.module.css';
import { FaFishFins } from "react-icons/fa6";

export default function MiniVisiability({children}) {
  return (
    <>
      <div className={`${styles['tag-mini']} `}>
        <div
          className={`${styles['tagicon-container']} ${styles['tagicon-green']}`}
        >
          <FaFishFins />
        </div>
        {children} {/* 在這裡渲染按鈕文字 */}
      </div>
    </>
  );
}
