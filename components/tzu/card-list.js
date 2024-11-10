import { useState, useEffect } from 'react';
import styles from './card-list.module.css';
import { useRouter } from 'next/router';
import Tag from '@/components/tag/tag-outline-primary';
import { FaLocationDot } from 'react-icons/fa6';
import { FaRegHeart, FaHeart, FaStar } from 'react-icons/fa';
import Image from 'next/image';

export default function CardList() {
  const router = useRouter();
  const [isLike, setIsLike] = useState(false);

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
    coach_id: 2,
    start: '2022-01-01',
    end: '2022-01-03',
    price: 4980,
    quota: 3,
    image_a: '/lesson-1.jpg',
    image_b: '/lesson-2.jpg',
    image_c: '/lesson-3.jpg',
    image_d: '/lesson-4.jpg',
  };

  const coach = {
    id: 2,
    name: '小龜教練',
    rate: 4.5,
    experience: 176,
    image: '/coach.jpg',
  };

  return (
    <>
      <div
        className={styles.card}
        onClick={() => {
          router.push(`/lesson/${lesson.id}`);
        }}
        role="presentation"
      >
        <div className={styles.info}>
          <Tag>{lesson.category}</Tag>
          <div className={styles.infoText}>
            <div className={styles.infoLeft}>
              <h5>
                {lesson.start}&nbsp;–&nbsp;{lesson.end}
              </h5>
              <h5>{coach.name}</h5>
              <p>
                {lesson.dept}&nbsp;/&nbsp;{lesson.name}
                <br />
                {lesson.nameTC}
              </p>
              <p>
                <FaLocationDot />
                &nbsp;
                {lesson.loc}
              </p>
            </div>
            <div className={styles.infoRight}>
              <div className={styles.infoDetail}>
                <p style={{ color: '#023e8a', fontWeight: 'bold' }}>
                  {coach.rate}&nbsp;
                  <FaStar />
                </p>
                <p>教學經驗&nbsp;{coach.experience}&nbsp;次</p>
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
              src={coach.image}
              alt="coach"
              width={150}
              height={150}
              className={styles.image}
            />
          </div>
          <div className={styles.lesson}>
            <Image
              src={lesson.image_a}
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
