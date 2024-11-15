import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import styles from '@/components/layouts/layout.module.css';
import Tab from '@/components/tab';
import CardList from '@/components/tzu/card-list';
import stylesfavorite from './favorite.module.css';
import TeacherCard from '@/components/shirley/teacher-card';

export default function Favorite(props) {
  // TAB
  const [activeTab, setActiveTab] = useState(0);
  const tabItemss = ['收藏教練', '收藏課程'];
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const [slidesToShow, setSlidesToShow] = useState(false);

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

  // 螢幕寬度
  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(window.innerWidth < 700 ? 2 : 4);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Layout>
        <LeftSide>
          <MemberSidebar />
        </LeftSide>
        <div className={styles.main}>
          <Tab
            tabItems={tabItemss}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />

          {activeTab === 0 ? (
            <>
              <div className={stylesfavorite['favorite-coach-box']}>
                {coaches.map((coach, i) => {
                  return (
                    <div key={i}>
                      <TeacherCard key={i} coach={coach} />
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className={stylesfavorite['favorite-lesson-box']}>
                <CardList />
                <CardList />
                <CardList />
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
