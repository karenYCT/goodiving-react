import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';
import { API_SERVER } from '@/configs/api-path.js';
import LogList from '@/pages/diary/loglist';
import LogMap from '@/pages/diary/logmap';
import EditForm from '@/pages/diary/editform';
import DiaryPage from '@/pages/diary/diarypage';
import DiaryForm from '@/pages/diary/diaryform';
import styles from './index.module.css';
import toast from 'react-hot-toast';
import { IoCloseCircleOutline } from 'react-icons/io5';

export default function DiaryIndex() {
  const router = useRouter();
  const { log_id, action } = router.query;

  // ================ 狀態定義區 ================
  const { auth, getAuthHeader } = useAuth();
  // 1.日誌相關狀態
  const [diaryData, setDiaryData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState('all');
  const [drafts, setDrafts] = useState([]);

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
  const [activeTab, setActiveTab] = useState(0); // 0: 日誌, 1: 草稿
  const [uiState, setUiState] = useState({
    isMobile: false,
    isMobileMapView: false,
    isLoading: true,
  });

  // ================ 資料讀取函數區 ================

  // 新增檢查函數
  const checkAuthState = () => {
    if (!auth.token) {
      toast.error('請先登入以查看日誌');
      router.push('/login'); // 假設有登入頁面
      return false;
    }
    return true;
  };
  // 1.獲取地圖資料
  const fetchMapData = async () => {
    try {
      setUiState((prev) => ({ ...prev, isLoading: true }));

      const regionsRes = await fetch(`${API_SERVER}/divesite/region`);
      const regions = await regionsRes.json();

      const defaultRegion = regions.find((r) => r.region_id === 1) || {
        region_id: 1,
        region_name: '',
        region_english: 'greenisland',
      };

      // 獲取第一個地區的座標資料
      const sitesRes = await fetch(`${API_SERVER}/divesite/coordinates/1`);
      const sites = await sitesRes.json();

      setMapData({
        regions,
        sites, // 初始座標資料
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
  // 新增座標獲取函數
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

  // 2.獲取單一日誌資料

  const getDiaryData = async (id) => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_SERVER}/diary/${id}`, {
        headers: getAuthHeader(), // 使用來自auth-context的getAuthHeader
        credentials: 'include',
      });

      if (response.status === 401) {
        toast.error('請先登入');
        return null;
      }

      const data = await response.json();

      if (action === 'edit') {
        setEditData(data);
      } else {
        setDiaryData(data);
      }

      return data;
    } catch (error) {
      console.error('獲取日誌資料錯誤:', error);
    } finally {
      setIsLoading(false);
    }
  };

  //獲取草稿
  const fetchDrafts = async () => {
    try {
      const res = await fetch(`${API_SERVER}/diary/drafts`, {
        headers: getAuthHeader(), // 使用來自auth-context的getAuthHeader
        credentials: 'include',
      });

      if (res.status === 401) {
        toast.error('請先登入');
        return;
      }

      const data = await res.json();
      setDrafts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('獲取草稿失敗:', error);
      setDrafts([]);
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

      // const response = await fetch(url);
      const response = await fetch(url, {
        headers: getAuthHeader(), // 使用來自auth-context的getAuthHeader
        credentials: 'include',
      });
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
    if (!mapData.sites || !mapData.currentRegion.id) return [];

    return mapData.sites
      .filter((site) => {
        // 如果是 'all' 就顯示所有潛點，否則按照地區過濾
        return (
          mapData.currentRegion.id === 'all' ||
          site.region_id === mapData.currentRegion.id
        );
      })
      .map((site) => ({
        ...site,
        site_id: site.site_id,
        site_name: site.site_name,
        x_position: site.x_position,
        y_position: site.y_position,
        type: site.method_name?.toLowerCase().includes('boat')
          ? 'boat'
          : 'shore',
      }));
  };

  // 3.取得地圖所需的資料格式
  const getMapData = () => ({
    diveSites: mapData.sites,
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

  const handleRegionChange = async (regionId) => {
    console.log('Region changed to:', regionId);

    // 設定目前選擇的區域
    setCurrentRegion(regionId);

    // 重新獲取該區域的日誌
    fetchLogs(regionId);

    try {
      setUiState((prev) => ({ ...prev, isLoading: true }));

      let mapSites = [];
      let selectedRegion;

      if (regionId === 'all') {
        selectedRegion = {
          region_id: 'all',
          region_name: '全部',
          region_english: 'ALL',
        };
      } else {
        // 獲取新地區的座標資料
        mapSites = await fetchRegionCoordinates(regionId);
        selectedRegion = mapData.regions.find(
          (r) => r.region_id === Number(regionId)
        ) || {
          region_id: regionId,
          region_name: '',
          region_english: 'GREEN ISLAND',
        };
      }

      setMapData((prev) => ({
        ...prev,
        sites: mapSites, // 更新座標資料
        currentRegion: {
          id: selectedRegion.region_id,
          name: selectedRegion.region_name,
          english: selectedRegion.region_english,
        },
      }));
    } catch (error) {
      console.error('切換地區錯誤:', error);
    } finally {
      setUiState((prev) => ({ ...prev, isLoading: false }));
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

  //處理tab切換
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 1) {
      fetchDrafts();
    } else {
      fetchLogs();
    }
  };

  // ================ 路由處理函數 ================
  // 1.日誌相關
  const handleDiaryClick = async (logId) => {
    router.push(`/diary?log_id=${logId}`, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  const handleCloseDiaryPage = () => {
    router.push('/diary', undefined, { shallow: true, scroll: false });
    setDiaryData(null);
  };

  // 2.表單相關
  const handleOpenDiaryForm = () => {
    router.push('/diary?action=add', undefined, {
      shallow: true,
      scroll: false,
    });
  };

  const handleCloseDiaryForm = () => {
    router.push('/diary', undefined, { shallow: true, scroll: false });
    setShowDiaryForm(false);
  };

  // 處理編輯按鈕點擊
  const handleEditClick = (logId) => {
    router.push(`/diary?log_id=${logId}&action=edit`, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  // 處理關閉編輯表單
  const handleCloseEditForm = () => {
    router.push('/diary', undefined, { shallow: true });
    setShowEditForm(false);
    setEditData(null);
  };

  //編輯草稿
  const handleDraftEdit = (draftId) => {
    // router.push(`/diary?page=edit&log_id=${draftId}&is_draft=1`);
    router.push(`/diary?log_id=${draftId}&action=edit`);
  };

  //處理刪除草稿
  const handleDraftDelete = async (draftId) => {
    toast(
      <div>
        <div style={{ margin: '20px 20px 50px 20px', fontSize: '24px' }}>
          您確定要刪除這個草稿嗎?
        </div>

        {/* 兩個按鈕 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <button
            onClick={() => {
              toast.dismiss();
              return;
            }}
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              padding: '10px 20px',
              border: '2px solid #023e8a',
              backgroundColor: '#fff',
              color: '#023e8a',
              borderRadius: '50px',
            }}
          >
            取消刪除
          </button>
          <button
            onClick={async () => {
              toast.dismiss();
              try {
                const res = await fetch(
                  `${API_SERVER}/diary/draft/${draftId}`,
                  {
                    method: 'DELETE',
                    headers: {
                      ...getAuthHeader(),
                      'Content-Type': 'application/json',
                    },
                  }
                );
                const result = await res.json();

                if (result.success) {
                  fetchDrafts();
                }
              } catch (error) {
                console.error('刪除草稿失敗:', error);
              }
            }}
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              padding: '10px 20px',
              border: '2px solid #023e8a',
              backgroundColor: '#023e8a',
              color: '#fff',
              borderRadius: '50px',
            }}
          >
            確定刪除
          </button>
        </div>

        {/* 自定義關閉按鈕 */}
        <button
          onClick={() => toast.dismiss()} // 點擊後關閉 Toast
          style={{
            position: 'absolute',
            top: '3px',
            right: '0px',
            padding: '5px 10px',
            color: '#ff277e',
            border: 'none',
            cursor: 'pointer',
            fontSize: '32px',
          }}
        >
          <IoCloseCircleOutline />
        </button>
      </div>,
      {
        duration: Infinity, // 不會消失
        style: {
          border: '2px solid #023e8a',
          backgroundColor: '#fff',
          color: '#023e8a',
          borderRadius: '6px',
          padding: '20px',
        },
      }
    );
  };

  //新增發佈草稿
  const handleDraftPublish = async (draftId) => {
    try {
      const response = await fetch(
        `${API_SERVER}/diary/draft/${draftId}/publish`,
        {
          method: 'PUT',
          headers: {
            ...getAuthHeader(),
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        handleCloseEditForm();
        // 再更新列表和顯示成功訊息
        await Promise.all([fetchLogs(currentRegion), fetchDrafts()]);
        toast.success('發佈成功');
      } else {
        toast.error('發佈失敗');
      }
    } catch (error) {
      console.error('發佈草稿失敗:', error);
      toast.error('發布時發生錯誤');
    }
  };

  // ================ useEffect ================
  // 1. 初始資料讀取
  useEffect(() => {
    if (!checkAuthState()) return;
    // 獲取初始日誌列表
    fetchLogs();
    // 獲取地圖資料
    fetchMapData();
    fetchDrafts();
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
    const handleRouteChange = async () => {
      // 重置所有狀態
      setShowEditForm(false);
      setShowDiaryForm(false);
      setDiaryData(null);
      setEditData(null);

      if (!router.isReady) return;

      if (action === 'add') {
        setShowDiaryForm(true);
      } else if (log_id && action === 'edit') {
        await getDiaryData(log_id);
        setShowEditForm(true);
      } else if (log_id) {
        await getDiaryData(log_id);
      }
    };

    handleRouteChange();
  }, [router.isReady, log_id, action]);

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
            logs={
              activeTab === 0
                ? filterState.filteredLogs?.length > 0
                  ? filterState.filteredLogs
                  : logs || []
                : drafts
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
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onDraftEdit={handleDraftEdit}
            onDraftDelete={handleDraftDelete}
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
            logs={
              activeTab === 0
                ? filterState.filteredLogs?.length > 0
                  ? filterState.filteredLogs
                  : logs || []
                : drafts
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
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onDraftEdit={handleDraftEdit}
            onDraftDelete={handleDraftDelete}
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
      {showDiaryForm && (
        <DiaryForm
          onClose={handleCloseDiaryForm}
          onSuccess={async () => {
            await fetchLogs(currentRegion);
            handleCloseDiaryForm();
          }}
        />
      )}

      {/* 讀取日誌詳細頁 */}
      {diaryData && !showEditForm && (
        <DiaryPage
          diaryData={diaryData}
          onClose={handleCloseDiaryPage}
          onEdit={handleEditClick}
        />
      )}
      {/* 編輯日誌表單 */}
      {showEditForm && editData && (
        <EditForm
          onClose={handleCloseEditForm}
          logData={editData || {}}
          onUpdateSuccess={() => {
            fetchLogs(currentRegion); // 添加這行
            handleCloseEditForm(); // 關閉編輯表單
          }}
          onPublish={handleDraftPublish}
        />
      )}
    </div>
  );
}
