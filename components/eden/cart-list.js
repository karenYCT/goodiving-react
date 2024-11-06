import { useState } from 'react';
import styles from './cart-list.module.css';
import SelectEllipseSm from './select-ellipse-sm';
import Image from 'next/image';
import { formatPrice } from '@/utils/formatPrice';
import router from 'next/router';

export default function CartList({ cart = [], setCart = () => {} }) {
  // 商品選擇的狀態
  const [selectedProducts, setSelectedProducts] = useState([]);

  // 全選/取消全選功能
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allProductIds = cart.map((product) => product.vid);
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts([]);
    }
  };

  // 單個商品選擇功能
  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.checkbox}>
            <input type="checkbox" onChange={handleSelectAll} />
          </th>
          <th></th>
          <th>商品資料</th>
          <th>售價</th>
          <th>尺寸/顏色</th>
          <th>數量</th>
          <th>小計</th>
          <th className={styles.delete}>操作</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {cart.map((product) => (
          <tr key={product.vid}>
            {/* Checkbox */}
            <td className={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.vid)}
                onChange={() => handleSelectProduct(product.vid)}
              />
            </td>
            {/* 圖片 */}
            <td
              onClick={() => {
                router.push(`/products/${product.id}`);
              }}
              style={{ cursor: 'pointer' }}
            >
              {' '}
              <div className={styles.imageContainer}>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={120}
                  height={120}
                  className={styles.productImage}
                />
              </div>
            </td>
            {/* 商品資料 */}
            <td>
              <h5 className={styles.title}>{product.title}</h5>
            </td>

            {/* 單件價格 */}
            <td className={styles.price}>{formatPrice(product.price)}</td>

            {/* 尺寸/顏色 */}
            <td className={styles.size}>
              <p>尺寸：{product.size}</p>
              <p>顏色：{product.color}</p>
            </td>

            {/* 數量 */}
            <td>
              <SelectEllipseSm
                vid={product.vid}
                cart={cart}
                onChange={setCart}
              />
            </td>

            {/* 小計 */}
            <td className={styles.total}>
              {formatPrice(product.price * product.quantity)}
            </td>

            {/* 刪除按鈕 */}
            <td className={styles.delete}>
              <button>刪除</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
