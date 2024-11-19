import { useState, useRef, useEffect } from 'react';
import styles from './select-rect.module.css';
import { FaAngleDown } from 'react-icons/fa';

export default function SelectRect({
  options = [],
  onChange = () => {},
  option = '',
  placeholder = '請選擇',
  disabled = false,
  error = false,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(!!option);
  const selectRef = useRef(null);

  // 處理點擊外部關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 當 option prop 改變時更新 isSelected 狀態
  useEffect(() => {
    setIsSelected(!!option);
  }, [option]);

  const handleButtonClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (selectedOption) => {
    if (selectedOption !== option) {
      onChange(selectedOption);
      setIsSelected(true);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div 
      className={`${styles.container} ${className}`} 
      ref={selectRef}
    >
      <button
        className={`${styles.selectButton} 
          ${isOpen ? styles.open : ''} 
          ${isSelected ? styles.selected : ''} 
          ${disabled ? styles.disabled : ''} 
          ${error ? styles.error : ''}`}
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        type="button"
      >
        <span className={styles.buttonText}>
          {option || placeholder}
        </span>
        <FaAngleDown 
          className={`${styles.iconRight} ${isOpen ? styles.iconRotate : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div 
          className={styles.selectContent}
          role="listbox"
        >
          <ul className={styles.list}>
            {options.map((optionItem, index) => (
              <li
                key={index}
                className={`${styles.listItem} 
                  ${optionItem === option ? styles.selected : ''}`}
                onClick={() => handleSelect(optionItem)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(optionItem);
                  }
                }}
                role="option"
                aria-selected={optionItem === option}
                tabIndex={0}
              >
                {optionItem}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}