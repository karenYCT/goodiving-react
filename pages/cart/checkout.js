import { useState } from 'react';
import styles from './checkout.module.css';
import InputComponent from '@/components/inputs/input-component2';
import CheckoutFlow from '@/components/eden/checkout-flow';
import Layout from '@/components/layouts/layout';
import Button from '@/components/buttons/btn-icon-right';
import Router from 'next/router';
import Image from 'next/image';

export default function CheckoutPage() {
  const [isSameAsBuyer, setIsSameAsBuyer] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('home');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [receiverInfo, setReceiverInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const order = {
    image: '/example.jpg',
    title: '商品名稱',
    price: 99.99,
    quantity: 1,
    size: 'M',
    color: '藍色',
    total: 999.99,
  };

  const buyerInfo = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
  };

  // 收件者同購買者checkbox
  const handleCheckboxChange = (e) => {
    setIsSameAsBuyer(e.target.checked);
    if (e.target.checked) {
      setReceiverInfo(buyerInfo);
    } else {
      setReceiverInfo({ name: '', email: '', phone: '' });
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <CheckoutFlow />
        <div className={styles['checkout-container']}>
          <div className={styles.detail}>
            <div className={styles.list}>
              <h4>商品清單 </h4>
              <div className={styles.item}>
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
                    <span className={styles.color}>顏色: {order.color}</span>
                  </div>
                  <div className={styles.quantityPrice}>
                    <span className={styles.quantity}>
                      數量: {order.quantity}
                    </span>
                    <span className={styles.price}>單價: NT${order.price}</span>
                  </div>
                  <div className={styles.subtotal}>總價: NT${order.total}</div>
                </div>
              </div>
              <div className={styles.item}>
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
                    <span className={styles.color}>顏色: {order.color}</span>
                  </div>
                  <div className={styles.quantityPrice}>
                    <span className={styles.quantity}>
                      數量: {order.quantity}
                    </span>
                    <span className={styles.price}>單價: NT${order.price}</span>
                  </div>
                  <div className={styles.subtotal}>總價: NT${order.total}</div>
                </div>
              </div>

              <h4>小計 NT${order.total}</h4>
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
                  inputValue={receiverInfo.name}
                  setInputValue={(newName) => {
                    setReceiverInfo((prevState) => ({
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
                    inputValue={receiverInfo.email}
                    setInputValue={(newEmail) => {
                      setReceiverInfo((prevState) => ({
                        ...prevState,
                        email: newEmail,
                      }));
                    }}
                  />
                </div>
                <div className={styles['input-container']}>
                  <p>電話</p>
                  <InputComponent
                    inputValue={receiverInfo.phone}
                    setInputValue={(newPhone) => {
                      setReceiverInfo((prevState) => ({
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
                  checked={deliveryMethod === 'home'}
                  onChange={() => setDeliveryMethod('home')}
                />
                宅配
              </label>
              {deliveryMethod === 'home' && (
                <div className={styles['input-container']}>
                  <p>收貨地址</p>
                  <InputComponent />
                </div>
              )}
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="store"
                  checked={deliveryMethod === 'store'}
                  onChange={() => setDeliveryMethod('store')}
                />
                超商取貨
              </label>
              {deliveryMethod === 'store' && <Button>選擇超商</Button>}
            </div>

            <div className={styles.payment}>
              <h4>付款方式</h4>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={paymentMethod === 'credit'}
                  onChange={() => setPaymentMethod('credit')}
                />
                信用卡
              </label>
              {paymentMethod === 'credit' && (
                <div className={styles['input-container']}>
                  <InputComponent />
                </div>
              )}
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="linepay"
                  checked={paymentMethod === 'linepay'}
                  onChange={() => setPaymentMethod('linepay')}
                />
                Line Pay
              </label>
              {paymentMethod === 'linepay' && <Button>去付款</Button>}
            </div>
          </div>

          <div className={styles.amount}>
            <div className={styles.total}>
              <h4>小計NT$ 88,888</h4>
              <h4>運費NT$ 60</h4>
              <h4>合計NT$ 148,888</h4>
            </div>

            <Button
              onClick={() => {
                Router.push('/cart/complete');
              }}
            >
              結帳
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
