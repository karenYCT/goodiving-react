import styles from './product-description.module.css';
import { useState } from 'react';
import SelectRect from '../dropdown/select-rect';

export default function ProductDescription({
  name = '商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱',
  description = '商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述',
  price = 'NT$ 1200',
  sizes = [
    { label: 'S', quantity: 10 },
    { label: 'M', quantity: 8 },
    { label: 'L', quantity: 0 },
  ],
  colors = ['紅色', '藍色', '黑色'],
  stock = '9',
}) {
  const [selectedSize, setSelectedSize] = useState(''); // 初始狀態為未選擇尺寸
  const [selectedColor, setSelectedColor] = useState(''); // 初始狀態為未選擇顏色

  // 點擊尺寸按鈕時，更新選中的尺寸並設置 active 狀態
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  // 點擊顏色選項時，更新選中的顏色
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className={styles.container}>
      {/* 商品名稱 */}
      <h3 className={styles.title}>{name}</h3>

      {/* 商品內文 */}
      <p className={styles.description}>{description}</p>

      {/* 價格 */}
      <h4 className={styles.price}>{price}</h4>

      {/* 尺寸 */}
      {sizes && (
        <div className={styles.sizes}>
          <h5>尺寸：</h5>
          {sizes.map((size, index) => (
            <button
              key={index}
              className={`${styles.sizeButton} ${
                size.quantity === 0 ? styles.disabledButton : ''
              } ${selectedSize === size.label ? styles.active : ''}`}
              onClick={() => handleSizeClick(size.label)}
              disabled={size.quantity === 0}
            >
              {size.label}
            </button>
          ))}
        </div>
      )}

      {/* 顏色 */}
      {colors && (
        <div className={styles.color}>
          <h5>顏色：</h5>
          <SelectRect
            options={colors}
            onChange={handleColorChange}
            option={selectedColor}
          />
        </div>
      )}

      {/* 庫存提示 */}
      <h5 className={styles.stock}>
        {stock >= 10 ? '庫存充足' : stock > 0 ? '庫存小於10件' : '目前無庫存'}
      </h5>

      {/* 加入購物車 */}
      <button className={styles.addToCart}>加入購物車</button>
    </div>
  );
}
