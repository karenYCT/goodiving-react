import CartList from '@/components/eden/cart-list';
import { useState, useEffect } from 'react';
import CheckoutFlow from '@/components/eden/checkout-flow';
import Layout from '@/components/layouts/layout';
import styles from './index.module.css';
import Button from '@/components/buttons/btn-icon-right';
import Router from 'next/router';
import { TiShoppingCart } from 'react-icons/ti';
import { formatPrice } from '@/utils/formatPrice';

export default function CartPage() {
  const [cart, setCart] = useState([
    {
      id: 0,
      vid: 0,
      title: '',
      price: 0,
      quantity: 1,
      image: '/example.jpg',
      size: '',
      color: '',
    },
  ]);
  const user_id = 1;

  // 從db載入購物車紀錄
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:3001/cart/${user_id}`);
        const cartData = await response.json();
        setCart(cartData);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchCart();
  }, []); // 只有在初次掛載時運行一次

  return (
    <Layout>
      <div className={styles.container}>
        <CheckoutFlow />
        <div className={styles.main}>
          <div className={styles.check}>
            <TiShoppingCart />
            <h4>購物清單</h4>
          </div>
          <div className={styles.content}>
            <CartList cart={cart} setCart={setCart} />
            <div className={styles.checkout}>
              <h4>小計 {formatPrice(9999)} 元</h4>
              <h4 style={{ color: 'var(--02)' }}>
                運費、折扣及其他可能費用將在結帳時計算。
              </h4>
            </div>
          </div>
        </div>
        <div className={styles.checkoutBtn}>
          <Button
            onClick={() => {
              Router.push('/cart/checkout');
            }}
          >
            前往結帳
          </Button>
        </div>
      </div>
    </Layout>
  );
}

// todo
// 送出訂單時檢查庫存
// 庫存不足時退回購物車，focus在庫存不足的商品
// 紅字提醒庫存不足
