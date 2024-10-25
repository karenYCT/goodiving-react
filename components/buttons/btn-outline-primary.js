import styles from './buttons.module.css'

export default function Button({children}) {
  return (
    <button className={`${styles['btn']} ${styles['outline-primary']}`}>
      {children} {/* 在這裡渲染按鈕文字 */}
    </button>
  )
}
