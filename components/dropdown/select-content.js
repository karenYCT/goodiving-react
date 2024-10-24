import { useState } from 'react';
import styles from './select-content.module.css';
import { FaAngleDown, FaListUl } from 'react-icons/fa';

export default function SelectContent() {
  const [isOpen, setIsOpen] = useState(false); // 狀態：控制下拉選單是否打開
  const [selected, setSelected] = useState('初始文字'); // 狀態：當前選擇的選項
  const [isSelected, setIsSelected] = useState(false); // 用來追蹤是否已選擇某個選項

  const options = ['選項 1', '選項 2', '選項 3'];

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelected(option); // 更新當前選中的選項
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
        <span className={styles.buttonText}>{selected}</span>
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
