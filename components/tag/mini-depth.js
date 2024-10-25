import styles from '@/components/tag/tag.module.css';
import { FaRulerVertical } from "react-icons/fa6";

export default function MiniDepth({children}) {
  return (
    <>
      <div className={`${styles['tag-mini']} `}>
        <div
          className={`${styles['tagicon-container']} ${styles['tagicon-lakegreen']}`}
        >
          <FaRulerVertical />
        </div>
        {children} {/* 在這裡渲染按鈕文字 */}
      </div>
    </>
  );
}
