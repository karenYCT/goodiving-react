import React, { useState, useEffect } from 'react';
import styles from './step.module.css';
import Layout from '@/components/layouts/layout';
import CheckoutFlow from '@/components/tzu/checkout-flow';
import InputComponent from '@/components/inputs/input-component2';
import Card from '@/components/tzu/card-booking';
import {
  FaRegSquare,
  FaCheckSquare,
  FaRegCircle,
  FaRegDotCircle,
} from 'react-icons/fa';
import { FaCircleExclamation } from 'react-icons/fa6';
import { useRouter } from 'next/router';
import Button from '@/components/buttons/btn-icon-right';
import { API_SERVER } from '@/configs/api-path';
import { MEMBER_LIST } from '@/configs/api-path';
import { LESSON_ONE } from '@/configs/api-path';
import { useAuth } from '@/context/auth-context';
import { formatPrice } from '@/utils/formatPrice';
import { toast } from 'react-hot-toast';

export default function Step() {
  const router = useRouter();
  const { auth } = useAuth();
  const [userData, setUserData] = useState({});

  const [lesson, setLesson] = useState({});
  const [isDiscount, setIsDiscount] = useState(false);

  const [currentStep, setCurrentStep] = useState(1); // 步驟控制狀態
  const [isCheck1, setIsCheck1] = useState(false);
  const [isCheck2, setIsCheck2] = useState(false);

  const [orderId, setOrderId] = useState(null); // 新增: 存儲訂單ID
  // const [orderData, setOrderData] = useState(null); // 儲存訂單資料
  // const [paymentError, setPaymentError] = useState('');

  const handleIsDiscount = () => {
    setIsDiscount(!isDiscount);
  };

  const totalPrice = isDiscount
    ? Number(lesson.round_price) - Number(userData.user_point)
    : Number(lesson.round_price);

  const orderPoint = Math.floor(totalPrice * 0.01);

  // 處理選擇支付方式
  const handleIsCheck1 = () => {
    setIsCheck1(!isCheck1);
    isCheck2 && setIsCheck2(false);
  };

  const handleIsCheck2 = () => {
    setIsCheck2(!isCheck2);
    isCheck1 && setIsCheck1(false);
  };

  // 處理付款方式提交
  // const handlePayment = async () => {
  //   // 驗證是否選擇付款方式
  //   if (!isCheck1 && !isCheck2) {
  //     setPaymentError('請選擇付款方式');
  //     return;
  //   }

  //   try {
  //     // 確定付款方式
  //     const payment_method = isCheck1 ? 'LINE_PAY' : 'CREDIT_CARD';

  //     const response = await fetch(
  //       `${API_SERVER}/order/${orderData.id}/payment`,
  //       {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ payment_method }),
  //         credentials: 'include',
  //       }
  //     );

  //     const result = await response.json();

  //     if (result.success) {
  //       // 更新成功，導向下一步
  //       router.push(`/lesson/${lesson.id}/booking/complete`);
  //     } else {
  //       setPaymentError(result.message || '更新付款方式失敗');
  //     }
  //   } catch (error) {
  //     console.error('付款方式更新錯誤:', error);
  //     setPaymentError('系統錯誤，請稍後再試');
  //   }
  // };

  // 修改: 處理付款確認
  const handlePayment = () => {
    if (!orderId) {
      toast.error('訂單資訊遺失，請重新下單');
      return;
    }

    if (!isCheck1 && !isCheck2) {
      toast.error('請選擇付款方式');
      return;
    }

    router.push(
      `http://localhost:3001/ecpay-test-only?amount=${totalPrice}&order_id=${orderId}&round_id=${lesson.round_id}`
      // `/lesson/${lesson.round_id}/booking/complete?order_id=${orderId}`
    );
  };

  const validData = () => {
    if (!auth.user_id) {
      toast.error('尚未登入，請重新登入');
      return false;
    }
    if (!lesson.round_id) {
      toast.error('缺少課程資訊，請重新選擇課程');
      router.push(`/lesson`);
      return false;
    }
    if (totalPrice < 0) {
      toast.error('付款金額計算錯誤');
      return false;
    }
    return true;
  };

  // 新增訂單
  const handleBooking = async () => {
    if (!validData()) return;
    const confirmSubmit = window.confirm('確認送出訂單？');
    if (!confirmSubmit) return;

    try {
      const orderData = {
        round_id: lesson.round_id,
        user_id: auth.user_id,
        order_point: orderPoint,
        order_price: totalPrice,
      };

      // console.log('Sending order data:', orderData); // 除錯用

      const response = await fetch(
        `${API_SERVER}/lesson/${lesson.round_id}/booking/step`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
          credentials: 'include',
        }
      );

      const result = await response.json();
      // console.log('API Response:', result); // 除錯用

      if (result.success) {
        // 檢查 result.data 的結構
        // console.log('Order created successfully:', result.data);

        // 儲存訂單資料到狀態供後續使用
        setOrderId(result.orderId);
        toast.success('訂單建立成功，請選擇付款方式');
        // 不跳轉，改為更改當前步驟
        setCurrentStep(2);
      } else {
        // 處理錯誤情況
        toast.error('訂單建立失敗：' + (result.message || '請稍後再試'));
      }
    } catch (error) {
      console.error('訂單提交錯誤:', error);
      toast.error('系統錯誤，請稍後再試');
    }
  };

  // 取得會員資料
  useEffect(() => {
    const user_id = auth.user_id;
    const findUserData = async () => {
      try {
        if (user_id) {
          const response = await fetch(MEMBER_LIST, {
            method: 'POST',
            body: JSON.stringify({ user_id }),
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          let result = await response.json();
          if (result) {
            setUserData(result);
          }
          console.log(
            '看一下uerConext回應的result:',
            JSON.stringify(result, null, 4)
          );
        } else {
          return console.log('uerConext沒有取得 user_id，所以沒有資料！');
        }
      } catch (error) {
        console.log(error);
      }
    };
    findUserData();
  }, [auth.user_id]);

  // 取得課程資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(LESSON_ONE + router.query.pid);
        const data = await response.json();
        // console.log('fetchData response:', data);
        setLesson(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [router]);

  // step1頁面
  const renderStep1 = () => (
    <div className={styles.main}>
      <div className={styles.info}>
        <div className={styles.section}>
          <h4>會員資料</h4>
          <div className={styles.memberInfo}>
            <div className={styles.memberItem}>
              <h6>會員姓名</h6>
              <InputComponent disabled inputValue={userData.user_full_name} />
            </div>
            <div className={styles.memberItem}>
              <h6>電子信箱</h6>
              <InputComponent disabled inputValue={userData.user_email} />
            </div>
            <div className={styles.memberItem}>
              <h6>手機號碼</h6>
              <InputComponent
                disabled
                inputValue={userData.user_phone_number}
              />
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <h4>課程明細</h4>
          <Card lesson={lesson} />
        </div>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.payInfo}>
          <h4>付款明細</h4>
          <div className={styles.payDetail}>
            <div className={styles.payItem}>
              <h6>
                {isDiscount ? (
                  <FaCheckSquare
                    style={{ color: '#023e8a' }}
                    onClick={handleIsDiscount}
                    role="presentation"
                  />
                ) : (
                  <FaRegSquare
                    style={{ color: '#aaa' }}
                    onClick={handleIsDiscount}
                    role="presentation"
                  />
                )}
                &nbsp; 會員點數折抵 &nbsp;{userData.user_point}&nbsp; 點
              </h6>
            </div>
            <div className={styles.payItem}>
              <h6>支付金額</h6>
              <h4 style={{ color: '#023e8a' }}>{formatPrice(totalPrice)}</h4>
            </div>
            <div className={styles.payItem}>
              <h6>訂單完成後回饋點數</h6>
              <h6>
                {orderPoint}
                &nbsp;點
              </h6>
            </div>
          </div>
        </div>
        <Button onClick={handleBooking}>前往付款</Button>
      </div>
    </div>
  );

  // step2頁面
  const renderStep2 = () => (
    <div className={styles.main}>
      <div className={styles.info}>
        <div className={styles.section}>
          <h4>付款方式</h4>
          <div className={styles.payWay}>
            <h6 style={{ display: 'flex', alignItems: 'center' }}>
              {isCheck1 ? (
                <FaRegDotCircle
                  style={{ color: '#023e8a' }}
                  onClick={handleIsCheck1}
                  role="presentation"
                />
              ) : (
                <FaRegCircle
                  style={{ color: '#aaa' }}
                  onClick={handleIsCheck1}
                  role="presentation"
                />
              )}
              &nbsp;Line Pay
            </h6>
            <h6 style={{ display: 'flex', alignItems: 'center' }}>
              {isCheck2 ? (
                <FaRegDotCircle
                  style={{ color: '#023e8a' }}
                  onClick={handleIsCheck2}
                  role="presentation"
                />
              ) : (
                <FaRegCircle
                  style={{ color: '#aaa' }}
                  onClick={handleIsCheck2}
                  role="presentation"
                />
              )}
              &nbsp; 信用卡
            </h6>
            {/* {paymentError && <div className={styles.error}>{paymentError}</div>} */}
            <div className={styles.warning}>
              <p>
                <FaCircleExclamation />
                &nbsp; 取消政策
              </p>
              <div className={styles.warningItem}>
                <p>&nbsp; ．開課日期 7 天(含)前取消，可免費取消</p>
                <p>&nbsp; ．開課日期 4 - 6 天前取消，將收取 20％ 手續費</p>
                <p>&nbsp; ．開課日期 3 天(含)前取消，將收取全額費用概不退費</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.payInfo}>
          <h4>付款明細</h4>
          <div className={styles.payItem}>
            <h6>支付金額</h6>
            <h4 style={{ color: '#023e8a' }}>{formatPrice(totalPrice)}</h4>
          </div>
          <div className={styles.payItem}>
            <h6>訂單完成後回饋點數</h6>
            <h6>{orderPoint}&nbsp;點</h6>
          </div>
        </div>
        <Button
          onClick={handlePayment}
          // onClick={handlePayment} disabled={!isCheck1 && !isCheck2}
        >
          確認付款
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <CheckoutFlow currentStep={currentStep} />
          {currentStep === 1 ? renderStep1() : renderStep2()}
        </div>
      </Layout>
    </>
  );
}
