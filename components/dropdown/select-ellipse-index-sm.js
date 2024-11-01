import { useState } from 'react';
import styles from './select-ellipse-index-sm.module.css';
import { FaAngleDown, FaListUl } from 'react-icons/fa';

export default function SelectEllipseIndex({
  options = [],
  onChange = () => {},
  option = '',
}) {
  const [isOpen, setIsOpen] = useState(false); // 狀態：控制下拉選單是否打開
  const [isSelected, setIsSelected] = useState(false); // 用來追蹤是否已選擇某個選項

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false); // 選擇後關閉下拉選單
    setIsSelected(true); // 設置為已選擇狀態，更新按鈕樣式
  };

  return (
    <div className={styles.container}>
      {/* Button (acts like select) */}
      <button
        className={`${styles.selectButton} ${isOpen ? styles.open : ''} ${
          isSelected ? styles.selected : ''
        }`}
        onClick={handleButtonClick}
      >
        {/* Icon 1 */}
        <FaListUl className={styles.iconLeft} />
        {/* Placeholder Text */}
        <span className={styles.buttonText}>{option ? option : '請選擇'}</span>
        {/* Icon 2 */}
        <FaAngleDown className={styles.iconRight} />
      </button>

      {/* Select Content */}
      {isOpen && (
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
