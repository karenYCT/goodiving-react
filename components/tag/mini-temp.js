import styles from '@/components/tag/tag.module.css';
import { FaTemperatureLow } from "react-icons/fa6";

export default function MiniTemp({children}) {
  return (
    <>
      <div className={`${styles['tag-mini']} `}>
        <div
          className={`${styles['tagicon-container']} ${styles['tagicon-blue']}`}
        >
          <FaTemperatureLow />
        </div>
        {children} {/* 在這裡渲染按鈕文字 */}
      </div>
    </>
  );
}
