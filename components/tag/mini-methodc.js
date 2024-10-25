import styles from '@/components/tag/tag.module.css';

export default function MiniMethodc() {
  return (
    <>
      <div className={`${styles['tag-mini']} `}>
        <div
          className={`${styles['tagicon-container']} ${styles['tagicon-purple']}`}
        >
          <img src="/岸潛.svg" alt="method" />
        </div>
        岸潛
      </div>
    </>
  );
}
