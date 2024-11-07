import { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export default function Button({ onClick = () => {}, ariaLabel = '喜歡按鈕' }) {
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = (e) => {
    setIsActive((prev) => !prev);
    setCount((prev) => (isActive ? prev - 1 : prev + 1)); // 點擊時增加或減少計數
    onClick();
    e.stopPropagation();
  };

  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`icon-button ${isActive ? 'active' : ''}`}
    >
      {isActive ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
      <span>{count}</span>
    </button>
  );
}
