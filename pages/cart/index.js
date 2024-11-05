import CartList from '@/components/eden/cart-list';
import { useState, useEffect } from 'react';
import CheckoutFlow from '@/components/eden/checkout-flow';
import Layout from '@/components/layouts/layout';
import styles from './index.module.css';
import Button from '@/components/buttons/btn-icon-right';
import Router from 'next/router';
import { TiShoppingCart } from 'react-icons/ti';

export default function Cart() {
  const fakeCart = {
    products: [
      {
        id: 1,
        title: '商品 A商品 A商品 A商品 A商品 A商品 A商品 A商品 A',
        price: 9.99,
        quantity: 1,
        image: '/example.jpg',
        size: 'ONE SIZE',
        color: '藍色',
      },
      {
        id: 2,
        title: '商品 B',
        price: 19.99,
        quantity: 1,
        image: '/example1.jpg',
        size: 'M',
        color: '黑色',
      },
      {
        id: 3,
        title: '商品 C',
        price: 199.99,
        quantity: 1,
        image: '/example2.jpg',
        size: 'L',
        color: 'ONE COLOR',
      },
    ],
  };
  const [cart, setCart] = useState(fakeCart);

  // 從db載入購物車紀錄
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const response = await fetch('/api/cart');
  //       const cartData = await response.json();
  //       setCart(cartData);
  //     } catch (error) {
  //       console.error('Error fetching cart data:', error);
  //     }
  //   };
  //   fetchCart();
  // }, []); // 只有在初次掛載時運行一次

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
              <h4>小計$NT 999,999 元</h4>
              <h4 style={{ color: 'var(--02)' }}>
                運費、折扣及其他可能費用將在結帳時計算。
              </h4>
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            Router.push('/cart/checkout');
          }}
        >
          前往結帳
        </Button>
      </div>
    </Layout>
  );
}

// todo
// 送出訂單時檢查庫存
// 庫存不足時退回購物車，focus在庫存不足的商品
// 紅字提醒庫存不足
