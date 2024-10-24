import styles from './buttons.module.css'

export default function Button() {
  return (
    <button className={`${styles.btn} ${styles['fill-light']}`}>
      點擊按鈕
    </button>
  )
}
