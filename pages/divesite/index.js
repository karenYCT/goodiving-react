import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SiteList from '@/pages/divesite/sitelist';
import SiteMap from '@/pages/divesite/sitemap';
import Sitepage from '@/pages/divesite/sitepage';
import { API_SERVER } from '@/configs/api-path';
import styles from './index.module.css';
import {
  SitepageModalProvider,
  useSitepageModal,
} from '@/context/sitepage-context';

// 內部組件
function DiveSiteContent({ defaultRegion, defaultSiteId }) {
  const router = useRouter();
  const { openSitepageModal } = useSitepageModal();
  const [isInitialized, setIsInitialized] = useState(false);

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

  // 處理路由變化，自動打開對應的 modal
  useEffect(() => {
    const handleRouteChange = async () => {
      if (!isInitialized) return;

      const siteId = router.query.siteId;
      if (siteId && siteData.allSites.length > 0) {
        const site = siteData.allSites.find(
          (s) => s.site_id === Number(siteId)
        );
        if (site) {
          await openSitepageModal(site, siteData.allSites);
        }
      }
    };
    // 監聽路由變化
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, siteData.allSites, openSitepageModal, isInitialized]);

  // UI 相關狀態
  const [uiState, setUiState] = useState({
    isMobile: false,
    isMobileMapView: false,
    isLoading: true,
  });

  // 處理預設區域
  useEffect(() => {
    if (defaultRegion && siteData.regions.length > 0) {
      const region = siteData.regions.find(
        (r) => r.region_englowercase === defaultRegion
      );
      if (region) {
        handleRegionChange(region.region_id);
      }
    }
  }, [defaultRegion, siteData.regions]);

  // 處理預設潛點
  useEffect(() => {
    if (defaultSiteId && siteData.allSites.length > 0) {
      const site = siteData.allSites.find(
        (s) => s.site_id === Number(defaultSiteId)
      );
      if (site) {
        openSitepageModal(site, siteData.allSites);
      }
    }
  }, [defaultSiteId, siteData.allSites, openSitepageModal]);

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

        setIsInitialized(true);
        // 如果 URL 中有 siteId，立即打開對應的 modal
        if (router.query.siteId) {
          const site = sites.find(
            (s) => s.site_id === Number(router.query.siteId)
          );
          if (site) {
            await openSitepageModal(site, sites);
          }
        }
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

    if (selectedRegion) {
      // 更新 URL
      router.push(
        `/divesite/${selectedRegion.region_englowercase}`,
        undefined,
        {
          shallow: true,
        }
      );
    } else if (isAll) {
      router.push('/divesite', undefined, { shallow: true });
    }

    // 設定新的地區資訊
    const newRegion = {
      name: isAll ? '全部' : selectedRegion?.region_name || '',
      english: isAll
        ? 'GREEN ISLAND'
        : selectedRegion?.region_english || 'GREEN ISLAND',
    };

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
      region_english: siteData.mapRegion.english,
      region_name: siteData.mapRegion.name,
    };
  };

  if (uiState.isLoading) {
    return <div>Loading...</div>;
  }

  const handleCardClick = async (siteId) => {
    try {
      console.log('Current path:', router.asPath);
      const site = siteData.allSites.find((s) => s.site_id === Number(siteId));
      if (!site) return;
  
      const newPath = `/divesite/site/${siteId}`;
      console.log('New path:', newPath);
  
      if (router.asPath !== newPath) {
        console.log('Updating route...');
        await router.push(newPath, undefined, { 
          shallow: true,
          scroll: false 
        });
        console.log('Route updated');
      }
      
      await openSitepageModal(site, siteData.allSites);
      console.log('Modal opened');
    } catch (error) {
      console.error('Error handling card click:', error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {uiState.isMobile ? (
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
            onCardClick={handleCardClick}
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
            onCardClick={handleCardClick}
          />
          <SiteMap mapData={getMapData()} currentSites={getCurrentSites()} />
        </>
      )}
      <Sitepage />
    </div>
  );
}

// 主要的 Index 組件
export default function Index({ defaultRegion, defaultSiteId }) {
  return (
    <SitepageModalProvider>
      <DiveSiteContent
        defaultRegion={defaultRegion}
        defaultSiteId={defaultSiteId}
      />
    </SitepageModalProvider>
  );
}
