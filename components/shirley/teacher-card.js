import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import styles from './teacher-card.module.css';

export default function TeacherCard({ coach }) {
  const [isLike, setIsLike] = useState(false);

  const handleIslike = () => {
    setIsLike(!isLike);
  };
  // const lesson = {
  //   id: 1,
  //   dept: 'PADI',
  //   name: 'Discover Scuba Diving',
  //   nameTC: '潛水體驗課程(無需證照)',
  //   category: '課程類別',
  //   loc: '課程地點',
  //   coach_id: 2,
  //   start: '2022-01-01',
  //   end: '2022-01-03',
  //   price: 4980,
  //   quota: 3,
  //   image_a: '/lesson-1.jpg',
  //   image_b: '/lesson-2.jpg',
  //   image_c: '/lesson-3.jpg',
  //   image_d: '/lesson-4.jpg',
  // };

  // const coach = {
  //   id: 2,
  //   name: '小龜教練',
  //   rate: 4.5,
  //   experience: 176,
  //   image: '/coach.jpg',
  // };

  return (
    <>
      <div>
        <div className={styles['img-box']}>
          <Image src={coach.image} alt="coach" width={150} height={150} />
          <div className={styles['heart']}>
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
        <div className={styles['text-box']}>
          <h5>{coach.name}</h5>
          <p style={{ color: '#023e8a', fontWeight: 'bold' }}>
            {coach.rate}&nbsp;
            <FaStar />
          </p>
          <p>教學經驗&nbsp;{coach.experience}&nbsp;次</p>
        </div>
      </div>
    </>
  );
}
