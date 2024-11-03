import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import styles from './[pid].module.css';
import Breadcrumbs from '@/components/breadcrumbs';
import Image from 'next/image';
import { FaRegHeart, FaHeart, FaRegCalendar } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

export default function Lesson() {
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
      <Layout>
        <div className={styles.container}>
          <Breadcrumbs />
          <div className={styles.imageContainer}>
            <Image
              src="/lesson-1.jpg"
              alt="lesson-1"
              width={275}
              height={275}
              sizes="(max-width: 576px) 200px, 275px"
              className={styles.image}
            />
            <Image
              src="/lesson-2.jpg"
              alt="lesson-2"
              width={275}
              height={275}
              sizes="(max-width: 576px) 200px, 275px"
              className={styles.image}
            />
            <Image
              src="/lesson-3.jpg"
              alt="lesson-3"
              width={275}
              height={275}
              sizes="(max-width: 576px) 200px, 275px"
              className={styles.image}
            />
            <Image
              src="/lesson-4.jpg"
              alt="lesson-4"
              width={275}
              height={275}
              sizes="(max-width: 576px) 200px, 275px"
              className={styles.image}
            />
          </div>
          <div className={styles.main}>
            <div className={styles.lessonInfo}>
              <div className={styles.title}>
                <h4>
                  {lesson.dept}&nbsp;/&nbsp;{lesson.name}
                </h4>
                <div className={styles.icon}>
                  <FaRegHeart />
                  <FaArrowUpRightFromSquare />
                </div>
              </div>
              <p>
                <FaRegCalendar />
                &nbsp;
                {lesson.start}&nbsp;–&nbsp;{lesson.end}
              </p>
              <div className={styles.section}>
                <h6>
                  {lesson.name}&nbsp;{lesson.nameTC}
                </h6>
                <p>開放水域潛水員（OW）證照班為初學者設計，透過理論、平靜水域及開放水域訓練，學員將掌握基本潛水技巧並獲得國際認證，適合探索全球水下世界的愛好者。</p>
              </div>
            </div>
            <div className={styles.sidebar}>
              <h4>{lesson.coach}</h4>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
