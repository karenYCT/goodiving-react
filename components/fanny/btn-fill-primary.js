import styles from './buttons.module.css';

export default function Button({ children }) {
  return (
    <div className={styles['btn-container']}>
      <button className={`${styles.btn} ${styles['fill-primary']}`}>
        {children}新增文章{/* 在這裡渲染按鈕文字 */}
      </button>
    </div>
  );
}
