import styles from './pagination.module.css';
import Link from 'next/link';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function Pagination() {
  return (
    <nav>
      <ul className={styles['pagination']}>
        <Link href={'/'}>
          <li className={`${styles['arrow-btn']} ${styles['back']}`}>
            <IoIosArrowBack />
          </li>
        </Link>

        <Link href={'/'}>
          <li className={styles['page-btn']}>1</li>
        </Link>
        <Link href={'/'}>
          <li className={styles['page-btn']}>2</li>
        </Link>
        <Link href={'/'}>
          <li className={styles['page-btn']}>3</li>
        </Link>
        <Link href={'/'}>
          <li className={styles['page-btn']}>4</li>
        </Link>
        <Link href={'/'}>
          <li className={`${styles['page-btn']} ${styles['active']}`}>5</li>
        </Link>
        <Link href={'/'}>
          <li className={styles['page-btn']}>10</li>
        </Link>

        <Link href={'/'}>
          <li className={`${styles['arrow-btn']} ${styles['forward']}`}>
            <IoIosArrowForward />
          </li>
        </Link>
      </ul>
    </nav>
  );
}
