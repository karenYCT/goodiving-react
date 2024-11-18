import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './sitepage.module.css';
import Imgintrocard from '@/components/karen/imgintrocard';
import ImgcarouselSM from '@/components/karen/imgcarousel-divesite';
import Logcard from '@/pages/divesite/components/logcard';
import DiaryPage from '@/pages/divesite/components/diarypage';
import ButtoniconR from '@/components/buttons/btn-icon-right';
import ImgintrocardXS from '@/components/karen/imgintrocard-xs';
import LeftQua from '@/public/leftquatation.svg';
import RightQua from '@/public/rightquatation.svg';
import { useDragScroll } from '@/hooks/usedragscroll';
import Modal from '@/components/karen/modal-460';
import { API_SERVER } from '@/configs/api-path';

export default function Sitepage({
  isOpen = false,
  data = {},
  currentSites = [],
  onClose = () => {},
}) {
  const [siteLogs, setSiteLogs] = useState([]);
  const [selectedLogData, setSelectedLogData] = useState(null);
  const [selectedLogId, setSelectedLogId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const router = useRouter();
  const dragScroll = useDragScroll();
  const containerRef = useRef(null);

  // 在 Modal 內部過濾相關景點
  const relatedSites = currentSites.filter(
    (site) =>
      site.region_id === data?.region_id && // 相同區域
      site.site_id !== data?.site_id // 排除當前景點
  );

  //獲取日誌卡片（但圖片遺失）
  useEffect(() => {
    const fetchSiteLogs = async () => {
    if (data?.site_id) {
      try {
        const response = await fetch(`http://localhost:3001/divesite/logs/${data.site_id}`);
        console.log('API Response:', response.status);

        if(response.ok){
          const logs = await response.json();
          setSiteLogs(logs);
        }
        
      } catch (error) {
        console.error('獲取潛點日誌失敗', error);
      }
    }
  };
  if (isOpen && data?.site_id) {
    fetchSiteLogs();
  }
}, [isOpen, data?.site_id]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [data]);

  const handleClose = () => {
    // Close the modal
    onClose();

    // Remove siteId from query parameters while preserving other params
    const { siteId, ...restQuery } = router.query;
    router.push(
      {
        pathname: '/divesite',
        query: restQuery,
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  // const handleRelatedSiteClick = async (site) => {
  //   try {
  //     // Update URL with new siteId while preserving other query params
  //     await router.push(
  //       {
  //         pathname: '/divesite',
  //         query: {
  //           ...router.query,
  //           siteId: site.site_id,
  //         },
  //       },
  //       undefined,
  //       {
  //         shallow: true,
  //         scroll: false,
  //       }
  //     );
  //   } catch (error) {
  //     console.error('切換潛點失敗:', error);
  //   }
  // };

  const handleRelatedSiteClick = async (site) => {
    try {
      // 先關閉當前 Modal
      onClose();
      
      // 延遲一下再執行路由更新，避免動畫衝突
      setTimeout(async () => {
        try {
          // 更新 URL
          await router.push(
            {
              pathname: '/divesite',
              query: {
                ...router.query,
                siteId: site.site_id,
              },
            },
            undefined,
            {
              shallow: true,
              scroll: false,
            }
          );
        } catch (error) {
          console.error('切換潛點失敗:', error);
        }
      }, 100);
    } catch (error) {
      console.error('切換潛點失敗:', error);
    }
  };

  if (!isOpen || !data) return null;

   // 獲取日誌詳情
  const fetchLogDetails = async (logId) => {
    try {
      const response = await fetch(`${API_SERVER}/divesite/log/${logId}`);
      console.log('API Response:', response.status);
      if (!response.ok) throw new Error('Failed to fetch log details');
      const data = await response.json();
      setSelectedLogData(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching log details:', error);
      // 這裡可以添加錯誤處理的UI提示
    }
  };

  // 處理日誌卡片點擊
  const handleDiaryClick = (logId) => {
    setSelectedLogId(logId);
    fetchLogDetails(logId);
  };

  // 處理模態框關閉
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLogData(null);
    setSelectedLogId(null);
  };

  const getLocationId = (regionId) => {
    const regionToLocation = {
      6: 1, // 東北角
      3: 2, // 墾丁
      4: 3, // 小琉球
      1: 4, // 綠島
      2: 5  // 蘭嶼
    };
    return regionToLocation[regionId] || 1;
  };

  const handleBookingClick = () => {
    const locationId = getLocationId(data.region_id);
    router.push(`/lesson?loc=${locationId}`);
  };

  return (
    <Modal isOpen={isOpen} closeModal={handleClose}>
      <div
        ref={containerRef}
        className={`${styles.container} ${styles.dragScroll}`}
        {...dragScroll}
      >
        <div className={styles.imgintro}>
          <Imgintrocard data={data} />
        </div>
        <div className={styles.section}>
          <h5>
            {data.region_name}|{data.site_name}
          </h5>
          {/* <p>{data.site_intro}</p> */}
          <div className={styles.carouselContainer}>
            <ImgcarouselSM data={data}/>
          </div>
        </div>

        {/* {siteLogs.length > 0 && (
          <div className={styles.section}>
            <h5>深藍日誌</h5>
            <div
              className={`${styles.logContainer} ${styles.dragScroll}`}
              {...dragScroll}
            >
              {siteLogs.map((log) => (
                
                <Logcard
                  key={log.log_id}
                  showOptions={false}
                  data={{
                    date: log.date,
                    site_name: data.site_name, // 從 data prop 中獲取潛點名稱
                    bottom_time: log.bottom_time,
                    water_temp: log.water_temp,
                    max_depth: log.max_depth,
                    method_name: log.method_name,
                    is_privacy: 1, // 因為我們只顯示公開的日誌
                    log_exp: log.log_exp,
                    images: [{ is_main: 1, img_url: '/siteimg.JPG' }] // 預設圖
                  }}
                />
              ))}
            </div>
          </div>
        )} */}
        {/* {siteLogs.length > 0 && (
  <div className={styles.section}>
    <h5>深藍日誌</h5>
    <div
      className={`${styles.logContainer} ${styles.dragScroll}`}
      {...dragScroll}
    >
      {siteLogs.map((log) => {
        // 先印出接收到的資料，方便除錯
        console.log('Processing log:', log);
        
        return (
          <Logcard
            key={log.log_id}
            diaryData={{
              log_id: log.log_id,
              date: log.date,
              site_name: data.site_name,
              bottom_time: log.bottom_time,
              water_temp: log.water_temp,
              max_depth: log.max_depth,
              method_name: log.method_name,
              visi_name: log.visi_name,
              is_privacy: 1,
              log_exp: log.log_exp,
              images: [{ is_main: 1, img_url: '/siteimg.JPG' }]
            }}
          />
        );
      })}
    </div>
  </div>
)} */}
{siteLogs.length > 0 && (
  <div className={styles.section}>
    <h5>深藍日誌</h5>
    <div
      className={`${styles.logContainer} ${styles.dragScroll}`}
      {...dragScroll}
    >
      {siteLogs.map((log) => {
        console.log('Processing log:', log);
        
        return (
          <Logcard
            key={log.log_id}
            diaryData={log}
            onDiaryClick={() => handleDiaryClick(log.log_id)}
          />
        );
      })}
    </div>
  </div>
)}

        <div className={styles.descContainer}>
          <div className={styles.quotationContainer}>
            <LeftQua className={styles.quotation} />
            <h5> 每一段冒險都源於一顆向往自由的心 </h5>
            <RightQua className={styles.quotation} />
          </div>
          <p>
            大海呼喚著，來發現它的秘密擁抱它的無邊廣闊，讓靈魂隨波逐流點擊下方按鈕，一起來開啟您與大海的深度探索
          </p>
          <ButtoniconR
          onClick={handleBookingClick}
          >
          立即預定您的深藍假期
          </ButtoniconR>
        </div>

        {relatedSites.length > 0 && (
          <div className={styles.section}>
            <h5>查看{data.region_name}更多潛點</h5>
            <div
              className={`${styles.cardContainer} ${styles.dragScroll}`}
              {...dragScroll}
            >
              {relatedSites.map((data) => (
                <ImgintrocardXS
                  key={data.site_id}
                  data={data}
                  onClick={() => {
                    console.log('Clicked site:', data); // 添加調試日誌
                    handleRelatedSiteClick(data)}}
                />
              ))}
            </div>
          </div>
        )}
      </div>
        {/* 日誌詳情模態框 */}
        {isModalOpen && selectedLogData && (
        <DiaryPage
          diaryData={selectedLogData}
          onClose={handleCloseModal}
          // onEdit={handleDiaryClick}
          // onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </Modal>
  );

}
