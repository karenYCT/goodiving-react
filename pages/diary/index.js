// pages/diary/index.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LogList from '@/pages/diary/loglist';
import LogMap from '@/pages/diary/logmap';
import DiaryPage from '@/pages/diary/diarypage';
import DiaryForm from '@/pages/diary/diaryform';
import { API_SERVER } from '@/configs/api-path';
import styles from './index.module.css';

export default function DiaryIndex() {
  const router = useRouter();
  
  // 日誌相關狀態
  const [diaryData, setDiaryData] = useState(null);
  const [logs, setLogs] = useState([]); // 所有日誌清單
  const [currentRegion, setCurrentRegion] = useState('all'); // 目前選擇的區域，預設全部
  const [isLoading, setIsLoading] = useState(false);

  // 地圖相關狀態
  const [mapData, setMapData] = useState({
    currentRegion: {
      id: 1,
      name: '',
      english: 'greenisland'
    },
    regions: [],
    sites: []
  });

  // UI 相關狀態
  const [uiState, setUiState] = useState({
    isMobile: false,
    isMobileMapView: false,
    isLoading: true,
  });

  // 檢查設備類型
  useEffect(() => {
    const checkMobile = () => {
      setUiState(prev => ({
        ...prev,
        isMobile: window.innerWidth <= 576,
      }));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 獲取地圖所需資料
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        setUiState(prev => ({ ...prev, isLoading: true }));

        const [regionsRes, sitesRes] = await Promise.all([
          fetch(`${API_SERVER}/divesite/region`),
          fetch(`${API_SERVER}/divesite/sites`)
        ]);

        const [regions, sites] = await Promise.all([
          regionsRes.json(),
          sitesRes.json()
        ]);

        const defaultRegion = regions.find(r => r.region_id === 1) || {
          region_id: 1,
          region_name: '',
          region_english: 'greenisland'
        };

        setMapData({
          regions,
          sites,
          currentRegion: {
            id: defaultRegion.region_id,
            name: defaultRegion.region_name,
            english: defaultRegion.region_english
          }
        });

      } catch (error) {
        console.error('獲取地圖資料錯誤:', error);
      } finally {
        setUiState(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchMapData();
  }, []);

  // 監聽 URL 參數變化
  useEffect(() => {
    if (router.query.id) {
      getDiaryData(router.query.id);
    }
  }, [router.query]);

  // 取得單一日誌的資料，要顯示在詳細頁面上的
  const getDiaryData = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_SERVER}/diary/${id}`);
      const data = await response.json();

      const imgResponse = await fetch(`${API_SERVER}/diary/images/${id}`);
      const imgData = await imgResponse.json();

      setDiaryData({
        ...data[0],
        images: imgData
      });
    } catch (error) {
      console.error('獲取日誌資料錯誤:', error);
    } finally {
      setIsLoading(false);
    }
  };


  //取得所有日誌，這是要放在列表頁（卡片）的
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`${API_SERVER}/diary/logs`);
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error('獲取日誌資料錯誤:', error);
      }
    };
    fetchLogs();
  }, []);

  // 根據目前選擇的區域篩選日誌
const getCurrentLogs = () => {
  if (currentRegion === 'all') {
    return logs;
  }
  return logs.filter(log => log.region_id === currentRegion);
};


// 處理區域切換（修改這個函數）
const handleRegionChange = (regionId) => {
  // 設定目前選擇的區域
  setCurrentRegion(regionId);

  // 如果不是 'all'，則更新地圖顯示
  if (regionId !== 'all') {
    const selectedRegion = mapData.regions.find(
      r => r.region_id === Number(regionId)
    );

    if (selectedRegion) {
      setMapData(prev => ({
        ...prev,
        currentRegion: {
          id: selectedRegion.region_id,
          name: selectedRegion.region_name,
          english: selectedRegion.region_english
        }
      }));
    }
  }
};

  // 取得目前區域的潛點
  const getCurrentSites = () => {
    return mapData.sites.filter(
      site => site.region_id === mapData.currentRegion.id
    );
  };

  // 取得地圖所需的資料格式
  const getMapData = () => ({
    diveSites: getCurrentSites(),
    region_english: mapData.currentRegion.english,
    region_name: mapData.currentRegion.name
  });

  // UI 相關處理函數
  const handleOpenDiaryForm = () => {
    router.push('/diary?page=add', undefined, { shallow: true });
  };

  const handleCloseDiaryForm = () => {
    router.push('/diary', undefined, { shallow: true });
  };

  const handleCloseDiaryPage = () => {
    router.push('/diary', undefined, { shallow: true });
    setDiaryData(null);
  };

  const handleViewToggle = () => {
    setUiState(prev => ({
      ...prev,
      isMobileMapView: !prev.isMobileMapView
    }));
  };

  // 判斷是否顯示新增表單
  const showDiaryForm = router.query.page === 'add';

  if (uiState.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      {uiState.isMobile ? (
        <div className={styles.mobileContainer}>
          <LogList
            logs={getCurrentLogs()} // 傳遞篩選後的日誌清單
            currentRegionId={mapData.currentRegion.id}
            onRegionChange={currentRegion}
            regions={mapData.regions}
            isMobile={true}
            isMobileMapView={uiState.isMobileMapView}
            onViewToggle={handleViewToggle}
            onOpenDiaryForm={handleOpenDiaryForm}
          />
          {uiState.isMobileMapView && (
            <div className={styles.mobileMapContainer}>
              <LogMap 
                mapData={getMapData()} 
                currentSites={getCurrentSites()}
                onOpenDiaryForm={handleOpenDiaryForm}
              />
            </div>
          )}
        </div>
      ) : (
        <>
          <LogList
            logs={getCurrentLogs()} 
            currentRegionId={mapData.currentRegion.id}
            onRegionChange={handleRegionChange}
            regions={mapData.regions}
            isMobile={false}
            onOpenDiaryForm={handleOpenDiaryForm}
          />
          <LogMap 
            mapData={getMapData()} 
            currentSites={getCurrentSites()}
            onOpenDiaryForm={handleOpenDiaryForm}
          />
        </>
      )}

      {/* 日誌表單 */}
      {showDiaryForm && <DiaryForm onClose={handleCloseDiaryForm} />}

      {/* 日誌詳細頁 */}
      {diaryData && <DiaryPage data={diaryData} onClose={handleCloseDiaryPage} />}
    </div>
  );
}