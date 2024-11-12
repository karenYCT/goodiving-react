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
  const [cart, setCart] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [stockWarnings, setStockWarnings] = useState([]);
  // todo 如果沒登入，跳提示然後跳轉登入頁
  const user_id = 1;

  const totalPrice = selectedProducts.reduce((total, p) => {
    return total + p.price * p.quantity;
  }, 0);

  // 結帳按鈕事件
  const handleCheckout = async () => {
    if (selectedProducts.length === 0) {
      alert('請選擇商品');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          selectedProducts,
        }),
      });

      const data = await response.json();

      if (data.order_exist) {
        alert('有未完成訂單，前往完成');
        Router.push('/cart/checkout');
      }

      if (response.ok) {
        const selectedProductIds = selectedProducts.map(
          (product) => product.id
        );
        Router.push('/cart/checkout');
        // 從 cart 中移除已勾選的商品
        setCart((prevCart) =>
          prevCart.filter((product) => !selectedProductIds.includes(product.id))
        );
        // 清空 selectedProducts 狀態
        setSelectedProducts([]);
      } else if (response.status === 400 && data.insufficientStockProducts) {
        // 庫存不足的處理
        const warnings = data.insufficientStockProducts.reduce((acc, item) => {
          // acc[item.vid] = 是物件賦值
          acc[item.vid] = `庫存剩餘${item.availableStock}個`;
          return acc;
          // acc會長這樣 {1: "庫存不足，最多可購買 5 個", 2: "庫存不足，最多可購買 5 個"} 1跟2是vid
        }, {});

        setStockWarnings(warnings);
      }
    } catch (error) {
      console.error('結帳失敗:', error);
      alert('結帳過程中發生錯誤，請稍後再試');
    }
  };

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
            <CartList
              cart={cart}
              setCart={setCart}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              stockWarnings={stockWarnings}
            />
            <div className={styles.checkout}>
              <h4>小計 {formatPrice(totalPrice)} 元</h4>
              <h4 style={{ color: 'var(--02)' }}>
                運費、折扣及其他可能費用將在結帳時計算。
              </h4>
            </div>
          </div>
        </div>
        <div className={styles.checkoutBtn}>
          <Button onClick={handleCheckout} gray={selectedProducts.length === 0}>
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
