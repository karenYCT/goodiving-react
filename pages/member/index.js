import React, { useEffect, useState } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import styles from '@/components/layouts/layout.module.css';
import { API_SERVER } from '@/configs/api-path.js';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';
import Btnfillprimary from '@/components/shirley/btn-fill-primary';
import styleshome from './home.module.css';
import Logcard from '@/components/karen/logcard'; // 日誌的卡片
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  EffectCoverflow,
  Pagination,
  Autoplay,
  Grid,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import Blogcard1 from '@/components/shirley/card1';
import Blogcard2 from '@/components/shirley/card2';
import Blogcard3 from '@/components/shirley/card3';
import TeacherCard from '@/components/shirley/teacher-card';

export default function Home() {
  const router = useRouter();
  const { auth, openModal, isLoading } = useAuth();
  const [logs, setLogs] = useState([]); // 日誌

  // 教練檔案
  const coaches = [
    {
      id: 1,
      name: '阿虎教練',
      rate: 4.2,
      experience: 187,
      image: '/coach.jpg',
    },
    {
      id: 2,
      name: '小龜教練',
      rate: 3.9,
      experience: 132,
      image: '/coach_002.jpg',
    },
    {
      id: 3,
      name: '龍哥教練',
      rate: 4.6,
      experience: 275,
      image: '/coach_003.jpg',
    },
    {
      id: 4,
      name: '大頭教練',
      rate: 4.1,
      experience: 199,
      image: '/coach_004.jpg',
    },
    {
      id: 5,
      name: 'Jessica教練',
      rate: 4.7,
      experience: 112,
      image: '/coach_005.jpg',
    },
    {
      id: 6,
      name: 'Jeo教練',
      rate: 3.8,
      experience: 238,
      image: '/coach_006.jpg',
    },
    {
      id: 7,
      name: '阿貴教練',
      rate: 4.4,
      experience: 169,
      image: '/coach_007.jpg',
    },
    {
      id: 8,
      name: '小花教練',
      rate: 3.6,
      experience: 95,
      image: '/coach_008.jpg',
    },
    {
      id: 9,
      name: '文婷教練',
      rate: 4.9,
      experience: 283,
      image: '/coach_009.jpg',
    },
    {
      id: 10,
      name: '小馬教練',
      rate: 4.5,
      experience: 211,
      image: '/coach_010.jpg',
    },
    {
      id: 11,
      name: '阿豹教練',
      rate: 3.7,
      experience: 162,
      image: '/coach_011.jpg',
    },
    {
      id: 12,
      name: '小黑教練',
      rate: 4.0,
      experience: 143,
      image: '/coach_012.jpg',
    },
    {
      id: 13,
      name: '阿杰教練',
      rate: 4.8,
      experience: 279,
      image: '/coach_013.jpg',
    },
    {
      id: 14,
      name: '金針菇教練',
      rate: 3.9,
      experience: 188,
      image: '/coach_014.jpg',
    },
    {
      id: 15,
      name: '阿寶教練',
      rate: 4.3,
      experience: 225,
      image: '/coach_015.jpg',
    },
    {
      id: 16,
      name: '小珍教練',
      rate: 4.1,
      experience: 131,
      image: '/coach_016.jpg',
    },
    {
      id: 17,
      name: '阿樂教練',
      rate: 4.6,
      experience: 197,
      image: '/coach_017.jpg',
    },
    {
      id: 18,
      name: 'Joy教練',
      rate: 4.0,
      experience: 143,
      image: '/coach_001.jpg',
    },
  ];

  // 螢幕寬度;
  const [slidesToShow, setSlidesToShow] = useState(5); // 設置一個默認值，例如 5

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(window.innerWidth < 700 ? true : false);
    };

    // 初始化時設置 slidesToShow
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 獲取會員日誌資料
  const fetchMemberLogs = async () => {
    try {
      const response = await fetch(
        `${API_SERVER}/profile/logs?user_id=${auth.user_id}`
      );
      const data = await response.json();
      console.log('會員日誌:', data);
      setLogs(data); // 儲存日誌到狀態
    } catch (error) {
      console.error('獲取會員日誌失敗:', error);
    }
  };

  const handleDiaryClick = (logId) => {
    console.log(`點擊的日誌 ID: ${logId}`); // 確認這裡打印的值是日誌 ID 而非物件
    if (logId) {
      router.push(`/diary?log_id=${logId}`); // 使用 Next.js 路由轉跳
    }
  };

  useEffect(() => {
    if (auth.user_id) {
      fetchMemberLogs();
    }
  }, [auth.user_id]);

  // 如果沒登入的阻擋
  useEffect(() => {
    if (!isLoading && !auth.token) {
      openModal();
      router.replace('/');
    }
  }, [auth.token, openModal, router, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>; // 可替換為你的 loading 畫面
  }

  if (!auth.token) {
    return null;
  }

  return (
    <>
      <Layout>
        <LeftSide>
          <MemberSidebar />
        </LeftSide>
        <div className={styles.main}>
          <div className={styleshome['top-box']}>
            <Btnfillprimary>一般會員</Btnfillprimary>
            <p className={styleshome['level-notify']}>
              升級至水晶會員12 個月內累積消費額達 NT$3000 即可升級
            </p>
          </div>

          <h4>近期日誌</h4>
          <div className={styleshome['log-box']}>
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={slidesToShow ? 2 : 3}
              spaceBetween={slidesToShow ? 15 : 30}
              // autoplay={{ delay: 2000 }}
              loop={true}
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
            >
              {logs.length > 0 ? (
                logs.map((log) => (
                  <SwiperSlide key={log.log_id}>
                    <Logcard
                      diaryData={log}
                      onDiaryClick={() => handleDiaryClick(log.log_id)}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <div>目前尚無日誌</div> // 若無日誌時顯示提示訊息
              )}
            </Swiper>
          </div>

          <h4>近期發布文章</h4>
          <div className={styleshome['blog-box']}>
            <Swiper
              direction={'vertical'}
              slidesPerView={slidesToShow ? 2 : 2}
              spaceBetween={slidesToShow ? 10 : 10}
              pagination={{
                clickable: true,
              }}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              // autoplay={{ delay: 2500 }}
              loop={true} // 循環播放
              className={styleshome.mySwiper2}
            >
              <SwiperSlide>
                <Blogcard1 />
              </SwiperSlide>
              <SwiperSlide>
                <Blogcard2 />
              </SwiperSlide>
              <SwiperSlide>
                <Blogcard2 />
              </SwiperSlide>
              <SwiperSlide>
                <Blogcard2 />
              </SwiperSlide>
            </Swiper>
          </div>

          <h4>收藏教練</h4>
          <div className={styleshome['fav-coach-box']}>
            <Swiper
              slidesPerView={slidesToShow ? 2 : 4}
              grid={{
                rows: 2,
                fill: 'row', // 指定填充方向為橫向
              }}
              spaceBetween={slidesToShow ? 50 : 50}
              // autoplay={{ delay: 2000 }}
              pagination={{
                clickable: true,
              }}
              modules={[Grid, Pagination, Autoplay]}
              className={styleshome.mySwiper}
            >
              {coaches.map((coach, i) => {
                return (
                  <SwiperSlide key={i}>
                    <TeacherCard coach={coach} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </Layout>
    </>
  );
}
