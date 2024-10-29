import CartList from '@/components/eden/cart-list';
import { useState, useEffect } from 'react';
import CheckoutFlow from '@/components/eden/checkout-flow';

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
    <>
      <CheckoutFlow />
      <div style={{ width: '1140px', margin: '0 auto' }}>
        <CartList cart={cart} setCart={setCart} />
      </div>
    </>
  );
}

// todo
// 送出訂單時檢查庫存
// 庫存不足時退回購物車，focus在庫存不足的商品
// 紅字提醒庫存不足
