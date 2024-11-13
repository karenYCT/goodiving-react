import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LogList from '@/pages/diary/loglist';
import LogMap from '@/pages/diary/logmap';
import EditForm from '@/pages/diary/editform';
import DiaryPage from '@/pages/diary/diarypage';
import DiaryForm from '@/pages/diary/diaryform';
import { API_SERVER } from '@/configs/api-path';
import styles from './index.module.css';
import { get } from 'lodash';

export default function DiaryIndex() {
  const router = useRouter();

  // ================ 狀態定義區 ================
  // 1.日誌相關狀態
  const [diaryData, setDiaryData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState('all');

  // 2.地圖相關狀態
  const [mapData, setMapData] = useState({
    currentRegion: {
      id: 1,
      name: '',
      english: 'greenisland',
    },
    regions: [],
    sites: [],
  });

  //地圖座標作為篩選器狀態
  const [filterState, setFilterState] = useState({
    siteName: '',
    siteId: '',
    filteredLogs: [], // 篩選出來的日誌
  });

  // 3.UI 控制狀態

  const [isLoading, setIsLoading] = useState(false);
  const [showDiaryForm, setShowDiaryForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [uiState, setUiState] = useState({
    isMobile: false,
    isMobileMapView: false,
    isLoading: true,
  });

  // ================ 資料讀取函數區 ================
  // 1.獲取地圖資料
  const fetchMapData = async () => {
    try {
      setUiState((prev) => ({ ...prev, isLoading: true }));

      const [regionsRes, sitesRes] = await Promise.all([
        fetch(`${API_SERVER}/divesite/region`),
        fetch(`${API_SERVER}/divesite/all`),
      ]);

      const [regions, sites] = await Promise.all([
        regionsRes.json(),
        sitesRes.json(),
      ]);
      console.log('獲取到的潛點資料:', sites); // 新增這行
      const defaultRegion = regions.find((r) => r.region_id === 1) || {
        region_id: 1,
        region_name: '',
        region_english: 'greenisland',
      };

      setMapData({
        regions,
        sites,
        currentRegion: {
          id: defaultRegion.region_id,
          name: defaultRegion.region_name,
          english: defaultRegion.region_english,
        },
      });
    } catch (error) {
      console.error('獲取地圖資料錯誤:', error);
    } finally {
      setUiState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // 2.獲取單一日誌資料
  const getDiaryData = async (id) => {
    if (diaryData?.log_id === id) {
      return;
    }
    try {
      setIsLoading(true);
      console.log('開始獲取日誌資料, id:', id);

      const response = await fetch(`${API_SERVER}/diary/${id}`);
      const data = await response.json();
      console.log('獲取到的基本資料:', data);

      const imgResponse = await fetch(`${API_SERVER}/diary/images/${id}`);
      const imgData = await imgResponse.json();
      console.log('獲取到的圖片資料:', imgData);

      console.log('準備合併的資料:', { data, imgData });

      setDiaryData({
        ...data,
        images: imgData,
      });
    } catch (error) {
      console.error('獲取日誌資料錯誤:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ================ 資料處理函數 ================

  // 1.更新日誌獲取函數
  const fetchLogs = async (regionId = 'all') => {
    try {
      setIsLoading(true);
      const url =
        regionId === 'all'
          ? `${API_SERVER}/diary/logs`
          : `${API_SERVER}/diary/logs?region_id=${regionId}`;

      console.log('獲取日誌資料來源:', url);

      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data)) {
        setLogs(data);
        console.log(`Fetched ${data.length} logs`); // 調試用
      } else {
        console.error('API 返回的資料不是陣列:', data);
        setLogs([]);
      }
    } catch (error) {
      console.error('獲取日誌資料錯誤:', error);
      setLogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. 獲取當前區域的潛點
  const getCurrentSites = () => {
    return mapData.sites
      .filter((site) => site.region_id === mapData.currentRegion.id)
      .map((site) => ({
        ...site,
        x_position: site.x_position,
        y_position: site.y_position,
        type: site.method_name?.toLowerCase().includes('boat')
          ? 'boat'
          : 'shore',
      }));
  };

  // 3.取得地圖所需的資料格式
  const getMapData = () => ({
    diveSites: getCurrentSites(),
    region_english: mapData.currentRegion.english,
    region_name: mapData.currentRegion.name,
  });

  // ================ 事件處理函數 ================
  // 1.UI相關
  const handleViewToggle = () => {
    setUiState((prev) => ({
      ...prev,
      isMobileMapView: !prev.isMobileMapView,
    }));
  };

  // 2.處理區域切換
  const handleRegionChange = (regionId) => {
    console.log('Region changed to:', regionId); // 調試用

    // 設定目前選擇的區域
    setCurrentRegion(regionId);

    // 重新獲取該區域的日誌
    fetchLogs(regionId);

    // 如果不是 'all'，則更新地圖顯示
    if (regionId !== 'all') {
      const selectedRegion = mapData.regions.find(
        (r) => r.region_id === Number(regionId)
      );

      if (selectedRegion) {
        setMapData((prev) => ({
          ...prev,
          currentRegion: {
            id: selectedRegion.region_id,
            name: selectedRegion.region_name,
            english: selectedRegion.region_english,
          },
        }));
      }
    }
  };

  //處理地圖座標的點擊
  const handleSiteClick = (siteLogs = [], siteName = '') => {
    const logArray = Array.isArray(siteLogs) ? siteLogs : [];
    setFilterState({
      siteName: siteName || '',
      siteId: logArray[0]?.site_id || null,
      filteredLogs: logArray,
    });
  };

  // 清除篩選
  const handleClearFilter = () => {
    setFilterState({
      siteName: '',
      siteId: null,
      filteredLogs: [],
    });
  };

  // ================ 路由處理函數 ================
  // 1.日誌相關
  const handleDiaryClick = async (logId) => {
    router.push(`/diary?log_id=${logId}`, undefined, { shallow: true });
  };

  const handleCloseDiaryPage = () => {
    router.push('/diary', undefined, { shallow: true });
    setDiaryData(null);
  };

  // 2.表單相關
  const handleOpenDiaryForm = () => {
    router.push('/diary?page=add', undefined, { shallow: true });
  };

  const handleCloseDiaryForm = () => {
    router.push('/diary', undefined, { shallow: true });
  };

  // 處理編輯按鈕點擊
  const handleEditClick = (logId) => {
    setDiaryData(null);
    setEditData(diaryData);
    setShowEditForm(true);
    router.push(`/diary?page=edit&log_id=${logId}`, undefined, { shallow: true });
  };

  // 處理關閉編輯表單
  const handleCloseEditForm = () => {
    router.push('/diary', undefined, { shallow: true });
    setShowEditForm(false);
    setEditData(null);
  };

  // ================ useEffect ================
  // 1. 初始資料讀取
  useEffect(() => {
    // 獲取初始日誌列表
    fetchLogs();
    // 獲取地圖資料
    fetchMapData();
  }, []);

  // 3.檢查設備類型
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

  // 4. URL參數變化監聽(日誌詳細頁、新增日誌頁面、編輯日誌頁面)
  useEffect(() => {
    const fetchData = async () => {
      const { page, log_id } = router.query;
      
      if (page === 'edit' && log_id) {
        // 獲取日誌資料用於編輯
        const data = await getDiaryData(log_id);
        if (data) {
          setEditData(data);
          setShowEditForm(true);
          setDiaryData(null);  // 關閉日誌詳情頁
        }
      } else if (log_id && !page) {
        // 一般查看日誌
        await getDiaryData(log_id);
        setShowEditForm(false);
      } else {
        // 其他情況
        setShowEditForm(false);
        setEditData(null);
        setDiaryData(null);
      }
    };
  
    fetchData();
  }, [router.query]);


  // ================ 條件渲染處理  ================

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // ================ 渲染  ================
  return (
    <div className={styles.pageContainer}>
      {uiState.isMobile ? (
        <div className={styles.mobileContainer}>
          <LogList
            // logs={logs || []} // 傳遞篩選後的日誌清單
            logs={
              filterState.filteredLogs?.length > 0
                ? filterState.filteredLogs
                : logs || []
            }
            diaryData={diaryData} //傳遞完整的日誌資料
            currentRegionId={currentRegion}
            onRegionChange={handleRegionChange}
            regions={mapData.regions || []}
            isMobile={true}
            isMobileMapView={uiState.isMobileMapView}
            onViewToggle={handleViewToggle}
            onOpenDiaryForm={handleOpenDiaryForm}
            onDiaryClick={handleDiaryClick}
            filteredSiteName={filterState.siteName}
            onClearFilter={handleClearFilter}
            fetchLogs={fetchLogs}
          />
          {uiState.isMobileMapView && (
            <div className={styles.mobileMapContainer}>
              <LogMap
                mapData={getMapData()}
                currentSites={getCurrentSites()}
                logs={logs}
                onOpenDiaryForm={handleOpenDiaryForm}
                onSiteClick={handleSiteClick} // 新增這個 prop
              />
            </div>
          )}
        </div>
      ) : (
        <>
          <LogList
            // logs={logs || []}
            logs={
              filterState.filteredLogs.length > 0
                ? filterState.filteredLogs
                : logs
            }
            currentRegionId={currentRegion}
            onRegionChange={handleRegionChange}
            regions={mapData.regions || []}
            isMobile={false}
            onOpenDiaryForm={handleOpenDiaryForm}
            onDiaryClick={handleDiaryClick}
            filteredSiteName={filterState.siteName}
            onClearFilter={handleClearFilter}
            fetchLogs={fetchLogs}
          />
          <LogMap
            mapData={getMapData()}
            currentSites={getCurrentSites()}
            logs={logs}
            onOpenDiaryForm={handleOpenDiaryForm}
            onSiteClick={handleSiteClick}
          />
        </>
      )}

      {/* 新增日誌表單 */}
      {showDiaryForm && <DiaryForm onClose={handleCloseDiaryForm} />}

      {/* 讀取日誌詳細頁 */}
      {diaryData && (
        <DiaryPage diaryData={diaryData} onClose={handleCloseDiaryPage} onEdit={handleEditClick} />
      )}
      {/* 編輯日誌表單 */}
      {showEditForm && editData && (
        <EditForm onClose={handleCloseEditForm} logData={editData} />
      )}
    </div>
  );
}
