import { useState } from 'react';
import styles from './select-ellipse-sm.module.css';
import { FaAngleDown } from 'react-icons/fa';

export default function SelectEllipseSm({
  cart = { products: [] },
  onChange = () => {},
  vid = 0,
}) {
  const [isOpen, setIsOpen] = useState(false); // 狀態：控制下拉選單是否打開
  const [isSelected, setIsSelected] = useState(false); // 用來追蹤是否已選擇某個選項

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
      console.log('Update cart quantity response:', data);
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
    updateCartQuantityOnServer(vid, option);
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
