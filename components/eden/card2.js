import { useRouter } from 'next/router';
import styles from './card2.module.css';
import { useState } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import Image from 'next/image';
import { formatPrice } from '@/utils/formatPrice';

export default function Card2({
  product = {
    id: 1,
    title: '',
    category: '',
    description: '',
    price: 0,
    image: '',
  },
}) {
  const router = useRouter();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click event
    setIsAddedToCart(true);
    // 模擬添加到購物車的邏輯，這裡可以放入真正的購物車邏輯
    alert(`${product.title} 已添加到購物車!`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick} role="presentation">
      {/* 商品照片 */}
      <div className={styles.productImage}>
        <Image
          src={product.image}
          alt={product.title}
          width={250}
          height={250}
        />
        <span
          className={styles.cartIcon}
          onClick={handleAddToCart}
          role="presentation"
        >
          <TiShoppingCart />
        </span>
      </div>
      {/* 商品資訊 */}
      <div className={styles.productInfo}>
        <span className={styles.category}>{product.category}</span>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.price}>
          <span>{formatPrice(product.price)}</span>
          <span className={styles.link}>查看商品詳情</span>
        </div>
      </div>
    </div>
  );
}
