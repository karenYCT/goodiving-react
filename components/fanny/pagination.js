import styles from '@/components/pagination.module.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  // 生成頁碼
  const getThreePages = () => {
    const pages = [];
    
    // 如果總頁數小於等於 3，直接返回所有頁碼
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
    
    // 如果當前頁是第一頁
    if (currentPage === 1) {
      return [1, 2, 3];
    }
    
    // 如果當前頁是最後一頁
    if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }
    
    // 其他情況顯示當前頁及其前後頁
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const pageNumbers = getThreePages();

  return (
    <nav>
      <ul className={styles['pagination']}>
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <li className={`${styles['arrow-btn']} ${styles['back']}`}>
            <IoIosArrowBack />
          </li>
        </button>
        {/* 頁碼樣式 這塊就是目前畫面的  1 2 3  */}
        {pageNumbers.map((pageNum) => (
          <button key={pageNum} onClick={() => onPageChange(pageNum)}>
            <li
              className={`${styles['page-btn']} ${
                currentPage === pageNum ? styles['active'] : ''
              }`}
            >
              {pageNum}
            </li>
          </button>
        ))}
        {/* 這塊就是畫面的 5 就是最終頁面 */}
        {/* 最終頁按鈕邏輯 */}
        {totalPages > 3 && !pageNumbers.includes(totalPages) && (
          <>
            {/* 如果需要，添加省略符號 */}
            {/* <li className={styles['ellipsis']}>...</li> */}
            <button onClick={() => onPageChange(totalPages)}>
              <li className={styles['page-btn']}>{totalPages}</li>
            </button>
          </>
        )}

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
