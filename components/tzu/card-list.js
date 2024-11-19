import { useState, useEffect } from 'react';
import styles from './card-list.module.css';
import { useRouter } from 'next/router';
import Tag from '@/components/tag/tag-outline-primary';
import { FaLocationDot } from 'react-icons/fa6';
import { FaRegHeart, FaHeart, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { API_SERVER } from '@/configs/api-path.js';
import { formatPrice } from '@/utils/formatPrice';

export default function CardList(props) {
  useEffect(() => {
    console.log('card-list', props.lesson);
  }, [props]);

  const router = useRouter();
  const [isLike, setIsLike] = useState(false);

  const handleIslike = () => {
    setIsLike(!isLike);
  };

  // 後端資料項目
  // "rows": [
  // {
  // "round_id": 61,
  // "lesson_id": 51,
  // "coach_id": 4,
  // "lesson_loc_id": 1,
  // "round_start": "2024-11-21T16:00:00.000Z",
  // "round_end": null,
  // "round_price": 6000,
  // "round_quota": 4,
  // "lesson_name": "旅遊潛水",
  // "lesson_name_zh": "(需證照)",
  // "lesson_img_a": "0016",
  // "coach_name": "阿妮",
  // "coach_sex": "女性",
  // "coach_img": "coach_004",
  // "coach_rate": 4.4,
  // "coach_exp": 326,
  // "lesson_type": "旅遊課程",
  // "cert_dept": "其他",
  // "lesson_loc": "東北角"
  // },]

  return (
    <>
      <div
        className={styles.card}
        onClick={() => {
          router.push(`/lesson/${props.lesson.round_id}`);
        }}
        role="presentation"
      >
        <div className={styles.info}>
          <Tag>{props.lesson.lesson_type}</Tag>
          <div className={styles.infoText}>
            <div className={styles.infoLeft}>
              <h5>
                {props.lesson.round_start}
                {`${props.lesson.round_end}`
                  ? ` – ${props.lesson.round_end}`
                  : ''}
              </h5>
              <h5>{props.lesson.coach_name}教練</h5>
              <p>
                {`${props.lesson.cert_dept}`
                  ? `${props.lesson.cert_dept} / `
                  : ''}
                {props.lesson.lesson_name}
                <br />
                {props.lesson.lesson_name_zh}
              </p>
              <p>
                <FaLocationDot />
                &nbsp;
                {props.lesson.lesson_loc}
              </p>
            </div>
            <div className={styles.infoRight}>
              <div className={styles.infoDetail}>
                <p style={{ color: '#023e8a', fontWeight: 'bold' }}>
                  {props.lesson.coach_rate}&nbsp;
                  <FaStar />
                </p>
                <p>教學經驗&nbsp;{props.lesson.coach_exp}&nbsp;次</p>
              </div>
              <div className={styles.infoDetail}>
                <p>剩餘&nbsp;{props.lesson.round_quota}&nbsp;個名額</p>
                <h4>{formatPrice(props.lesson.round_price)}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.coach}>
            <Image
              src={`${API_SERVER}/coach/${props.lesson.coach_img}.jpg`}
              alt="coach"
              width={150}
              height={150}
              className={styles.image}
            />
          </div>
          <div className={styles.lesson}>
            <Image
              src={`${API_SERVER}/round/${props.lesson.lesson_img_a}.jpg`}
              alt="lesson"
              width={180}
              height={180}
              className={styles.image}
            />
          </div>
          <div className={styles.heart}>
            {isLike ? (
              <FaHeart
                style={{ color: '#ff277e' }}
                onClick={handleIslike}
                role="presentation"
              />
            ) : (
              <FaRegHeart
                style={{ color: '#f3f3f3' }}
                onClick={handleIslike}
                role="presentation"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
