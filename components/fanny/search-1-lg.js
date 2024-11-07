import styles from './search-1-sm.module.css';
import { IoSearch } from 'react-icons/io5';
import { useState } from 'react';

export default function Search1lg({ search }) {
  const [inputValue, setInputValue] = useState('');
  const [cleanBtnShow, setCleanBtnShow] = useState(false);
  const handleButtonClick = () => {
    setInputValue('');
    setCleanBtnShow(false);
  };
  const handleInputChange = (e) => {
    const keyword = e.target.value;
    setInputValue(keyword);
    if (keyword.trim() !== '') {
      setCleanBtnShow(true);
    } else {
      setCleanBtnShow(false);
    }
    search?.(keyword);
  };

  return (
    <div className={styles['container']}>
      <input
        type="text"
        placeholder="搜尋關鍵字"
        className={`${styles['search']} ${styles['search-lg']}`}
        onChange={handleInputChange}
        value={inputValue}
      />
      {cleanBtnShow && (
        <button
          href={'/clean'}
          className={`${styles['icon']} ${styles['icon-lg']} ${styles['icon-cross']} ${styles['icon-cross-lg']}`}
          onClick={handleButtonClick}
        ></button>
      )}
      <button
        className={`${styles['icon']} ${styles['icon-lg']} ${styles['icon-search']}`}
      >
        <IoSearch />
      </button>
    </div>
  );
}
