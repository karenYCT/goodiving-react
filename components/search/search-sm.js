import styles from './search-sm.module.css';
import { IoSearch } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';

export default function Searchsm({
  inputValue = '',
  setInputValue = () => {},
  onClick = () => {},
}) {
  const [cleanBtnShow, setCleanBtnShow] = useState(false);
  const handleButtonClick = () => {
    setInputValue((prevFilters) => ({
      ...prevFilters,
      keyword: '',
    }));
    onClick({ keyword: '' });
    setCleanBtnShow(false);
  };
  const handleInputChange = (e) => {
    setInputValue((prevFilters) => ({
      ...prevFilters,
      keyword: e.target.value,
    }));
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
        placeholder="關鍵字搜索"
        className={`${styles['search']}`}
        onChange={handleInputChange}
        value={inputValue}
      />
      {cleanBtnShow && (
        <button
          href={'/clean'}
          className={`${styles['icon']} ${styles['icon-cross']}`}
          onClick={handleButtonClick}
        >
          <RxCross2 />
        </button>
      )}
      <button
        onClick={() => onClick({ keyword: inputValue })}
        className={`${styles['icon']} ${styles['icon-search']}`}
      >
        <IoSearch />
      </button>
    </div>
  );
}
