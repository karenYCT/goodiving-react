import { useState, useEffect } from 'react';
import styles from './checkout.module.css';
import InputComponent from '@/components/inputs/input-component2';
import CheckoutFlow from '@/components/eden/checkout-flow';
import Layout from '@/components/layouts/layout';
import Button from '@/components/buttons/btn-icon-right';
import Router from 'next/router';
import Image from 'next/image';
import { formatPrice } from '@/utils/formatPrice';

export default function CheckoutPage() {
  const [orders, setOrders] = useState([{}]);
  const [isSameAsBuyer, setIsSameAsBuyer] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('home');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('LINE PAY');
  const [recipientInfo, setRecipientInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const user_id = 1;
  const totalPrice = orders.reduce(
    (total, order) => total + order.price * order.quantity,
    0
  );

  const buyerInfo = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
  };

  // 收件者同購買者checkbox
  const handleCheckboxChange = (e) => {
    setIsSameAsBuyer(e.target.checked);
    if (e.target.checked) {
      setRecipientInfo(buyerInfo);
    } else {
      setRecipientInfo({ name: '', email: '', phone: '' });
    }
  };

  // 送出確認付款事件
  const handleSubmit = async () => {
    // 檢查所有資料皆不為空
    if (
      orders.length === 0 ||
      !shippingMethod ||
      !shippingAddress ||
      !paymentMethod ||
      !recipientInfo.name ||
      !recipientInfo.email ||
      !recipientInfo.phone
    ) {
      alert('請確保所有欄位都已填寫完整');
      return;
    }

    // 發送更新訂單資訊的請求
    try {
      const response = await fetch(`http://localhost:3001/cart/checkout`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orders[0].order_id,
          shipping_method: shippingMethod,
          shipping_address: shippingAddress,
          payment_method: paymentMethod,
          recipient_name: recipientInfo.name,
          recipient_email: recipientInfo.email,
          recipient_phone: recipientInfo.phone,
          totalPrice: totalPrice,
          deliveryFee: 60,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // 做跳轉成功頁
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      console.error('更新訂單失敗:', error);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3001/cart/checkout`, {
          method: 'GET',
          headers: {
            // 'Authorization': `Bearer ${token}` 用JWT傳遞用戶資訊
            'x-user-id': user_id,
          },
        });
        const orderData = await response.json();
        setOrders(orderData);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };
    fetchOrder();
  }, []); // 只有在初次掛載時運行一次

  return (
    <Layout>
      <div className={styles.container}>
        <CheckoutFlow />
        {orders.length > 0 ? (
          <div className={styles['checkout-container']}>
            <div className={styles.detail}>
              <div className={styles.list}>
                <h4>商品清單 </h4>
                {orders.map((order, index) => (
                  <div className={styles.item} key={index}>
                    <div className={styles.imageContainer}>
                      {/* 替換為實際商品圖片 */}
                      <Image
                        src={order.image}
                        alt="Product"
                        className={styles.image}
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <div className={styles.productName}>{order.title}</div>
                      <div className={styles.sizeColor}>
                        <span className={styles.size}>尺寸: {order.size}</span>
                        <span className={styles.color}>
                          顏色: {order.color}
                        </span>
                      </div>
                      <div className={styles.quantityPrice}>
                        <span className={styles.quantity}>
                          數量: {order.quantity}
                        </span>
                        <span className={styles.price}>
                          單價: {formatPrice(order.price)}
                        </span>
                      </div>
                      <div className={styles.subtotal}>
                        總價: {formatPrice(order.price * order.quantity)}
                      </div>
                    </div>
                  </div>
                ))}

                <h4>小計 {formatPrice(totalPrice)}</h4>
              </div>

              <div className={styles.info}>
                <h4>訂購資訊</h4>
                <div className={styles['input-container']}>
                  <p>姓名</p>
                  <InputComponent disabled inputValue={buyerInfo.name} />
                </div>

                <div className={styles.inlineInputs}>
                  <div className={styles['input-container']}>
                    <p>Email</p>
                    <InputComponent disabled inputValue={buyerInfo.email} />
                  </div>
                  <div className={styles['input-container']}>
                    <p>電話</p>
                    <InputComponent disabled inputValue={buyerInfo.phone} />
                  </div>
                </div>

                <h4>收件資訊</h4>
                <div className={styles['input-container']}>
                  <p>姓名</p>
                  <InputComponent
                    inputValue={recipientInfo.name}
                    setInputValue={(newName) => {
                      setRecipientInfo((prevState) => ({
                        ...prevState,
                        name: newName,
                      }));
                    }}
                  />
                </div>

                <div className={styles.inlineInputs}>
                  <div className={styles['input-container']}>
                    <p>Email</p>
                    <InputComponent
                      inputValue={recipientInfo.email}
                      setInputValue={(newEmail) => {
                        setRecipientInfo((prevState) => ({
                          ...prevState,
                          email: newEmail,
                        }));
                      }}
                    />
                  </div>
                  <div className={styles['input-container']}>
                    <p>電話</p>
                    <InputComponent
                      inputValue={recipientInfo.phone}
                      setInputValue={(newPhone) => {
                        setRecipientInfo((prevState) => ({
                          ...prevState,
                          phone: newPhone,
                        }));
                      }}
                    />
                  </div>
                </div>
                <label>
                  <input
                    type="checkbox"
                    checked={isSameAsBuyer}
                    onChange={handleCheckboxChange}
                  />
                  同訂購人資訊
                </label>
              </div>

              <div className={styles.delivery}>
                <h4>運送方式</h4>
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="home"
                    checked
                    onChange={() => setShippingMethod('home')}
                  />
                  宅配
                </label>

                <div className={styles['input-container']}>
                  <p>收貨地址</p>
                  <InputComponent
                    inputValue={shippingAddress}
                    setInputValue={setShippingAddress}
                  />
                </div>
              </div>

              <div className={styles.payment}>
                <h4>付款方式</h4>

                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="linepay"
                    checked
                    onChange={() => setPaymentMethod('linepay')}
                  />
                  Line Pay
                </label>
              </div>
            </div>

            <div className={styles.amount}>
              <div className={styles.total}>
                <h4>小計 {formatPrice(totalPrice)}</h4>
                <h4>運費 {formatPrice(60)}</h4>
                <h4>合計 {formatPrice(totalPrice + 60)}</h4>
              </div>

              <Button onClick={handleSubmit}>確認付款</Button>
            </div>
          </div>
        ) : (
          <h3 style={{ textAlign: 'center', marginTop: '20px' }}>
            沒有待付款的訂單
          </h3>
        )}
      </div>
    </Layout>
  );
}
