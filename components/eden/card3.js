import styles from './card3.module.css';
import Image from 'next/image';
import { formatPrice } from '@/utils/formatPrice';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';
import { toast } from 'react-hot-toast';

export default function Card3({
  product = {
    id: 13,
    title: '123',
    price: 0,
    image: '/example.jpg',
    occurrence: 6,
  },
}) {
  const router = useRouter();
  const { auth, openModal } = useAuth();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleAddToCart = async (pid, title) => {
    const user_id = auth?.user_id;

    if (!user_id) {
      toast.error('請先登入會員', {
        style: {
          border: '2px solid #023e8a',
          padding: '16px',
          color: '#023e8a',
          backgroundColor: '#fff',
        },
        iconTheme: {
          primary: '#ff277e',
          secondary: '#fff',
        },
      });
      openModal();
      return;
    }
    try {
      // 發送 POST 請求到 API
      const response = await fetch('http://localhost:3001/cart/quick_add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pid, user_id }),
      });
      // 檢查響應結果
      if (response.ok) {
        toast.success(`${title} \r\n 已加入購物車`, {
          position: 'top-right',
          style: {
            border: '2px solid #023e8a',
            padding: '16px',
            color: '#023e8a',
            backgroundColor: '#fff',
          },
          iconTheme: {
            primary: '#023e8a',
            secondary: '#fff',
          },
        });
      } else {
        toast.error('加入購物車失敗，請重試', {
          style: {
            border: '2px solid #023e8a',
            padding: '16px',
            color: '#023e8a',
            backgroundColor: '#fff',
          },
          iconTheme: {
            primary: '#ff277e',
            secondary: '#fff',
          },
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('加入購物車過程中出錯', {
        style: {
          border: '2px solid #023e8a',
          padding: '16px',
          color: '#023e8a',
          backgroundColor: '#fff',
        },
        iconTheme: {
          primary: '#ff277e',
          secondary: '#fff',
        },
      });
    }
  };

  return (
    <div
      className={styles.card}
      onClick={handleCardClick}
      role="presentation"
      style={{ cursor: 'pointer' }}
    >
      <h6>
        其他 <span style={{ color: '#ff277e' }}>{product.occurrence}</span>{' '}
        人也買了
      </h6>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.title}
          width={250}
          height={250}
          className={styles.productImage}
        />
        <button
          className={styles.addToCartButton}
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product.id, product.title);
          }}
        >
          加入購物車
        </button>
      </div>
      <div className={styles.infoContainer}>
        <h6 className={styles.title}>{product.title}</h6>
        <h6 className={styles.price}>{formatPrice(product.price)}</h6>
      </div>
    </div>
  );
}
