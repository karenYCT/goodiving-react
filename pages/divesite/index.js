import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SiteList from '@/pages/divesite/sitelist';
import SiteMap from '@/pages/divesite/sitemap';
import Sitepage from '@/pages/divesite/sitepage';
import { API_SERVER } from '@/configs/api-path.js';
import styles from './index.module.css';

export default function DiveSiteIndex() {
  const router = useRouter();
  const { region = 'all', siteId } = router.query;
  const [isInitialized, setIsInitialized] = useState(false);

  // Add modal state
  const [modal, setModal] = useState({
    isOpen: false,
    data: null,
    currentSites: [],
  });

  // ================ 狀態定義區 ================
  const [siteData, setSiteData] = useState({
    allSites: [],
    regions: [],
    methods: [],
    levels: [],
    currentRegionId: 'all',
    currentMapSites: [],
    mapRegion: {
      name: '全部',
      english: 'ALL',
    },
  });

  const [uiState, setUiState] = useState({
    isMobile: false,
    isMobileMapView: false,
    isLoading: true,
  });

  // Modal control functions

  const openModal = (site, allSites) => {
    // Update URL with siteId query parameter
    router.push(
      {
        pathname: '/divesite',
        query: {
          ...router.query,
          siteId: site.site_id,
        },
      },
      undefined,
      { shallow: true, scroll: false }
    );

    setModal({
      isOpen: true,
      data: site,
      currentSites: allSites,
    });
  };

  const closeModal = () => {
    // Remove siteId from query parameters
    const { siteId, ...restQuery } = router.query;
    router.push(
      {
        pathname: '/divesite',
        query: restQuery,
      },
      undefined,
      { shallow: true }
    );

    setModal({
      isOpen: false,
      data: null,
      currentSites: [],
    });
  };

  // ================ 資料讀取函數區 ================
  const fetchInitialData = async () => {
    if (siteData.allSites.length > 0 && siteData.regions.length > 0) {
      return;
    }

    try {
      setUiState((prev) => ({ ...prev, isLoading: true }));

      const [sitesRes, regionsRes, methodsRes, levelsRes] = await Promise.all([
        fetch(`${API_SERVER}/divesite/all`),
        fetch(`${API_SERVER}/divesite/region`),
        fetch(`${API_SERVER}/divesite/method`),
        fetch(`${API_SERVER}/divesite/level`),
      ]);

      const [sites, regions, methods, levels] = await Promise.all([
        sitesRes.json(),
        regionsRes.json(),
        methodsRes.json(),
        levelsRes.json(),
      ]);
      console.log('API 回傳的原始資料:', sites[0]); // 檢查第一筆資料的完整結構

      setSiteData({
        allSites: sites,
        regions,
        methods,
        levels,
        currentRegionId: 'all',
        currentMapSites: sites, // 初始顯示所有潛點
        mapRegion: {
          name: '全部',
          english: 'ALL',
        },
      });

      setIsInitialized(true);
    } catch (error) {
      console.error('獲取資料錯誤:', error);
    } finally {
      setUiState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const fetchRegionCoordinates = async (regionId) => {
    if (regionId === 'all') return [];

    try {
      const response = await fetch(
        `${API_SERVER}/divesite/coordinates/${regionId}`
      );
      return await response.json();
    } catch (error) {
      console.error('獲取座標資料錯誤:', error);
      return [];
    }
  };

  const mapData = () => ({
    diveSites: siteData.currentMapSites,
    region_english: siteData.mapRegion.english,
    region_name: siteData.mapRegion.name,
  });

  // ================ 事件處理函數 ================
  const handleViewToggle = () => {
    setUiState((prev) => ({
      ...prev,
      isMobileMapView: !prev.isMobileMapView,
    }));
  };

  const handleRegionChange = async (regionId) => {
    // 如果當前已經是這個地區，就不需要再次觸發
    // if (regionId === siteData.currentRegionId) return;

    try {
      setUiState((prev) => ({ ...prev, isLoading: true }));

      // 更新路由
      router.push(
        {
          pathname: '/divesite',
          query: {
            ...router.query,
            region: regionId,
          },
        },
        undefined,
        { shallow: true }
      );

      // 找到對應的地區資訊
      const isAll = regionId === 'all';
      const selectedRegion = isAll
        ? { region_name: '全部', region_english: 'ALL' }
        : siteData.regions.find((r) => r.region_id === Number(regionId)) || {
            region_name: '',
            region_english: 'GREEN ISLAND',
          };

      const mapSites = isAll
        ? '' // 全部時使用所有潛點
        : siteData.allSites.filter((sites) => {
            console.log('篩選潛點:', sites);
            return sites.region_id === Number(regionId); // 特定地區時獲取座標
          });

      // 更新狀態
      setSiteData((prev) => ({
        ...prev,
        currentRegionId: regionId,
        currentMapSites: mapSites,
        mapRegion: {
          name: selectedRegion.region_name,
          english: selectedRegion.region_english,
        },
      }));
      console.log('更新後的地區資料：', siteData);
    } catch (error) {
      console.error('切換地區錯誤:', error);
    } finally {
      setUiState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // ================ useEffect 區 ================
  useEffect(() => {
    fetchInitialData();
  }, []);

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

  useEffect(() => {
    if (!isInitialized || !router.isReady) return;

    // Handle region change from URL
    if (region && region !== siteData.currentRegionId) {
      handleRegionChange(region);
    }

    // Handle site modal from URL
    if (siteId && siteData.allSites.length > 0) {
      const site = siteData.allSites.find((s) => s.site_id === Number(siteId));
      if (site && !modal.isOpen) {
        openModal(site, siteData.allSites);
      }
    } else if (!siteId && modal.isOpen) {
      closeModal();
    }
  }, [router.isReady, region, siteId, siteData.allSites, isInitialized]);

  // ================ 渲染邏輯 ================
  if (uiState.isLoading) {
    return <div>Loading...</div>;
  }

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
            onModalOpen={openModal}
          />
          {uiState.isMobileMapView && (
            <div className={styles.mobileMapContainer}>
              <SiteMap
                mapData={mapData()}
                region={siteData.mapRegion}
                currentSites={siteData.allSites}
                onModalOpen={openModal}
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
            onModalOpen={openModal}
          />
          <SiteMap
            mapData={mapData()}
            region={siteData.mapRegion}
            currentSites={siteData.allSites}
            onModalOpen={openModal}
          />
        </>
      )}
      <Sitepage
        isOpen={modal.isOpen}
        data={modal.data}
        currentSites={modal.currentSites}
        onClose={closeModal}
      />
    </div>
  );
}
