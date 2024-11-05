import styles from './product-description.module.css';
import { useState } from 'react';
import SelectRect3 from '../dropdown/select-rect3';

export default function ProductDescription({
  title = '商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱',
  description = '商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述',
  price = 'NT$ 1200',
  variants = [
    { size: 'S', color: '藍色', stock: 50 },
    { size: 'M', color: '黃色', stock: 10 },
    { size: 'M', color: '黑色', stock: 0 },
    { size: 'L', color: '黑色', stock: 0 },
  ],
}) {
  const [selectedSize, setSelectedSize] = useState(''); // 初始狀態為未選擇尺寸
  const [selectedColor, setSelectedColor] = useState(''); // 初始狀態為未選擇顏色
  // 取得所有尺寸選項，並去重
  const sizes = [...new Set(variants.map((variant) => variant.size))];
  // 根據選中的尺寸過濾可選顏色，並檢查庫存情況
  const getColorOptions = (size) => {
    return variants
      .filter((variant) => variant.size === size)
      .map((variant) => ({
        color: variant.color,
        isDisabled: variant.stock === 0,
      }));
  };
  // 檢查尺寸是否所有顏色庫存均為0(返回布林值)
  const isSizeDisabled = (size) => {
    return variants
      .filter((variant) => variant.size === size)
      .every((variant) => variant.stock === 0);
  };

  // 根據當前選擇的尺寸和顏色，查找對應的庫存
  const getStockMessage = (size, color) => {
    const variant = variants.find((v) => v.size === size && v.color === color);
    if (!variant) return ''; // 如果找不到對應的變體，返回空
    if (variant.stock >= 10) return '庫存充足';
    if (variant.stock > 0 && variant.stock < 10) return '小於10件';
    if (variant.stock === 0) return '無庫存';
    return '';
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setSelectedColor(''); // 重置顏色選擇
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className={styles.container}>
      {/* 商品名稱 */}
      <h3 className={styles.title}>{title}</h3>

      {/* 商品內文 */}
      <p className={styles.description}>{description}</p>

      {/* 價格 */}
      <h4 className={styles.price}>NT${price}</h4>

      {/* 尺寸 */}
      <div className={styles.sizes}>
        <h5>尺寸：</h5>
        {sizes.map((size, index) => (
          <button
            key={index}
            className={`${styles.sizeButton} ${
              isSizeDisabled(size) ? styles.disabledButton : ''
            } ${selectedSize === size ? styles.active : ''}`}
            onClick={() => handleSizeClick(size)}
            disabled={isSizeDisabled(size)}
          >
            {size}
          </button>
        ))}
      </div>

      {/* 顏色 */}

      <div className={styles.color}>
        <h5>顏色：</h5>
        <SelectRect3
          options={getColorOptions(selectedSize)}
          onChange={handleColorChange}
          option={selectedColor}
        />
      </div>

      {/* 庫存提示 依照商品屬性顯示*/}
      {selectedSize && selectedColor && (
        <h5 className={styles.stock}>
          <p>{getStockMessage(selectedSize, selectedColor)}</p>
        </h5>
      )}

      {/* 加入購物車 */}
      <button className={styles.addToCart}>加入購物車</button>
    </div>
  );
}
