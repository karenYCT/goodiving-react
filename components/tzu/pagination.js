import styles from './pagination.module.css';
// import { useRouter } from 'next/router';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function Pagination({
  totalPages = 1,
  currentPage = 1,
  onPageChange = () => {},
}) {
  // const router = useRouter();

  // 生成頁碼陣列
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // 最多顯示的頁碼數

    if (totalPages <= maxVisiblePages) {
      // 如果總頁數小於等於最大顯示數，顯示所有頁碼
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 如果總頁數大於最大顯示數，使用省略形式
      const showFirstDots = currentPage > 3;
      const showLastDots = currentPage < totalPages - 2;

      if (showFirstDots && showLastDots) {
        // 顯示當前頁及其前後各一頁，並在兩端顯示省略號
        return [
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        ];
      } else if (showFirstDots) {
        // 顯示後面幾頁
        return [
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else if (showLastDots) {
        // 顯示前面幾頁
        return [1, 2, 3, 4, '...', totalPages];
      }
    }

    return pageNumbers;
  };

  // // 處理頁面切換
  // const handlePageChange = (page) => {
  //   if (page >= 1 && page <= totalPages && page !== currentPage) {
  //     // 更新查詢參數
  //     const query = { ...router.query, page };
  //     onPageChange(page);
  //   }
  // };

  return (
    <nav>
      <ul className={styles['pagination']}>
        <li
          className={`${styles['arrow-btn']} ${styles['back']} ${
            currentPage === 1 ? styles['disabled'] : ''
          }`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          role="presentation"
        >
          <IoIosArrowBack />
        </li>

        {getPageNumbers().map((page, index) => (
          <li
            key={index}
            className={`${styles['page-btn']} ${
              currentPage === page ? styles['active'] : ''
            } ${page === '...' ? styles['dots'] : ''}`}
            onClick={() => page !== '...' && onPageChange(page)}
            role="presentation"
          >
            {page}
          </li>
        ))}
        <li
          className={`${styles['arrow-btn']} ${styles['forward']} ${
            currentPage === totalPages ? styles['disabled'] : ''
          }`}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          role="presentation"
        >
          <IoIosArrowForward />
        </li>
      </ul>
    </nav>
  );
}
