import styles from '@/components/tag/tag.module.css';
import { FaFishFins } from "react-icons/fa6";

export default function MiniVisiability() {
  return (
    <>
      <div className={`${styles['tag-mini']} `}>
        <div
          className={`${styles['tagicon-container']} ${styles['tagicon-green']}`}
        >
          <FaFishFins />
        </div>
        能見度
      </div>
    </>
  );
}
