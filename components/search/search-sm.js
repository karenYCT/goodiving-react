import styles from './search-sm.module.css';
import { IoSearch } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

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
        onClick={() => {
          if (inputValue.trim() === '') {
            toast.error('請輸入關鍵字', {
              style: {
                border: '2px solid #023e8a',
                padding: '16px',
                color: '#023e8a',
                backgroundColor: '#fff',
              },
              iconTheme: {
                primary: '#ff277e',
                secondary: '#fff',
              },
            });
            setInputValue('');
            return;
          }
          onClick({ keyword: inputValue.trim() });
        }}
        className={`${styles['icon']} ${styles['icon-search']}`}
      >
        <IoSearch />
      </button>
    </div>
  );
}
