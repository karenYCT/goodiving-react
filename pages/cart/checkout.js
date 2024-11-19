import { useState, useEffect, useRef } from 'react';
import styles from './checkout.module.css';
import InputComponent from '@/components/inputs/input-component2';
import CheckoutFlow from '@/components/eden/checkout-flow';
import Layout from '@/components/layouts/layout';
import ButtonR from '@/components/buttons/btn-icon-right';
import ButtonL from '@/components/buttons/btn-icon-left';
import Image from 'next/image';
import { formatPrice } from '@/utils/formatPrice';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/auth-context';
import { FaCircleExclamation } from 'react-icons/fa6';

export default function CheckoutPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([{}]);
  const [buyerInfo, setBuyerInfo] = useState({});
  const [isSameAsBuyer, setIsSameAsBuyer] = useState(false);
  const [isSameAsBuyer2, setIsSameAsBuyer2] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('home');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('LINE PAY');
  const [recipientInfo, setRecipientInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const { auth } = useAuth();
  const user_id = auth?.user_id;
  const totalPrice = orders.reduce(
    (total, order) => total + order.price * order.quantity,
    0
  );

  // const buyerInfo = {
  //   name: 'John Doe',
  //   email: 'john@example.com',
  //   phone: '123-456-7890',
  //   address: '123 Main St, Anytown, USA',
  // };

  // 收件者同購買者checkbox
  const handleCheckboxChange = (e) => {
    setIsSameAsBuyer(e.target.checked);
    if (e.target.checked) {
      setRecipientInfo(buyerInfo);
    } else {
      setRecipientInfo({ name: '', email: '', phone: '' });
    }
  };

  const handleCheckboxChange2 = (e) => {
    setIsSameAsBuyer2(e.target.checked);
    if (e.target.checked) {
      setShippingAddress(buyerInfo.address);
    } else {
      setShippingAddress('');
    }
  };

  // 取消訂單回到購物車編輯
  const handleRollback = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/cart/checkout/rollback',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user_id,
            orderId: orders[0].order_id,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        router.push('/cart'); // 跳轉回購物車頁面
      } else {
        toast.error(data.message || '返回修改失敗', {
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
      console.error('返回修改過程中發生錯誤:', error);
      toast.error('返回修改過程中發生錯誤', {
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

  // 送出確認付款事件
  const handleSubmit = async () => {
    // 檢查所有資料皆不為空
    if (!recipientInfo.name) {
      nameRef.current.focus();
      toast.error('請填寫收件者姓名', {
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

    if (!recipientInfo.email) {
      emailRef.current.focus();
      toast.error('請填寫收件者email', {
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

    if (!recipientInfo.phone) {
      phoneRef.current.focus();
      toast.error('請填寫收件者電話', {
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

    if (!shippingAddress) {
      addressRef.current.focus();
      toast.error('請填寫收件地址', {
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
        window.location.href = data.paymentUrl;
      } else {
        toast.error(`支付請求失敗: ${data.message}`, {
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
      console.error('支付請求失敗:', error);
    }
  };

  // 讀取用戶訂單資料
  useEffect(() => {
    if (!user_id) {
      router.push('/');
      return;
    }

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

  // 讀取用戶基本資料
  useEffect(() => {
    if (!user_id) {
      router.push('/');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/cart/checkout/user`,
          {
            method: 'GET',
            headers: {
              // 'Authorization': `Bearer ${token}` 用JWT傳遞用戶資訊
              'x-user-id': user_id,
            },
          }
        );
        const userData = await response.json();
        setBuyerInfo(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserInfo();
  }, []);

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
                    refProp={nameRef}
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
                      refProp={emailRef}
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
                      refProp={phoneRef}
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
                    style={{ marginRight: '10px' }}
                  />
                  同訂購人資訊
                </label>
              </div>

              <div className={styles.delivery}>
                <h4>運送方式</h4>
                <label>
                  <input
                    style={{ marginRight: '10px' }}
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
                    refProp={addressRef}
                    inputValue={shippingAddress}
                    setInputValue={setShippingAddress}
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={isSameAsBuyer2}
                      onChange={handleCheckboxChange2}
                      style={{ marginTop: '15px', marginRight: '10px' }}
                    />
                    同訂購人資訊
                  </label>
                </div>
              </div>

              <div className={styles.payment}>
                <h4>付款方式</h4>
                <label>
                  <input
                    style={{ marginRight: '10px' }}
                    type="radio"
                    name="payment"
                    value="linepay"
                    checked
                    onChange={() => setPaymentMethod('linepay')}
                  />
                  Line Pay
                </label>
                <div className={styles.warning}>
                  <p>
                    <FaCircleExclamation />
                    &nbsp; 退貨政策
                  </p>
                  <div className={styles.warningItem}>
                    <p>
                      &nbsp; ．商品收到日起 7 天(含)內，可免費退貨，無需說明理由
                    </p>
                    <p>&nbsp; ．商品收到日起 7 天後，將不接受退貨，概不退費</p>
                    <p>
                      &nbsp;
                      ．已使用過的潛水裝備，出於衛生與安全考量，恕不接受退貨
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.amount}>
              <div className={styles.total}>
                <h4>小計 {formatPrice(totalPrice)}</h4>
                <h4>運費 {formatPrice(60)}</h4>
                <h4>合計 {formatPrice(totalPrice + 60)}</h4>
              </div>
              <div className={styles['btn-container']}>
                <ButtonL onClick={handleRollback}>回購物車</ButtonL>
                <ButtonR onClick={handleSubmit}>確認付款</ButtonR>
              </div>
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
