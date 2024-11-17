import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SiteList from '@/pages/divesite/sitelist';
import SiteMap from '@/pages/divesite/sitemap';
import Sitepage from '@/pages/divesite/sitepage';
import { API_SERVER } from '@/configs/api-path';
import styles from './index.module.css';

export default function DiveSiteIndex() {
  const router = useRouter();
  const { site_id, region } = router.query;
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Add modal state
  const [modal, setModal] = useState({
    isOpen: false,
    data: null,
    currentSites: []
  });

  // Modal control functions
  const openModal = (site, allSites) => {
    setModal({
      isOpen: true,
      data: site,
      currentSites: allSites
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      data: null,
      currentSites: []
    });
  };

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

  // ================ 資料讀取函數區 ================
  const fetchInitialData = async () => {
    if (siteData.allSites.length > 0 && siteData.regions.length > 0) {
      return;
    }

    try {
      setUiState(prev => ({ ...prev, isLoading: true }));

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

      setSiteData({
        allSites: sites,
        regions,
        methods,
        levels,
        currentRegionId: 'all',
        currentMapSites: [],
        mapRegion: {
          name: '全部',
          english: 'ALL',
        },
      });

      setIsInitialized(true);
    } catch (error) {
      console.error('獲取資料錯誤:', error);
    } finally {
      setUiState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const fetchRegionCoordinates = async (regionId) => {
    if (regionId === 'all') return [];
    
    try {
      const response = await fetch(`${API_SERVER}/divesite/coordinates/${regionId}`);
      return await response.json();
    } catch (error) {
      console.error('獲取座標資料錯誤:', error);
      return [];
    }
  };

  const getMapData = () => ({
    diveSites: siteData.currentMapSites,
    region_english: siteData.mapRegion.english,
    region_name: siteData.mapRegion.name
  });

  // ================ 事件處理函數 ================
  const handleViewToggle = () => {
    setUiState(prev => ({
      ...prev,
      isMobileMapView: !prev.isMobileMapView,
    }));
  };

  const handleRegionChange = async (regionId) => {
    const isAll = regionId === 'all';

    try {
      setUiState(prev => ({ ...prev, isLoading: true }));
      
      const mapSites = await fetchRegionCoordinates(regionId);

      router.push(
        isAll ? '/divesite' : `/divesite/${regionId}`,
        undefined,
        { shallow: true }
      );

      // 找到對應的地區資訊
      const selectedRegion = isAll 
      ? { region_name: '全部', region_english: 'ALL' }
      : siteData.regions.find(r => r.region_id === Number(regionId)) || {
          region_name: '',
          region_english: 'GREEN ISLAND'
        };
    

      setSiteData(prev => ({
        ...prev,
        currentRegionId: regionId,
        currentMapSites: mapSites || [],
        mapRegion: {
          name: selectedRegion.region_name,
          english: selectedRegion.region_english,
        },
      }));
    } catch (error) {
      console.error('切換地區錯誤:', error);
    } finally {
      setUiState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleCardClick = async (siteId) => {
    try {
      const site = siteData.allSites.find(s => s.site_id === Number(siteId));
      if (!site) return;

      const newPath = `/divesite/site/${siteId}`;
      
      if (router.asPath !== newPath) {
        await router.push(newPath, undefined, { 
          shallow: true,
          scroll: false 
        });
      }
      
      openModal(site, siteData.allSites);
    } catch (error) {
      console.error('處理卡片點擊錯誤:', error);
    }
  };

  const handleModalOpen = (site, currentSites) => {
    setModal({
      isOpen: true,
      data: site,
      currentSites: currentSites
    });
  };

  // ================ useEffect 區 ================
  useEffect(() => {
    fetchInitialData();
  }, []);

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

  useEffect(() => {
    if (!isInitialized) return;

    const handleRouteChange = async () => {
      if (site_id && siteData.allSites.length > 0) {
        const site = siteData.allSites.find(s => s.site_id === Number(site_id));
        if (site) {
          openModal(site, siteData.allSites);
        }
      }
    };

    handleRouteChange();
  }, [router, siteData.allSites, isInitialized]);

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
            onCardClick={handleCardClick}
            onModalOpen={handleModalOpen}
          />
          {uiState.isMobileMapView && (
            <div className={styles.mobileMapContainer}>
              <SiteMap
                mapData={getMapData()}
                region={siteData.mapRegion}
                onModalOpen={handleModalOpen}
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
          <SiteMap
            mapData={getMapData()}
            region={siteData.mapRegion}
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