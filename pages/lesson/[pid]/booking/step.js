import React, { useState, useEffect } from 'react';
import styles from './step.module.css';
import Layout from '@/components/layouts/layout';
import CheckoutFlow from '@/components/tzu/checkout-flow';
import InputComponent from '@/components/inputs/input-component2';
import Card from '@/components/tzu/card-booking';
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa';
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

  const handleIsDiscount = () => {
    setIsDiscount(!isDiscount);
  };

  const totalPrice = isDiscount
    ? Number(lesson.round_price) - Number(userData.user_point)
    : Number(lesson.round_price);

  const orderPoint = Math.floor(totalPrice * 0.01);

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

      if (result.success) {
        toast.success('訂單建立成功，請選擇付款方式');
        // router.push(`/lesson/${lesson.round_id}/booking/step2`);
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

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <CheckoutFlow />
          <div className={styles.main}>
            <div className={styles.info}>
              <div className={styles.section}>
                <h4>會員資料</h4>
                <div className={styles.memberInfo}>
                  <div className={styles.memberItem}>
                    <h6>會員姓名</h6>
                    <InputComponent
                      disabled
                      inputValue={userData.user_full_name}
                    />
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
                    <h4 style={{ color: '#023e8a' }}>
                      {formatPrice(totalPrice)}
                    </h4>
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
              <Button
                onClick={handleBooking}
              >
                前往付款
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
