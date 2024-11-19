import React, { useState, useEffect } from 'react';
import ButtonOP2 from '@/components/buttons/btn-outline-primary2';
import ButtonOP from '@/components/buttons/btn-outline-primary';
import styles from './diarysearch.module.css';
import Modal from '@/components/karen/modal-search';

// 定義隱私設置選項
const privacyOptions = [
  { id: 0, name: '私人' },
  { id: 1, name: '公開' },
];

// 定義排序選項
const sortOptions = [
  { id: 'date_desc', name: '日期（新到舊）' },
  { id: 'date_asc', name: '日期（舊到新）' },
];

export default function Search({
  isOpen = false,
  closeModal = () => {},
  onApplyFilters = () => {},
  initialFilters = {},
}) {
  const [searchFilters, setSearchFilters] = useState({
    date: null,
    is_privacy: null,
    sortBy: null,
  });

  // 當 Modal 開啟時，載入當前的篩選條件
  useEffect(() => {
    if (isOpen) {
      setSearchFilters(initialFilters);
    }
  }, [isOpen, initialFilters]);

  //處理『篩選』邏輯按鈕
  const handleFilterClick = (type, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value, // 再次點擊同一個選項會取消選擇
    }));
  };

  //處理『套用』按鈕
  const handleApply = () => {
    onApplyFilters(searchFilters);
    closeModal();
  };

  //處理『清除』按鈕
  const handleClear = () => {
    const clearedFilters = {
      date: null,
      is_privacy: null,
      sortBy: null,
    };
    setSearchFilters(clearedFilters);
    onApplyFilters(clearedFilters); // 直接套用清除後的篩選條件
    closeModal(); // 關閉 Modal
  };

  return (
    <>
      <Modal className={styles.modal} isOpen={isOpen} closeModal={closeModal}>
        <div className={styles.container}>
          <div className={styles.section}>
            <h5>排序條件</h5>
            <div className={styles.body}>
              {sortOptions.map((option) => (
                <ButtonOP2
                  className={`${
                    searchFilters.sortBy === option.id ? styles.active : ''
                  } ${styles.customButton}`}
                  key={option.id}
                  onClick={() => handleFilterClick('sortBy', option.id)}
                >
                  {option.name}
                </ButtonOP2>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h5>隱私設置</h5>
            <div className={styles.body}>
              {privacyOptions.map((option) => (
                <ButtonOP2
                  className={`${
                    searchFilters.is_privacy === option.id ? styles.active : ''
                  } ${styles.customButton}`}
                  key={option.id}
                  onClick={() => handleFilterClick('is_privacy', option.id)}
                >
                  {option.name}
                </ButtonOP2>
              ))}
            </div>
          </div>

          <div className={styles.function}>
            <ButtonOP className={styles.customButton} onClick={handleClear}>
              清除
            </ButtonOP>
            <ButtonOP className={styles.customButton} onClick={handleApply}>
              套用
            </ButtonOP>
          </div>
        </div>
      </Modal>
    </>
  );
}
