import styles from '@/components/tag/tag.module.css';
import { FaTemperatureLow } from "react-icons/fa6";

export default function MiniTemp() {
  return (
    <>
      <div className={`${styles['tag-mini']} `}>
        <div
          className={`${styles['tagicon-container']} ${styles['tagicon-blue']}`}
        >
          <FaTemperatureLow />
        </div>
        水溫
      </div>
    </>
  );
}
