import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useDragScroll } from '@/hooks/usedragscroll';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useAuth } from '@/context/auth-context';
import Search1sm from '@/components/search/search-1-sm';
import IconFillPrimaryMD from '@/components/icons/icon-fill-primary-md';
import ButtonSMFL2 from '@/components/buttons/btnsm-fill-light2';
import ButtonFP from '@/components/buttons/btn-fill-primary';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import ButtonOP from '@/components/buttons/btn-outline-primary3';
import ButtonFG from '@/components/buttons/btn-fill-gray2';
import LogCard from '@/components/karen/logcard';
import styles from './loglist.module.css';
import Navbar from '@/components/layouts/navbar-sm';
import Tab from '@/components/karen/tab';
import SearchModal from './diarysearch';
import { API_SERVER } from '@/configs/api-path.js';
import DraftCard from '@/components/karen/logdraftcard';
import toast from 'react-hot-toast';

export default function LogList({
  currentRegionId,
  onRegionChange,
  logs = [],
  // diaryData = [],
  regions = [],
  methods = [],
  levels = [],
  isMobile = false,
  isMobileMapView = false,
  filteredSiteName = '',
  onClearFilter = () => {},
  onViewToggle = () => {},
  onOpenDiaryForm = () => {},
  onDiaryClick = () => {},
  fetchLogs = () => {},
  activeTab = 0,
  onTabChange = () => {},
  onDraftEdit = () => {},
  onDraftDelete = () => {},
}) {
  // ================ 狀態定義區 ================
  const { auth, getAuthHeader } = useAuth();
  // 1. 拖曳滾動
  const dragScroll = useDragScroll();

  // 2. 選擇功能相關狀態
  const [selectedLogs, setSelectedLogs] = useState(new Set());
  const [isFunctionMode, setFunctionMode] = useState(false);

  // 3. 搜尋和篩選狀態
  const [displayState, setDisplayState] = useState({
    searchText: '',
    filters: {
      is_privacy: null,
      sortBy: null,
    },
    isModalOpen: false,
  });

  // ================ 資料處理函數區 ================
  // 1. 篩選條件名稱處理
  const getFilterName = (filterType, value) => {
    const filterNames = {
      is_privacy: (val) => (val === 0 ? '私人' : '公開'),
    };
    return filterNames[filterType]?.(value) || '';
  };

  // 2. 日誌過濾邏輯
  const filteredLogs = useMemo(() => {
    // 先處理搜尋文字，避免在循環中重複處理
    const searchText = displayState.searchText.trim().toLowerCase();

    let filtered = logs.filter((log) => {
      // 搜尋文字匹配
      const searchMatch =
        !searchText ||
        [log.site_name, log.region_name, log.method_name].some((text) =>
          text?.toLowerCase().includes(searchText)
        );

      // 隱私設定匹配
      const privacyMatch =
        displayState.filters.is_privacy === null ||
        log.is_privacy === displayState.filters.is_privacy;

      return searchMatch && privacyMatch;
    });

    // 處理排序
    if (displayState.filters.sortBy) {
      filtered.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return displayState.filters.sortBy === 'date_desc'
          ? dateB - dateA
          : dateA - dateB;
      });
    }

    return filtered;
  }, [
    logs,
    displayState.searchText,
    displayState.filters.is_privacy,
    displayState.filters.sortBy,
  ]);

  // ================ 事件處理函數區 ================
  // 1. 搜尋相關
  const handleSearchInput = (value) => {
    setDisplayState((prev) => ({
      ...prev,
      searchText: value,
    }));
  };

  const clearSearchText = () => {
    setDisplayState((prev) => ({
      ...prev,
      searchText: '',
    }));
  };

  // 2. 篩選相關
  const handleFilters = (newFilters) => {
    setDisplayState((prev) => ({
      ...prev,
      filters: newFilters,
      isModalOpen: false,
    }));
  };

  const removeFilter = (filterType) => {
    setDisplayState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: null,
      },
    }));
  };

  const handleClearFilters = () => {
    setDisplayState((prev) => ({
      ...prev,
      searchText: '',
      filters: {
        is_privacy: null,
        sortBy: null,
      },
    }));
  };

  // 3. 選擇模式
  const handleFunctionModeToggle = () => {
    setFunctionMode(!isFunctionMode);
  };

  //單個
  const handleLogSelection = (logId) => {
    setSelectedLogs((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(logId)) {
        newSelected.delete(logId);
      } else {
        newSelected.add(logId);
      }
      return newSelected;
    });
  };
  //全選
  const handleSelectAll = () => {
    const logsToSelect = filteredLogs.map((log) => log.log_id);
    setSelectedLogs(new Set(logsToSelect));
  };

  //取消全選
  const handleDeselectAll = () => {
    setSelectedLogs(new Set());
  };

  //處理刪除選取的日誌
  const handleDeleteSelected = async () => {
    if (selectedLogs.size === 0) {
      toast.error('請至少選擇一筆日誌');
      return;
    }
    toast(
      <div>
        <div style={{ margin: '20px 20px 50px 20px', fontSize: '24px' }}>
          您確定要刪除這篇日誌嗎?
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
                const res = await fetch(`${API_SERVER}/diary/batch-delete`, {
                  method: 'POST',
                  headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    logIds: Array.from(selectedLogs),
                  }),
                });

                const result = await res.json();

                if (result.success) {
                  // 重新獲取日誌
                  fetchLogs(currentRegionId);
                  // 清空選取狀態
                  setSelectedLogs(new Set());
                  setFunctionMode(false);
                  toast.success('刪除成功');
                } else {
                  alert(result.info || '批量刪除失敗');
                }
              } catch (error) {
                console.error('刪除日誌時發生錯誤:', error);
                toast.error('刪除失敗');
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
            確認刪除
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

  const scrollPositionRef = useRef(0);
  const containerRef = useRef(null);

  const handleDiaryClick = (logId) => {
    if (!isFunctionMode) {
      scrollPositionRef.current = containerRef.current?.scrollTop || 0;
      onDiaryClick(logId);
    } else {
      handleLogSelection(logId);
    }
  };

  useEffect(() => {
    if (containerRef.current && scrollPositionRef.current > 0) {
      containerRef.current.scrollTop = scrollPositionRef.current;
    }
  }, [logs, filteredLogs]);

  // ================ 渲染前的資料處理 ================
  // const filteredLogs = getFilteredLogs();

  const functionButtons = useMemo(() => {
    if (!isFunctionMode) {
      return (
        <div className={styles.functionContainer}>
          <ButtonOP
            className={styles.customBtn}
            onClick={() => setFunctionMode(true)}
          >
            選取日誌
          </ButtonOP>
          <ButtonFP className={styles.customBtn} onClick={onOpenDiaryForm}>
            新增日誌
          </ButtonFP>
        </div>
      );
    }

    return (
      <div className={styles.functionContainer}>
        <ButtonOP
          className={styles.customBtn2}
          onClick={handleDeleteSelected}
          disabled={selectedLogs.size === 0}
        >
          刪除日誌
        </ButtonOP>
        <ButtonFG
          className={styles.customBtn2}
          onClick={
            selectedLogs.size === filteredLogs.length
              ? handleDeselectAll
              : handleSelectAll
          }
        >
          {selectedLogs.size === filteredLogs.length ? '取消全選' : '全部選取'}
        </ButtonFG>
        <ButtonFP2
          className={styles.customBtn2}
          onClick={() => {
            setFunctionMode(false);
            setSelectedLogs(new Set());
          }}
        >
          取消選取
        </ButtonFP2>
      </div>
    );
  }, [
    isFunctionMode,
    selectedLogs.size,
    filteredLogs.length,
    handleDeleteSelected,
    handleDeselectAll,
    handleSelectAll,
  ]);
  // ================ 渲染區 ================
  return (
    <div className={styles.container}>
      {/* Navbar */}
      <div>
        <Navbar />
      </div>

      {/* 搜尋區塊 */}
      <div className={styles.searchContainer}>
        <Search1sm
          className={styles['custom-search']}
          inputValue={displayState.searchText}
          setInputValue={handleSearchInput}
          onClick={() => filteredLogs()}
          placeholder="搜尋潛點名稱、潛水方式..."
        />

        {/* 篩選按鈕 */}
        <div
          className={styles.iconCircle}
          role="presentation"
          onClick={() =>
            setDisplayState((prev) => ({ ...prev, isModalOpen: true }))
          }
        >
          <IconFillPrimaryMD type="slider" />
        </div>

        {/* 手機版視圖切換 */}
        {isMobile && (
          <div
            className={`${styles.iconCircle} ${
              isMobileMapView ? styles.active : ''
            }`}
            onClick={onViewToggle}
            role="presentation"
          >
            <IconFillPrimaryMD type={isMobileMapView ? 'list' : 'map'} />
          </div>
        )}
      </div>

      {/* 頁籤區塊 */}
      <div className={styles.tabContainer}>
        <Tab
          tabItems={['日誌列表', '草稿列表']}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>

      {/* 地區標籤列表 */}
      <div
        className={`${styles.tagContainer} ${styles.dragScroll}`}
        {...dragScroll}
      >
        <ButtonSMFL2
          className={currentRegionId === 'all' ? styles.active : ''}
          onClick={() => {
            onRegionChange('all');
          }}
        >
          全部
        </ButtonSMFL2>
        {regions.map((region) => (
          <ButtonSMFL2
            key={region.region_id}
            className={
              currentRegionId === region.region_id ? styles.active : ''
            }
            onClick={() => {
              onRegionChange(region.region_id);
            }}
          >
            {region.region_name}
          </ButtonSMFL2>
        ))}
      </div>

      {/* 篩選條件顯示區域 */}
      <div className={styles.activeFilters}>
        {/* 搜尋條件 */}
        {displayState.searchText && (
          <div className={styles.filterTag}>
            <span>搜尋：{displayState.searchText}</span>
            <button onClick={clearSearchText} className={styles.removeFilter}>
              <IoCloseCircleOutline />
            </button>
          </div>
        )}

        {/* 隱私設置條件 */}
        {displayState.filters.is_privacy !== null && (
          <div className={styles.filterTag}>
            <span>
              隱私設置：
              {getFilterName('is_privacy', displayState.filters.is_privacy)}
            </span>
            <button
              onClick={() => removeFilter('is_privacy')}
              className={styles.removeFilter}
            >
              <IoCloseCircleOutline />
            </button>
          </div>
        )}

        {/* 排序條件 */}
        {displayState.filters.sortBy && (
          <div className={styles.filterTag}>
            <span>
              排序：
              {displayState.filters.sortBy === 'date_desc'
                ? '日期（新到舊）'
                : '日期（舊到新）'}
            </span>
            <button
              onClick={() => removeFilter('sortBy')}
              className={styles.removeFilter}
            >
              <IoCloseCircleOutline />
            </button>
          </div>
        )}

        {/* 潛點篩選條件 - 獨立判斷 */}
        {filteredSiteName && (
          <div className={styles.filterTag}>
            <span>潛點：{filteredSiteName}</span>
            <button onClick={onClearFilter} className={styles.removeFilter}>
              <IoCloseCircleOutline />
            </button>
          </div>
        )}
      </div>

      {/* 日誌列表 */}
      {(!isMobile || !isMobileMapView) && (
        <>
          {activeTab === 0 ? (
            <div className={styles.logCardContainer} ref={containerRef}>
              {filteredLogs.length > 0 && logs.length > 0 ? (
                filteredLogs.map((log) => (
                  <LogCard
                    key={log.log_id}
                    diaryData={log}
                    onDiaryClick={() => handleDiaryClick(log.log_id)}
                    showCheckbox={isFunctionMode}
                    isSelected={selectedLogs.has(log.log_id)}
                  />
                ))
              ) : (
                <div className={styles.noResults}>沒有符合搜尋條件的日誌</div>
              )}
            </div>
          ) : (
            <div className={styles.draftCardContainer}>
              {logs.length > 0 ? (
                logs.map((draft) => (
                  <DraftCard
                    key={draft.log_id}
                    draftData={draft}
                    onDraftEdit={() => onDraftEdit(draft.log_id)}
                    onDraftDelete={() => onDraftDelete(draft.log_id)}
                  />
                ))
              ) : (
                <div className={styles.noResults}>目前沒有草稿</div>
              )}
            </div>
          )}
        </>
      )}

      {/* 功能按鈕只在日誌列表時顯示 */}
      {activeTab === 0 && functionButtons}

      {/* Modal */}
      <SearchModal
        isOpen={displayState.isModalOpen}
        closeModal={() =>
          setDisplayState((prev) => ({ ...prev, isModalOpen: false }))
        }
        regions={regions}
        methods={methods}
        levels={levels}
        onApplyFilters={handleFilters}
        onClearFilters={handleClearFilters}
        initialFilters={displayState.filters}
      />
    </div>
  );
}
