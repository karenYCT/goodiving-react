import { useState, useEffect } from 'react';
import styles from './card-list.module.css';
import { useRouter } from 'next/router';
import Tag from '@/components/tag/tag-outline-primary';
import { FaLocationDot } from 'react-icons/fa6';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import Image from 'next/image';

export default function CardList() {
  const router = useRouter();

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
      <div className={styles.card}>
        <div className={styles.info}>
          <div className={styles.infoLeft}>
            <Tag>{lesson.category}</Tag>
            <div className={styles.infoText}>
              <h5>
                {lesson.start} – {lesson.end}
              </h5>
              <h5>{lesson.coach}</h5>
              <p>
                {lesson.dept} / {lesson.name}
                <br />
                {lesson.nameTC}
              </p>
              <p>
                <FaLocationDot />
                {lesson.loc}
              </p>
            </div>
          </div>
          <div className={styles.infoRight}>
            <div>
              <p>{lesson.rate}</p>
              <p>{lesson.experience}</p>
            </div>
            <div>
              <p>{lesson.quota}</p>
              <h4>NT${lesson.price}</h4>
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
