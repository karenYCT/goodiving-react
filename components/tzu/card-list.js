import { useState, useEffect } from 'react';
import styles from './card-list.module.css';
import { useRouter } from 'next/router';
import Tag from '@/components/tag/tag-outline-primary';
import { FaLocationDot } from 'react-icons/fa6';
import { FaRegHeart, FaHeart, FaStar } from 'react-icons/fa';
import Image from 'next/image';

export default function CardList() {
  const [isLike, setIsLike] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/lesson/${lesson.id}`);
  };

  const handleIslike = () => {
    setIsLike(!isLike);
  };

  const lesson = {
    id: 1,
    dept: 'PADI',
    name: 'Discover Scuba Diving',
    nameTC: '潛水體驗課程(無需證照)',
    category: '課程類別',
    loc: '課程地點',
    coach: '教練名稱',
    start: '2022-01-01',
    end: '2022-01-03',
    price: 4980,
    rate: 4.5,
    experience: 176,
    quota: 3,
    image: '/lesson-1.jpg',
    coachImage: '/coach.jpg',
  };

  return (
    <>
      <div className={styles.card} onClick={handleClick} role="presentation">
        <div className={styles.info}>
          <Tag>{lesson.category}</Tag>
          <div className={styles.infoText}>
            <div className={styles.infoLeft}>
              <h5>
                {lesson.start}&nbsp;–&nbsp;{lesson.end}
              </h5>
              <h5>{lesson.coach}</h5>
              <p>
                {lesson.dept}&nbsp;/&nbsp;{lesson.name}
                <br />
                {lesson.nameTC}
              </p>
              <p>
                <FaLocationDot />&nbsp;
                {lesson.loc}
              </p>
            </div>
            <div className={styles.infoRight}>
              <div className={styles.infoDetail}>
                <p style={{ color: '#023e8a', fontWeight: 'bold' }}>
                  {lesson.rate}&nbsp;
                  <FaStar />
                </p>
                <p>教學經驗&nbsp;{lesson.experience}&nbsp;次</p>
              </div>
              <div className={styles.infoDetail}>
                <p>剩餘&nbsp;{lesson.quota}&nbsp;個名額</p>
                <h4>NT$&nbsp;{lesson.price}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.coach}>
            <Image
              src={lesson.coachImage}
              alt="coach"
              width={150}
              height={150}
              className={styles.image}
            />
          </div>
          <div className={styles.lesson}>
            <Image
              src={lesson.image}
              alt="lesson"
              width={180}
              height={180}
              className={styles.image}
            />
          </div>
          <div className={styles.heart}>
            <FaRegHeart style={{ color: '#f3f3f3' }} />
            {/* <FaHeart style={{ color: '#ff277e' }} /> */}
          </div>
        </div>
      </div>
    </>
  );
}
