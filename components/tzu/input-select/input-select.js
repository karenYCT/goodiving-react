import { useState } from 'react';
import styles from './input-select.module.css';
import { FaAngleDown, FaListUl } from 'react-icons/fa'; // 引入 icon

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false); // 狀態：控制下拉選單是否打開
  const [selected, setSelected] = useState('初始文字placeholder'); // 狀態：當前選擇的選項

  const options = ['選項 1', '選項 2', '選項 3'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false); // 選擇後關閉下拉選單
  };

  return (
    <div className={styles.dropdown}>
      {/* 使用 button 作為下拉選單的觸發器，並包含 icon */}
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        {/* 左側：icon 和 文字 */}
        <span className={styles.leftContent}>
          <FaListUl className={styles.iconLeft} />
          <span>{selected}</span>
        </span>
        {/* 右側：icon */}
        <FaAngleDown className={styles.iconRight} />
      </button>
      {/* 下拉選單 */}
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
