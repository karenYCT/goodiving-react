import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Layout from '@/components/layouts/layout';
import styles from './[pid].module.css';
import Breadcrumbs from '@/components/breadcrumbs';
import Image from 'next/image';
import { FaRegHeart, FaHeart, FaRegCalendar, FaStar } from 'react-icons/fa';
import { FaArrowUpRightFromSquare, FaLocationDot } from 'react-icons/fa6';
import Button from '@/components/buttons/btn-icon-right';
import { useRouter } from 'next/router';
import { API_SERVER } from '@/configs/api-path';
import { LESSON_LIST } from '@/configs/api-path';

export default function Lesson() {
  const router = useRouter();
  const [isLike, setIsLike] = useState(false);

  const handleIslike = () => {
    setIsLike(!isLike);
  };

  // 照片旋轉木馬react-alice-carousel
  const handleDragStart = (e) => e.preventDefault();
  const items = [
    <Image
      key={lesson.lesson_id}
      src={`${API_SERVER}/lesson/${lesson.lesson_img_a}.jpg`}
      alt="lesson_img_a"
      width={275}
      height={275}
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <Image
      key={lesson.lesson_id}
      src={`${API_SERVER}/lesson/${lesson.lesson_img_b}.jpg`}
      alt="lesson_img_b"
      width={275}
      height={275}
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <Image
      key={lesson.lesson_id}
      src={`${API_SERVER}/lesson/${lesson.lesson_img_c}.jpg`}
      alt="lesson_img_c"
      width={275}
      height={275}
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <Image
      key={lesson.lesson_id}
      src={`${API_SERVER}/lesson/${lesson.lesson_img_d}.jpg`}
      alt="lesson_img_d"
      width={275}
      height={275}
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <Image
      key={lesson.lesson_id}
      src={`${API_SERVER}/lesson/${lesson.lesson_img_e}.jpg`}
      alt="lesson_img_e"
      width={275}
      height={275}
      onDragStart={handleDragStart}
      role="presentation"
    />,
  ];
  const Gallery = () => <AliceCarousel mouseTracking items={items} />;

  // 後端資料項目
  // "rows": [
  // {
  // "round_id": 150,
  // "lesson_id": 51,
  // "coach_id": 12,
  // "lesson_loc_id": 4,
  // "round_start": "2025-01-09T16:00:00.000Z",
  // "round_end": null,
  // "round_price": 5700,
  // "round_quota": 4,
  // "lesson_name": "旅遊潛水",
  // "lesson_name_zh": "(需證照)",
  // "lesson_intro": "為休閒和探索海洋世界而設計的潛水活動。結合了旅行、探險和學習，讓潛水愛好者可以在各地的美麗潛點進行潛水，體驗不同的海洋生態系統和水下景觀。",
  // "lesson_group": "本活動專為持有潛水證照的旅客設計，適合擁有 Open Water 或以上級別證照的潛水愛好者參加。建議參加者擁有至少數次開放水域潛水經驗，並具備一定的自我裝備操作及水下應變能力。對於希望探索更多海底景觀、增進潛水技術，或追求冒險感受的旅客來說，這是一次絕佳的旅遊潛水體驗。",
  // "lesson_content": "活動將深入當地熱門潛點，帶領潛水員探索各種獨特的水下地形，如珊瑚礁、海底洞穴或沉船。教練會根據水流和能見度安排潛點，目標是讓潛水員深入探索並近距離觀察多樣的海洋生態，如熱帶魚群、海龜、鯊魚等生物。活動亦會強調提升潛水技巧，包括掌控中性浮力和省氣技巧，增強潛水安全和舒適度。",
  // "lesson_process": "活動時程通常為半天至一天。上午集合並進行潛點介紹、安全說明及裝備檢查，接著乘船前往潛點。根據行程包含 2-3 支潛水，單支潛水時間約 45 分鐘至 1 小時，並安排休息與水面安全停留時間。下午返航後，進行簡單回顧及分享，並有時間欣賞活動紀錄影像。",
  // "lesson_contain": "．費用涵蓋潛水專業教練指導、船隻接駁服務、保險\r\n．全套潛水裝備（可自備面鏡及呼吸管）\r\n．包含中餐、水面間隙的小點心及飲品\r\n．可選擇加購水下攝影服務",
  // "lesson_notice": "．參加者需持有潛水證照並帶證書到場，且近期內無潛水不適記錄。\r\n．活動前應避免過度勞累及飲酒。\r\n．活動當日和前一天勿搭飛機，以防減壓病風險。\r\n．請攜帶足夠的保暖衣物、防曬用品，並務必遵循教練指導。",
  // "lesson_img_a": "0016",
  // "lesson_img_b": "0017",
  // "lesson_img_c": "0018",
  // "lesson_img_d": "0019",
  // "lesson_img_e": "0020",
  // "coach_name": "阿霖",
  // "coach_img": "coach_012",
  // "coach_intro": "來自深海的探險者，對於深海的各種奇觀有深入了解。教學風格沉穩，讓學生在舒適的環境中學習潛水技術。對水下拍攝和觀察生物行為特別擅長，常與學員分享奇妙的海洋故事。",
  // "coach_rate": 4.7,
  // "coach_exp": 372,
  // "lesson_type": "旅遊課程",
  // "cert_dept": "CMAS",
  // "lesson_loc": "綠島",
  // "cert_name": "國際水肺潛水教練"
  // },]

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
            <Gallery />
            {/* <Image
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
            /> */}
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
                <FaLocationDot />
                &nbsp;
                {props.lesson.lesson_loc}
              </p>
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
