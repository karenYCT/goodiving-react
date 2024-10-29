import styles from './search-4-sm.module.css';
import { IoSearch } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';

export default function Search4sm({
  inputValue = '',
  setInputValue = () => {},
  onClick = () => {},
}) {
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
        onClick={onClick}
        className={`${styles['icon']} ${styles['icon-search']}`}
      >
        <IoSearch />
      </button>
    </div>
  );
}
