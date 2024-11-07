import React, { useState, useEffect } from 'react';
import SiteList from '@/components/karen/sitelist';
import SiteMap from '@/components/karen/sitemap';
import Sitepage from '@/components/karen/sitepage';
import { API_SERVER } from '@/configs/api-path';
import styles from './index.module.css';
import { SitepageModalProvider } from '@/context/sitepage-context';

export default function Index() {
  // 統一管理所有潛點相關的資料
  const [siteData, setSiteData] = useState({
    allSites: [],
    regions: [],
    methods: [],
    levels: [],
    currentRegionId: 1, // 預設地區
    mapRegion: {
      name: '',
      english: 'greenisland',
    },
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
      setUiState((prev) => ({
        ...prev,
        isMobile: window.innerWidth <= 576,
      }));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 獲取所有資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        setUiState((prev) => ({ ...prev, isLoading: true }));

        // 並行獲取所有資料
        const [sitesRes, regionsRes, methodsRes, levelsRes] = await Promise.all(
          [
            fetch(`${API_SERVER}/divesite/all`),
            fetch(`${API_SERVER}/divesite/region`),
            fetch(`${API_SERVER}/divesite/method`),
            fetch(`${API_SERVER}/divesite/level`),
          ]
        );

        const [sites, regions, methods, levels] = await Promise.all([
          sitesRes.json(),
          regionsRes.json(),
          methodsRes.json(),
          levelsRes.json(),
        ]);

        // 初始地區資訊
        const defaultRegion = regions.find((r) => r.region_id === 1) || {
          region_name: '',
          region_english: 'greenisland',
        };

        setSiteData({
          allSites: sites,
          regions,
          methods,
          levels,
          currentRegionId: 1,
          mapRegion: {
            name: defaultRegion.region_name,
            english: defaultRegion.region_english,
          },
        });
      } catch (error) {
        console.error('獲取資料錯誤:', error);
      } finally {
        setUiState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchData();
  }, []);

  const handleRegionChange = (regionId) => {
    const isAll = regionId === 'all';

    // 找到選中的地區資訊
    const selectedRegion = isAll
      ? null
      : siteData.regions.find((r) => r.region_id === Number(regionId));

    // 設定新的地區資訊
    const newRegion = {
      name: isAll ? '全部' : selectedRegion?.region_name || '',
      english: isAll
        ? 'GREEN ISLAND' // 當選擇全部時，維持大寫格式
        : selectedRegion?.region_english || 'GREEN ISLAND', // 使用資料庫中的格式
    };

    console.log('Region change:', {
      regionId,
      isAll,
      selectedRegion,
      newRegion,
    });

    setSiteData((prev) => ({
      ...prev,
      currentRegionId: isAll ? null : Number(regionId),
      mapRegion: newRegion,
    }));
  };

  // 取得當前應該顯示的潛點
  const getCurrentSites = () => {
    if (!siteData.currentRegionId) return siteData.allSites;
    return siteData.allSites.filter(
      (site) => site.region_id === siteData.currentRegionId
    );
  };

  // 處理視圖切換
  const handleViewToggle = () => {
    setUiState((prev) => ({
      ...prev,
      isMobileMapView: !prev.isMobileMapView,
    }));
  };

  // 取得地圖需要的資料格式
  const getMapData = () => {
    const diveSites = siteData.currentRegionId ? getCurrentSites() : [];

    return {
      diveSites,
      region_english: siteData.mapRegion.english, // 直接傳送 english，不要包在 region 物件中
      region_name: siteData.mapRegion.name, // 直接傳送 name，不要包在 region 物件中
    };
  };

  if (uiState.isLoading) {
    return <div>Loading...</div>; // 可以替換成實際的 loading 組件
  }

  return (
    <SitepageModalProvider>
      <div className={styles.pageContainer}>
        {uiState.isMobile ? (
          // 手機版面
          <div className={styles.mobileContainer}>
            <SiteList
              currentRegionId={siteData.currentRegionId}
              onRegionChange={handleRegionChange}
              allSites={siteData.allSites}
              regions={siteData.regions}
              methods={siteData.methods}
              levels={siteData.levels}
              isMobile={true}
              isMobileMapView={uiState.isMobileMapView}
              onViewToggle={handleViewToggle}
            />
            {uiState.isMobileMapView && (
              <div className={styles.mobileMapContainer}>
                <SiteMap
                  mapData={getMapData()}
                  currentSites={getCurrentSites()}
                />
              </div>
            )}
          </div>
        ) : (
          // 桌面版面
          <>
            <SiteList
              currentRegionId={siteData.currentRegionId}
              onRegionChange={handleRegionChange}
              allSites={siteData.allSites}
              regions={siteData.regions}
              methods={siteData.methods}
              levels={siteData.levels}
              isMobile={false}
              isMobileMapView={false}
            />
            <SiteMap mapData={getMapData()} currentSites={getCurrentSites()} />
          </>
        )}
        <Sitepage />
      </div>
    </SitepageModalProvider>
  );
}
