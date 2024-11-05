import styles from './card3.module.css';
import Image from 'next/image';
import { formatPrice } from '@/utils/formatPrice';

export default function Card3() {
  const product = {
    id: 1,
    title:
      '商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱',
    category: '商品類別',
    description:
      '商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述',
    price: 9.99,
    image: '/example.jpg',
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.title}
          width={250}
          height={250}
          className={styles.productImage}
        />
        <button className={styles.addToCartButton}>加入購物車</button>
      </div>
      <div className={styles.infoContainer}>
        <h6 className={styles.title}>{product.title}</h6>
        <h6 className={styles.price}>{formatPrice(product.price)}</h6>
      </div>
    </div>
  );
}
