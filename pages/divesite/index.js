import React, { useState, useEffect } from 'react';
import SiteList from '@/components/karen/sitelist';
import SiteMap from '@/components/karen/sitemap';
import Sitepage from '@/components/karen/sitepage';
import { API_BASE_URL } from '@/configs/api-path';
import styles from './index.module.css';
import { SitepageModalProvider } from '@/context/sitepage-context';

export default function Index() {
  // 狀態管理
  const [selectedRegion, setSelectedRegion] = useState(1); // 預設顯示第一個地區
  const [regions, setRegions] = useState([]); // 存儲所有地區
  const [mapData, setMapData] = useState({
    diveSites: [], //存放潛點資料的陣列
    region: {
      region_name: '',
      region_english: 'greenisland',
    },
  });
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  // 新增移動設備視圖狀態
  const [isMobileMapView, setIsMobileMapView] = useState(false);
  // 新增是否為手機設備
  const [isMobile, setIsMobile] = useState(false);

  //檢查設備類型
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 獲取地區列表
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/divesite/region`);
        if (!response.ok) throw new Error('獲取地區資料失敗');
        const data = await response.json();

        setRegions(data);
      } catch (error) {
        console.error('獲取地區資料錯誤:', error);
        setRegions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRegions();
  }, []);

  // 獲取特定地區的潛點資料
  useEffect(() => {
    const fetchRegionData = async () => {
      if (!selectedRegion) return;

      try {
        setLoading(true);

        const response = await fetch(
          `${API_BASE_URL}/divesite/region/${selectedRegion}`
        );

        if (!response.ok) throw new Error('獲取潛點資料失敗');

        const data = await response.json();

        // 設置地圖資料
        setMapData({
          diveSites: data,
          region_english: data[0]?.region_english || 'greenisland',
          region_name: data[0]?.region_name || '',
        });
      } catch (error) {
        console.error('獲取潛點資料錯誤:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegionData();
  }, [selectedRegion]);

  // 處理地區選擇變更
  const handleRegionChange = (regionId) => {
    console.log('選擇地區:', regionId);
    setSelectedRegion(regionId);
  };

  // 處理視圖切換
  const handleViewToggle = () => {
    setIsMobileMapView((prev) => !prev);
  };

  return (
    <SitepageModalProvider>
      <div className={`${styles['pageContainer']}`}>
        {isMobile ? (
          //手機版面
          <div className={`${styles['mobileContainer']}`}>
            <SiteList
              selectedRegion={selectedRegion}
              onRegionChange={handleRegionChange}
              regions={regions}
              currentSites={mapData.diveSites}
              isMobileMapView={isMobileMapView}
              onViewToggle={handleViewToggle}
              isMobile={true}
            />
            {isMobileMapView && (
              <div className={styles.mobileMapContainer}>
                <SiteMap
                  mapData={{
                    ...mapData,
                    diveSites: mapData.diveSites,
                  }}
                  currentSites={mapData.diveSites}
                />
              </div>
            )}
          </div>
        ) : (
          //桌面版面
          <>
            <SiteList
              selectedRegion={selectedRegion}
              onRegionChange={handleRegionChange}
              regions={regions}
              currentSites={mapData.diveSites}
            />
            <SiteMap
              mapData={{
                ...mapData,
                diveSites: mapData.diveSites,
              }}
              currentSites={mapData.diveSites}
            />
          </>
        )}
        <Sitepage />
      </div>
    </SitepageModalProvider>
  );
}
