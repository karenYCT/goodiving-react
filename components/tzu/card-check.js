import { useState, useEffect } from 'react';
import styles from './card-check.module.css';
import Image from 'next/image';
import { FaLocationDot } from 'react-icons/fa6';
import { FaRegCalendar } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { API_SERVER } from '@/configs/api-path.js';
import { formatPrice } from '@/utils/formatPrice';

export default function CardCheck() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState({
    order: {},
    lesson: {},
    user: {},
  });

  useEffect(() => {
    if (!router.isReady) return;

    // 從 URL 路徑中獲取參數
    const { pid, order_id } = router.query;
    console.log('URL Parameters:', { pid, order_id });

    if (!pid || !order_id) {
      console.log('Missing required parameters');
      setError('缺少必要參數');
      return;
    }

    const fetchOrderData = async () => {
      try {
        // 使用正確的 API 路徑格式: /lesson/:round_id/booking/complete?order_id=xxx
        const apiUrl = `${API_SERVER}/lesson/${pid}/booking/complete?order_id=${order_id}`;
        console.log('Fetching from URL:', apiUrl);

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API response:', result);

        if (!result.success) {
          throw new Error(result.message || '訂單資料獲取失敗');
        }

        setOrderData(result.data);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      }
    };

    fetchOrderData();
}, [router.isReady, router.query]);

  // 顯示錯誤訊息
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const { order, lesson, user } = orderData;

  // 檢查必要數據
  if (!order || !lesson || !user) {
    return <div className={styles.noData}>載入中...</div>;
  }

  return (
    <>
      <div className={styles.card}>
        <h6>訂單編號：{order.order_num}</h6>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <div className={styles.coach}>
              <Image
                src={`${API_SERVER}/coach/${lesson.coach_img}.jpg`}
                alt="coach"
                width={150}
                height={150}
                className={styles.image}
              />
            </div>
            <div className={styles.lesson}>
              <Image
                src={`${API_SERVER}/round/${lesson.lesson_img}.jpg`}
                alt="lesson"
                width={180}
                height={180}
                className={styles.image}
              />
            </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.info}>
              <h4>
                {lesson.dept && `${lesson.dept} / `}
                {lesson.name}
              </h4>
              <h6>{lesson.coach}教練</h6>
              <h6>
                <FaLocationDot />
                &nbsp;
                {lesson.loc}
                &nbsp; &nbsp;
                <FaRegCalendar />
                &nbsp;
                {lesson.start}
                {lesson.end && ` – ${lesson.end}`}
              </h6>
            </div>
            <h4 style={{ color: '#023e8a' }}>
              {formatPrice(order.order_price)}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
