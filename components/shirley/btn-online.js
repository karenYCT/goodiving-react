import styles from './btn-online.module.css';
import { FaCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function BtnOnline({ name, url, isOnline }) {
  const router = useRouter();
  const onClick = () => {
    router.push(`./chat?receiverId=${url}`);
  };
  return (
    <>
      <div
        role="button"
        tabIndex="0"
        className={styles['btn']}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <FaCircle
          className={isOnline ? styles['circle-light'] : styles['circle-dark']}
        />
        <span>{name}</span>
      </div>
    </>
  );
}
