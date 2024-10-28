import styles from '@/components/tag/tag.module.css';

export default function MiniMethodb() {
  return (
    <>
      <div className={`${styles['tag-mini']} `}>
        <div
          className={`${styles['tagicon-container']} ${styles['tagicon-purple']}`}
        >
          <img src="/船潛.svg" alt="method" />
        </div>
        船潛
      </div>
    </>
  );
}
