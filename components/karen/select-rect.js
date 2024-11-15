import { useState, useRef, useEffect } from 'react';
import styles from './select-rect.module.css';
import { FaAngleDown } from 'react-icons/fa';

export default function SelectRect({
  options = [],
  onChange = () => {},
  option = '',
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false); // 狀態：控制下拉選單是否打開
  const [isSelected, setIsSelected] = useState(false); // 用來追蹤是否已選擇某個選項
  const dropdownRef = useRef(null);

  // 當 option 有值時，設置為已選擇狀態
  useEffect(() => {
    setIsSelected(!!option);
  }, [option]);

  const handleButtonClick = () => {
    console.log('SelectRect: 按鈕被點擊');
    console.log('SelectRect: disabled狀態:', disabled);
    console.log('SelectRect: 當前選項:', option);
    console.log('SelectRect: 可用選項:', options);
    if (!disabled) { // 檢查是否禁用
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (selectedOption) => {
    console.log('SelectRect: 選項被選擇:', selectedOption);
    if (!disabled) { // 檢查是否禁用
      onChange(selectedOption);
      setIsOpen(false);
      setIsSelected(true);
    }
  };
  const handleClickOutside = (event) => {
    // 如果點擊不在 dropdown 元素內，則關閉選單
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // 當選單打開時，添加全域點擊事件監聽器
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // 清理事件監聽器
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);



  return (
    <div className={styles.container} ref={dropdownRef} onClick={() => console.log('SelectRect container clicked')}>
      {/* Button (acts like select) */}
      <button
        className={`${styles.selectButton} 
          ${isOpen ? styles.open : ''} 
          ${isSelected ? styles.selected : ''} 
          ${disabled ? styles.disabled : ''}`} // 添加禁用狀態的樣式
        onClick={handleButtonClick}
        disabled={disabled} // 添加 disabled 屬性
      >
        {/* Placeholder Text */}
        <span className={styles.buttonText}>{option ? option : '請選擇'}</span>
        {/* Icon 2 */}
        <FaAngleDown className={styles.iconRight} />
      </button>

      {/* Select Content */}
      {isOpen && !disabled && (
        <div className={styles.selectContent}>
          <ul className={styles.list}>
            {options.map((option, index) => (
              <li
                key={index}
                className={styles.listItem}
                onClick={() => handleSelect(option)}
                role="presentation"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
