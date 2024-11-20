import styles from '@/components/pagination.module.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      // 如果總頁數小於等於 5，直接返回所有頁碼
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // 處理分頁區間
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav>
      <ul className={styles['pagination']}>
        {/* 上一頁按鈕 */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <li className={`${styles['arrow-btn']} ${styles['back']}`}>
            <IoIosArrowBack />
          </li>
        </button>

        {/* 分頁按鈕 */}
        {pageNumbers.map((pageNum, index) =>
          pageNum === '...' ? (
            <li key={index} className={styles['ellipsis']}>...
            </li>
          ) : (
            <button key={pageNum} onClick={() => onPageChange(pageNum)}>
              <li
                className={`${styles['page-btn']} ${
                  currentPage === pageNum ? styles['active'] : ''
                }`}
              >
                {pageNum}
              </li>
            </button>
          )
        )}

        {/* 下一頁按鈕 */}
        <button
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        >
          <li className={`${styles['arrow-btn']} ${styles['forward']}`}>
            <IoIosArrowForward />
          </li>
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;
