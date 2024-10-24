import { useRouter } from 'next/router';
import styles from './card1.module.css';
import { useState } from 'react';
import { TiShoppingCart } from 'react-icons/ti';

export default function Card2() {
  const router = useRouter();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // 假裝product資料
  const product = {
    id: 1,
    title:
      '商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱',
    category: '商品類別',
    description:
      '商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述',
    price: 9.99,
    // image: 'https://example.com/product-image.jpg',
  };

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click event
    setIsAddedToCart(true);
    // 模擬添加到購物車的邏輯，這裡可以放入真正的購物車邏輯
    alert(`${product.title} 已添加到購物車!`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      {/* 商品照片 */}
      <div className={styles.productImage}>
        <img src="/example.jpg" alt={product.title} />
        <span className={styles.cartIcon} onClick={handleAddToCart}>
          <TiShoppingCart />
        </span>
      </div>
      {/* 商品資訊 */}
      <div className={styles.productInfo}>
        <span className={styles.category}>{product.category}</span>
        <h2 className={styles.title}>{product.title}</h2>
        <span className={styles.price}>${product.price}</span>
      </div>
    </div>
  );
}
