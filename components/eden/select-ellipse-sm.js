import { useState, useRef, useEffect } from 'react';
import styles from './select-ellipse-sm.module.css';
import { FaAngleDown } from 'react-icons/fa';

export default function SelectEllipseSm({
  cart = { products: [] },
  onChange = () => {},
  vid = 0,
  selectedProducts = [],
  setSelectedProducts = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false); // 狀態：控制下拉選單是否打開
  const [isSelected, setIsSelected] = useState(false); // 用來追蹤是否已選擇某個選項
  const dropdownRef = useRef(null);
  const options = [1, 2, 3, 4, 5];

  const item = cart.find((item) => item.vid === vid);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  // 更新db的購物車數量
  const updateCartQuantityOnServer = async (vid, newQuantity) => {
    try {
      const response = await fetch(
        'http://localhost:3001/cart/updateQuantity',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vid: vid,
            quantity: newQuantity,
          }),
        }
      );
      const data = await response.json();
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const handleSelect = (option) => {
    onChange(
      cart.map((product) =>
        product.vid === vid ? { ...product, quantity: option } : product
      )
    );
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.vid === vid ? { ...product, quantity: option } : product
      )
    );
    updateCartQuantityOnServer(vid, option);
    setIsOpen(false); // 選擇後關閉下拉選單
    setIsSelected(true); // 設置為已選擇狀態，更新按鈕樣式
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
    <div className={styles.container} ref={dropdownRef}>
      {/* Button (acts like select) */}
      <button
        className={`${styles.selectButton} ${isOpen ? styles.open : ''} ${
          isSelected ? styles.selected : ''
        }`}
        onClick={handleButtonClick}
      >
        {/* Placeholder Text */}
        <span className={styles.buttonText}>{item.quantity}</span>
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
