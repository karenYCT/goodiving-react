import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import styles from './[pid].module.css';
import Breadcrumbs from '@/components/breadcrumbs';
import Image from 'next/image';
import { FaRegHeart, FaHeart, FaRegCalendar, FaStar } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import Button from '@/components/buttons/btn-icon-right';
import { useRouter } from 'next/router';

export default function Lesson() {
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
      <Layout>
        <div className={styles.container}>
          <Breadcrumbs />
          <div className={styles.imageContainer}>
            <Image
              src={lesson.image_a}
              alt="lesson-1"
              width={275}
              height={275}
              sizes="(max-width: 576px) 200px, 275px"
            />
            <Image
              src={lesson.image_b}
              alt="lesson-2"
              width={275}
              height={275}
              sizes="(max-width: 576px) 200px, 275px"
            />
            <Image
              src={lesson.image_c}
              alt="lesson-3"
              width={275}
              height={275}
              sizes="(max-width: 576px) 200px, 275px"
            />
            <Image
              src={lesson.image_d}
              alt="lesson-4"
              width={275}
              height={275}
              sizes="(max-width: 576px) 200px, 275px"
            />
          </div>
          <div className={styles.main}>
            <div className={styles.lessonInfo}>
              <div className={styles.title}>
                <h4>
                  {lesson.dept}&nbsp;/&nbsp;{lesson.name}
                </h4>
                <div className={styles.icon}>
                  {isLike ? (
                    <FaHeart
                      style={{ color: '#ff277e' }}
                      onClick={handleIslike}
                      role="presentation"
                    />
                  ) : (
                    <FaRegHeart
                      style={{ color: '#aaa' }}
                      onClick={handleIslike}
                      role="presentation"
                    />
                  )}
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
                <p>
                  開放水域潛水員（OW）證照班為初學者設計，透過理論、平靜水域及開放水域訓練，學員將掌握基本潛水技巧並獲得國際認證，適合探索全球水下世界的愛好者。
                </p>
              </div>
              <div className={styles.section}>
                <h6>適合族群</h6>
                <p>
                  1.想要獲得國際潛水認證的初學者
                  <br />
                  2.對潛水有興趣、希望學習水下技能的自然愛好者
                  <br />
                  3.年滿10歲以上，身體健康並具備基本水性者
                  <br />
                </p>
              </div>
              <div className={styles.section}>
                <h6>課程內容與目標</h6>
                <p>
                  此課程涵蓋理論與實務，幫助學員掌握基本潛水知識與技能，最終能安全自信地進行開放水域潛水。
                  <br />
                  ．學科課程：學習潛水理論、安全規範、裝備使用等基礎知識，並於最後一天進行筆試。
                  <br />
                  ．術科課程：
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;平靜水域訓練：第一天安排，在泳池或平靜水域中練習基本潛水技巧，熟悉裝備使用、浮力控制及應對緊急情況的能力。
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;開放水域訓練：開放水域潛水分為兩次，每次進行兩支氣瓶潛水訓練，模擬真實環境下的潛水操作，提升實戰技巧。
                  完成課程後，學員將獲得國際認證的OW開放水域潛水員證照，並可選擇不同的認證系統（SSI或PADI），開啟全球潛水之旅。
                </p>
              </div>
              <div className={styles.section}>
                <h6>課程時間與流程</h6>
                <p>
                  課程共三天，時間安排靈活，學員可與教練商討調整，實際安排依當天狀況決定：
                  <br />
                  ．第一天：平靜水域訓練（約6-7小時）
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;上午：潛水裝備介紹與穿戴練習（約1小時）
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;下午：平靜水域訓練，學習浮力控制、緊急處理等基本操作（約5-6小時）
                  <br />
                  ．第二天：開放水域訓練（第1次，2支氣瓶）（約6-7小時）
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;上午：準備裝備並由教練帶領進入開放水域（約1小時）
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;下午：進行第一次兩支氣瓶的開放水域訓練，實踐浮力控制與水下導航（約5-6小時）
                  <br />
                  ．第三天：開放水域訓練（第2次，2支氣瓶）與筆試（約6-7小時）
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;上午：第二次開放水域訓練，進行兩支氣瓶潛水，完成剩餘實戰訓練（約5-6小時）
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;下午：筆試，測試學科知識掌握情況（約1-2小時）
                  <br />
                </p>
              </div>
              <div className={styles.section}>
                <h6>課程費用</h6>
                <p>
                  費用內容：NT${lesson.price}元／人
                  <br />
                  ．含潛水教學費、學科教材與筆試費用
                  <br />
                  ．潛水裝備租借費用（氣瓶、調節器、潛水服等）
                  <br />
                  ．平靜水域與開放水域的訓練費用
                  <br />
                  ．國際潛水認證費用與潛水員證書
                  <br />
                </p>
              </div>
              <div className={`${styles.section} ${styles.warning}`}>
                <h6>注意事項</h6>
                <p>
                  1.年滿10歲，身體健康者可參加課程，需填寫健康聲明表。
                  <br />
                  2.潛水前24小時內禁止飲酒，並保持充足睡眠。
                  <br />
                  3.課程結束後12小時內請勿搭乘飛機，以免潛水減壓症風險。
                  <br />
                  4.課程進行中如遇惡劣天氣，教練可視情況調整訓練行程。
                  <br />
                  5.我們提供 SSI 與 PADI
                  認證，學員可選擇適合自己的系統，完成課程後將獲得相應的國際證照，享有全球潛水資格。
                </p>
              </div>
            </div>
            <div className={styles.sidebar}>
              <div className={styles.coachInfo}>
                <h4>{coach.name}</h4>
                <div className={styles.imageContainer2}>
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    width={180}
                    height={180}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className={styles.infoDetail}>
                  <p style={{ color: '#023e8a', fontWeight: 'bold' }}>
                    {coach.rate}&nbsp;
                    <FaStar />
                  </p>
                  <p>教學經驗&nbsp;{coach.experience}&nbsp;次</p>
                </div>
                <div className={styles.section}>
                  <h6>教練介紹</h6>
                  <p>
                    在漫長潛水生涯當中，親身了解許多海洋的知識、教導過眾多學員及教練，也從中重新建立自信及自身專業，投入潛水產業至今共5年，擁有1000支氣瓶以上潛水經驗、水下時數超過500小時。
                  </p>
                </div>
                <div className={styles.section}>
                  <h6>擁有證照</h6>
                  <p>
                    ．PADI國際水肺潛水教練
                    <br />
                    ．TDI減壓程序技術潛水
                    <br />
                    ．EFR緊急第一反應急救教練訓練官
                    <br />
                    ．紅十字會救生員
                    <br />
                    ．EMT緊急急救員
                    <br />
                    ．CMAS游泳教練
                  </p>
                </div>
              </div>
              <Button
                onClick={() => {
                  router.push(`/lesson/${lesson.id}/booking/step1`);
                }}
              >
                立即預訂
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
