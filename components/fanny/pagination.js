import React from 'react';
import styles from '@/components/fanny/pagination.module.css';
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
    <div className={styles.paginationContainer}>
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.arrowButton}
        aria-label="上一頁"
      >
        <IoIosArrowBack />
      </button>

      <div className={styles.pageNumbers}>
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`${styles.pageButton} ${currentPage === pageNum ? styles.active : ''}`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.arrowButton}
        aria-label="下一頁"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;