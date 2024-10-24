import styles from '@/components/tag/tag.module.css';
import { FaRulerVertical } from "react-icons/fa6";

export default function MiniDepth() {
  return (
    <>
      <div className={`${styles['tag-mini']} `}>
        <div
          className={`${styles['tagicon-container']} ${styles['tagicon-lakegreen']}`}
        >
          <FaRulerVertical />
        </div>
        深度
      </div>
    </>
  );
}
