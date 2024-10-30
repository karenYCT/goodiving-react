import { useState } from 'react';
import styles from './checkout.module.css';
import InputComponent from '@/components/inputs/input-component';
import CheckoutFlow from '@/components/eden/checkout-flow';
import Layout from '@/components/layouts/layout';
import Button from '@/components/buttons/btn-icon-right';
import Router from 'next/router';

export default function CheckoutPage() {
  const [isSameAsBuyer, setIsSameAsBuyer] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('home');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [receiverInfo, setReceiverInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // todo 收貨資訊增加1.收貨方式 2.收貨地址

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
                  <img
                    src="/example.jpg"
                    alt="Product"
                    className={styles.image}
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productName}>商品名稱</div>
                  <div className={styles.sizeColor}>
                    <span className={styles.size}>尺寸: M</span>
                    <span className={styles.color}>顏色: 黑色</span>
                  </div>
                  <div className={styles.quantityPrice}>
                    <span className={styles.quantity}>數量: 2</span>
                    <span className={styles.price}>單價: NT$1000</span>
                  </div>
                  <div className={styles.subtotal}>總價: NT$2000</div>
                </div>
              </div>
              <h4>小計</h4>
            </div>

            <div className={styles.info}>
              <h4>訂購資訊</h4>
              <div>
                <p>姓名</p>
                <InputComponent disabled inputValue={buyerInfo.name} />
              </div>

              <div className={styles.inlineInputs}>
                <div>
                  <p>Email</p>
                  <InputComponent disabled inputValue={buyerInfo.email} />
                </div>
                <div>
                  <p>電話</p>
                  <InputComponent disabled inputValue={buyerInfo.phone} />
                </div>
              </div>

              <h4>收件資訊</h4>
              <div>
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
                <div>
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
                <div>
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
                <div>
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
              {deliveryMethod === 'store' && <button>選擇超商</button>}
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
                <input type="text" placeholder="信用卡號" />
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
              {paymentMethod === 'linepay' && <button>去付款</button>}
            </div>
          </div>

          <div className={styles.amount}>
            <h4>小計NT$ 88,888</h4>
            <h4>運費NT$ 60</h4>
            <h4>合計NT$ 148,888</h4>
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
