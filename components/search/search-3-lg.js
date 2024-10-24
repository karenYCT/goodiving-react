import styles from './search-3-sm.module.css';
import { IoSearch } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';

export default function Search3lg() {
  const [inputValue, setInputValue] = useState('');
  const [cleanBtnShow, setCleanBtnShow] = useState(false);
  const handleButtonClick = () => {
    setInputValue('');
    setCleanBtnShow(false);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value !== '') {
      setCleanBtnShow(true);
    } else {
      setCleanBtnShow(false);
    }
  };

  return (
    <div className={styles['container']}>
      <input
        type="text"
        placeholder="搜尋提示字"
        className={`${styles['search']} ${styles['search-lg']}`}
        onChange={handleInputChange}
        value={inputValue}
      />
      {cleanBtnShow && (
        <button
          href={'/clean'}
          className={`${styles['icon']} ${styles['icon-lg']} ${styles['icon-cross']}  ${styles['icon-cross-lg']}`}
          onClick={handleButtonClick}
        >
          <RxCross2 />
        </button>
      )}
      <button
        className={`${styles['icon']} ${styles['icon-lg']} ${styles['icon-search']}`}
      >
        <IoSearch />
      </button>
    </div>
  );
}
