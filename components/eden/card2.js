import { useRouter } from 'next/router';
import styles from './card2.module.css';
import { TiShoppingCart } from 'react-icons/ti';
import Image from 'next/image';
import { formatPrice } from '@/utils/formatPrice';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/auth-context';
import { useUser } from '@/context/user-context';

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
  const { auth, openModal } = useAuth();
  const { setCartQuantity } = useUser();
  const user_id = auth?.user_id;

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleAddToCart = async (pid, title) => {
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
      const data = await response.json();
      // 檢查響應結果
      if (response.ok) {
        if (!data.sameItem) {
          setCartQuantity((prev) => prev + 1);
        }
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
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product.id, product.title);
          }}
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
