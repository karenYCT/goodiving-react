import React, { useState, useEffect } from 'react';
import ImageGallery from '@/components/tzu/imageGallery';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import Layout from '@/components/layouts/layout';
import styles from './[pid].module.css';
import Breadcrumbs from '@/components/breadcrumbs';
import Image from 'next/image';
import { FaRegHeart, FaHeart, FaRegCalendar, FaStar } from 'react-icons/fa';
import { FaArrowUpRightFromSquare, FaLocationDot } from 'react-icons/fa6';
import Button from '@/components/buttons/btn-icon-right';
import { useRouter } from 'next/router';
import { API_SERVER } from '@/configs/api-path.js';
import { LESSON_ONE } from '@/configs/api-path.js';
import { useAuth } from '@/context/auth-context';

export default function Lesson() {
  const router = useRouter();
  const { auth, openModal } = useAuth();
  const [lesson, setLesson] = useState({});
  const [isLike, setIsLike] = useState(false);

  const handleBooking = () => {
    router.push(`/lesson/${lesson.round_id}/booking/step`);
  };

  const handleIslike = () => {
    setIsLike(!isLike);
  };

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

  // fetch 真實資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(LESSON_ONE + router.query.pid);
        const data = await response.json();
        // console.log('fetchData response:', data);
        setLesson(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [router]);

  // 測試有沒有拿到資料
  // return <pre>{JSON.stringify(lesson, null, 4)}</pre>;

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <Breadcrumbs />
          <div>
            <ImageGallery lessonData={lesson} apiServer={API_SERVER} />
          </div>
          {/* <div className={styles.imageContainer}>
            <Swiper
              grabCursor={true}
              spaceBetween={12}
              slidesPerView={4}
              autoplay={{ delay: 2000 }}
              loop={true}
              pagination={{ clickable: true }}
              modules={[Pagination, Navigation, Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide>
                <Image
                  src={`${API_SERVER}/round/${lesson.lesson_img_a}.jpg`}
                  alt="lesson_img_a"
                  width={275}
                  height={275}
                  sizes="(max-width: 576px) 200px, 275px"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={`${API_SERVER}/round/${lesson.lesson_img_b}.jpg`}
                  alt="lesson_img_b"
                  width={275}
                  height={275}
                  sizes="(max-width: 576px) 200px, 275px"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={`${API_SERVER}/round/${lesson.lesson_img_c}.jpg`}
                  alt="lesson_img_c"
                  width={275}
                  height={275}
                  sizes="(max-width: 576px) 200px, 275px"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={`${API_SERVER}/round/${lesson.lesson_img_d}.jpg`}
                  alt="lesson_img_d"
                  width={275}
                  height={275}
                  sizes="(max-width: 576px) 200px, 275px"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={`${API_SERVER}/round/${lesson.lesson_img_e}.jpg`}
                  alt="lesson_img_e"
                  width={275}
                  height={275}
                  sizes="(max-width: 576px) 200px, 275px"
                />
              </SwiperSlide>
            </Swiper>
          </div> */}
          <div className={styles.main}>
            <div className={styles.lessonInfo}>
              <div className={styles.title}>
                <h4>
                  {`${lesson.cert_dept}` ? `${lesson.cert_dept} / ` : ''}
                  {lesson.lesson_name}
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
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p>
                  <FaLocationDot />
                  &nbsp;
                  {lesson.lesson_loc}
                </p>
                &nbsp;&nbsp;
                <p>
                  <FaRegCalendar />
                  &nbsp;
                  {lesson.round_start}
                  {`${lesson.round_end}` ? ` – ${lesson.round_end}` : ''}
                </p>
              </div>
              <div className={styles.section}>
                <h6>
                  {lesson.lesson_name}&nbsp;{lesson.lesson_name_zh}
                </h6>
                <p>{lesson.lesson_intro}</p>
              </div>
              <div className={styles.section}>
                <h6>適合族群</h6>
                <p>{lesson.lesson_group}</p>
              </div>
              <div className={styles.section}>
                <h6>課程內容與目標</h6>
                <p>{lesson.lesson_content}</p>
              </div>
              <div className={styles.section}>
                <h6>課程時間與流程</h6>
                <p>{lesson.lesson_process}</p>
              </div>
              <div className={styles.section}>
                <h6>課程費用</h6>
                <p>{lesson.lesson_contain}</p>
              </div>
              <div className={`${styles.section} ${styles.warning}`}>
                <h6>注意事項</h6>
                <p>{lesson.lesson_notice}</p>
              </div>
            </div>
            <div className={styles.sidebar}>
              <div className={styles.coachInfo}>
                <h4>{lesson.coach_name}教練</h4>
                <div className={styles.imageContainer2}>
                  <Image
                    src={`${API_SERVER}/coach/${lesson.coach_img}.jpg`}
                    alt="coach"
                    width={180}
                    height={180}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className={styles.infoDetail}>
                  <p style={{ color: '#023e8a', fontWeight: 'bold' }}>
                    {lesson.coach_rate}&nbsp;
                    <FaStar />
                  </p>
                  <p>教學經驗&nbsp;{lesson.coach_exp}&nbsp;次</p>
                </div>
                <div className={styles.section}>
                  <h6>教練介紹</h6>
                  <p>{lesson.coach_intro}</p>
                </div>
                {/* <div className={styles.section}>
                  <h6>擁有證照</h6>
                  <p>
                  </p>
                </div> */}
              </div>
              <Button
                onClick={() => {
                  auth.user_id ? handleBooking() : openModal();
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
