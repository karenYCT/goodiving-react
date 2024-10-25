import styles from './product-description.module.css';

export default function ProductDescription({
  name = '商品名稱商品名稱商品名稱',
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
              }`}
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
          <select>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
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
