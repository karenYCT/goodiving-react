import { useState, useEffect } from 'react';
import styles from './card-booking.module.css';
import Image from 'next/image';
import { FaRegCalendar } from 'react-icons/fa';


export default function CardBooking() {
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
      <div className={styles.card}>
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
        </div>
        <div className={styles.info}>
          <h4>{lesson.name}</h4>
          <h6>{coach.name}</h6>
          <h6>
            <FaRegCalendar />
            &nbsp;
            {lesson.start}&nbsp;–&nbsp;{lesson.end}
          </h6>
        </div>
      </div>
    </>
  );
}
