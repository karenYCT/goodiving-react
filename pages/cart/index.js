import CartList from '@/components/eden/cart-list';
import { useState, useEffect } from 'react';
import CheckoutFlow from '@/components/eden/checkout-flow';
import Layout from '@/components/layouts/layout';
import styles from './index.module.css';
import Button from '@/components/buttons/btn-icon-right';
import Router from 'next/router';
import { TiShoppingCart } from 'react-icons/ti';
import { formatPrice } from '@/utils/formatPrice';
import { toast } from 'react-hot-toast';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useAuth } from '@/context/auth-context';

export default function CartPage() {
  const { auth } = useAuth();
  const user_id = auth?.user_id;
  const [cart, setCart] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [stockWarnings, setStockWarnings] = useState([]);
  // todo 如果沒登入，跳提示然後跳轉登入頁
  const totalPrice = selectedProducts.reduce((total, p) => {
    return total + p.price * p.quantity;
  }, 0);

  // 結帳按鈕事件
  const handleCheckout = async () => {
    if (selectedProducts.length === 0) {
      toast.error('請選擇商品', {
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
        toast(
          <div>
            <div style={{ margin: '20px 20px 50px 20px', fontSize: '24px' }}>
              您有未完成的訂單！
            </div>

            {/* 兩個按鈕 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <button
                onClick={() => {
                  toast.dismiss();
                  Router.push('/products');
                }}
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  border: '2px solid #023e8a',
                  backgroundColor: '#fff',
                  color: '#023e8a',
                  borderRadius: '50px',
                }}
              >
                繼續購物
              </button>
              <button
                onClick={() => {
                  toast.dismiss();
                  Router.push('/cart/checkout');
                }}
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  border: '2px solid #023e8a',
                  backgroundColor: '#023e8a',
                  color: '#fff',
                  borderRadius: '50px',
                }}
              >
                前往結帳
              </button>
            </div>

            {/* 自定義關閉按鈕 */}
            <button
              onClick={() => toast.dismiss()} // 點擊後關閉 Toast
              style={{
                position: 'absolute',
                top: '3px',
                right: '0px',
                padding: '5px 10px',
                color: '#ff277e',
                border: 'none',
                cursor: 'pointer',
                fontSize: '32px',
              }}
            >
              <IoCloseCircleOutline />
            </button>
          </div>,
          {
            duration: Infinity, // 不會消失
            style: {
              border: '2px solid #023e8a',
              backgroundColor: '#fff',
              color: '#023e8a',
              borderRadius: '6px',
              padding: '20px',
            },
          }
        );
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
          // acc長這樣 {1: "庫存不足，最多可購買 5 個", 2: "庫存不足，最多可購買 5 個"} 1跟2是vid
        }, {});

        setStockWarnings(warnings);
      }
    } catch (error) {
      console.error('結帳失敗:', error);
      toast.error('結帳過程中發生錯誤，請稍後再試', {
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
