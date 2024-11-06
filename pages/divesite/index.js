import React, { useState, useEffect } from 'react';
import SiteList from '@/components/karen/sitelist';
import SiteMap from '@/components/karen/sitemap';
import Sitepage from '@/components/karen/sitepage';
import { API_SERVER } from '@/configs/api-path';
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
  const [allSites, setAllSites] = useState([]); // 新增: 儲存所有潛點的資料

  const [methods, setMethods] = useState([]);
  const [levels, setLevels] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [isMobileMapView, setIsMobileMapView] = useState(false);
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

  // 獲取地區列表(已經加寫在下方，可考慮刪除)
  // useEffect(() => {
  //   const fetchRegions = async () => {
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/divesite/region`);
  //       if (!response.ok) throw new Error('獲取地區資料失敗');
  //       const data = await response.json();

  //       setRegions(data);
  //     } catch (error) {
  //       console.error('獲取地區資料錯誤:', error);
  //       setRegions([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchRegions();
  // }, []);

  //從資料庫獲取所需要的資料
  useEffect(() => {
    const fetchData = async () => {
      try {

        // 獲取所有地區
        const regionsResponse = await fetch(`${API_SERVER}/divesite/region`);
        if (!regionsResponse.ok) throw new Error('獲取地區資料失敗');
        const regionsData = await regionsResponse.json();
        console.log('Regions data:', regionsData);
        setRegions(regionsData);

        // 獲取所有方法
        const methodsResponse = await fetch(`${API_SERVER}/divesite/method`);
        if (!methodsResponse.ok) throw new Error('獲取潛水方式失敗');
        const methodsData = await methodsResponse.json();
        console.log('Methods data:', methodsData);
        setMethods(methodsData);

        // 獲取所有難易度
        const levelsResponse = await fetch(`${API_SERVER}/divesite/level`);
        if (!levelsResponse.ok) throw new Error('獲取難易度失敗');
        const levelsData = await levelsResponse.json();
        console.log('Levels data:', levelsData);
        setLevels(levelsData);

        // 獲取所有潛點資料
        const allSitesPromises = regionsData.map(region => 
          fetch(`${API_SERVER}/divesite/region/${region.region_id}`)
            .then(res => res.json())
        );

        const allRegionsSites = await Promise.all(allSitesPromises);
        // 將所有地區的潛點合併成一個陣列
        const allSitesData = allRegionsSites.flat();
        setAllSites(allSitesData);

      } catch (error) {
        console.error('獲取資料錯誤', error);
      }
    };
    fetchData();
  }, []);

  // 獲取特定地區的潛點資料
  // useEffect(() => {
  //   const fetchRegionData = async () => {
  //     if (!selectedRegion) return;

  //     try {
  //       setLoading(true);

  //       const response = await fetch(
  //         `${API_SERVER}/divesite/region/${selectedRegion}`
  //       );

  //       if (!response.ok) throw new Error('獲取潛點資料失敗');

  //       const data = await response.json();

        // 設置地圖資料
  //       setMapData({
  //         diveSites: data,
  //         region_english: data[0]?.region_english || 'greenisland',
  //         region_name: data[0]?.region_name || '',
  //       });
  //     } catch (error) {
  //       console.error('獲取潛點資料錯誤:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchRegionData();
  // }, [selectedRegion]);

  // 處理地區選擇變更
  const handleRegionChange = (regionId) => {
    console.log('選擇地區:', regionId);
    if(regionId === 'all'){
      setSelectedRegion(null);
      setMapData({
        diveSites: allSites,
        region_english: 'GREEN ISLAND',
        region_name: '全部地區',
      });
    }else{
      setSelectedRegion(regionId); // 直接設置新的 regionId
      fetchRegionData(regionId); // 獲取特定地區的資料
    }
  };

  // 將 fetchRegionData 獨立出來作為一個函數
  const fetchRegionData = async (regionId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_SERVER}/divesite/region/${regionId}`
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

   // 修改 useEffect，只在有 selectedRegion 且不是 'all' 時才獲取資料
  useEffect(() => {
    if (selectedRegion) {
      fetchRegionData(selectedRegion);
    }
  }, [selectedRegion]);

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
              methods={methods}
              levels={levels}
              allSites={allSites} // 所有潛點的資料
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
              methods={methods}
              levels={levels}
              allSites={allSites} 
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
