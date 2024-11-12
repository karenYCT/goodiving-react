import React, { useState } from 'react';
import { useDragScroll } from '@/hooks/usedragscroll';
import { IoCloseCircleOutline } from 'react-icons/io5';
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
import SearchModal from '../../components/karen/search';

export default function LogList({
  currentRegionId,
  onRegionChange,
  logs = [],
  diaryData = [], //接收完整的日誌數據
  regions = [],
  methods = [],
  levels = [],
  isMobile = false,
  isMobileMapView = false,
  onViewToggle = () => {},
  onOpenDiaryForm = () => {},
  onDiaryClick = () => {},
}) {
  //檢查
  console.log('LogList 接收到的數據:', {
    logsLength: logs.length,
    firstLog: logs[0],
    diaryData,
    currentRegionId,
  });

  //dragscroll
  const dragScroll = useDragScroll();

  //功能選擇模式
  const [isFunctionMode, setFunctionMode] = useState(false);

  // 搜尋與篩選：統一管理過濾和顯示相關的狀態
  const [displayState, setDisplayState] = useState({
    searchText: '',
    filters: {
      method: null,
      level: null,
    },
    isModalOpen: false,
  });

  //搜尋與篩選：獲取篩選條件名稱的輔助函數
  const getFilterName = (type, id) => {
    if (!id) return null;
    const items = {
      method: methods,
      level: levels,
    };
    const item = items[type]?.find((i) => i[`${type}_id`] === Number(id));
    return item ? item[`${type}_name`] : null;
  };

  //搜尋與篩選：移除特定篩選條件的函數
  const removeFilter = (filterType) => {
    setDisplayState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: null,
      },
    }));
  };

  //搜尋與篩選：清除搜尋文字的函數
  const clearSearchText = () => {
    setDisplayState((prev) => ({
      ...prev,
      searchText: '',
    }));
  };

  //v搜尋與篩選：過濾邏輯
  const getFilteredLogs = () => {
    return logs.filter((log) => {
      // 地區過濾
      const regionMatch =
        !currentRegionId ||
        log.region_id ===
          (typeof currentRegionId === 'string'
            ? parseInt(currentRegionId)
            : currentRegionId);

      // 搜尋文字匹配
      const searchMatch =
        !displayState.searchText.trim() ||
        [log.site_name, log.method_name, log.region_name].some((text) =>
          text?.toLowerCase().includes(displayState.searchText.toLowerCase())
        );

      // 其他過濾條件匹配
      const methodMatch =
        !displayState.filters.method ||
        log.method_id === Number(displayState.filters.method);
      const levelMatch =
        !displayState.filters.level ||
        log.level_id === Number(displayState.filters.level);

      return regionMatch && searchMatch && methodMatch && levelMatch;
    });
  };

  //搜尋與篩選：處理搜尋輸入
  const handleSearchInput = (value) => {
    setDisplayState((prev) => ({
      ...prev,
      searchText: value,
    }));
  };

  //搜尋與篩選：處理篩選條件
  const handleFilters = (newFilters) => {
    setDisplayState((prev) => ({
      ...prev,
      filters: newFilters,
      isModalOpen: false,
    }));
  };

  //搜尋與篩選：處理清除篩選
  const handleClearFilters = () => {
    setDisplayState((prev) => ({
      ...prev,
      searchText: '',
      filters: {
        method: null,
        level: null,
      },
    }));
  };

  // v獲取過濾後的潛點
  const filteredLogs = getFilteredLogs();
  // 檢查
  console.log('過濾後的日誌:', {
    filteredLogsLength: filteredLogs.length,
    firstFilteredLog: filteredLogs[0],
  });

  //功能選擇模式
  const FunctionModeToggle = () => {
    setFunctionMode(!isFunctionMode);
  };

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <div>
        <Navbar />
      </div>
      {/* 搜尋區塊 */}
      <div className={styles.searchContainer}>
        {/* 搜尋框 */}
        <Search1sm
          className={styles['custom-search']}
          inputValue={displayState.searchText}
          setInputValue={handleSearchInput}
          onClick={() => getFilteredLogs()}
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
          {/* {(displayState.filters.method || displayState.filters.level) && (
            <div className={styles.filterIndicator} />
          )} */}
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
        <Tab tabItems={['日誌列表', '草稿列表']} activeTab={0} />
      </div>

      {/* 地區標籤列表 */}
      <div
        className={`${styles.tagContainer} ${styles.dragScroll}`}
        {...dragScroll}
      >
        <ButtonSMFL2
          className={!currentRegionId ? styles.active : ''}
          onClick={() => onRegionChange('all')}
        >
          全部
        </ButtonSMFL2>
        {regions.map((region) => (
          <ButtonSMFL2
            key={region.region_id}
            className={
              currentRegionId === region.region_id ? styles.active : ''
            }
            onClick={() => onRegionChange(region.region_id)}
          >
            {region.region_name}
          </ButtonSMFL2>
        ))}
      </div>

      {/* 新增的篩選條件顯示區域 */}
      {(displayState.searchText ||
        displayState.filters.method ||
        displayState.filters.level) && (
        <div className={styles.activeFilters}>
          {displayState.searchText && (
            <div className={styles.filterTag}>
              <span>搜尋：{displayState.searchText}</span>
              <button onClick={clearSearchText} className={styles.removeFilter}>
                <IoCloseCircleOutline />
              </button>
            </div>
          )}
          {displayState.filters.method && (
            <div className={styles.filterTag}>
              <span>
                潛水方式：{getFilterName('method', displayState.filters.method)}
              </span>
              <button
                onClick={() => removeFilter('method')}
                className={styles.removeFilter}
              >
                <IoCloseCircleOutline />
              </button>
            </div>
          )}
          {displayState.filters.level && (
            <div className={styles.filterTag}>
              <span>
                難易度：{getFilterName('level', displayState.filters.level)}
              </span>
              <button
                onClick={() => removeFilter('level')}
                className={styles.removeFilter}
              >
                <IoCloseCircleOutline />
              </button>
            </div>
          )}
        </div>
      )}
      {/* 日誌列表 */}
      {(!isMobile || !isMobileMapView) && (
        <div className={styles.cardContainer}>
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
  <LogCard
    key={log.log_id}
    diaryData={log}
    onClick={() => onDiaryClick(log.log_id)}
  />
))
          ) : (
            <div className={styles.noResults}>沒有符合搜尋條件的日誌</div>
          )}
        </div>
      )}
      {!isFunctionMode ? (
        <div className={styles.functionContainer}>
          <ButtonOP className={styles.customBtn} onClick={FunctionModeToggle}>
            選取日誌
          </ButtonOP>
          <ButtonFP
            className={styles.customBtn}
            onClick={() => {
              console.log('新增日誌按鈕被點擊');
              onOpenDiaryForm();
            }}
          >
            新增日誌
          </ButtonFP>
        </div>
      ) : (
        <div className={styles.functionContainer}>
          <ButtonOP className={styles.customBtn2}>刪除日誌</ButtonOP>
          <ButtonFG className={styles.customBtn2}>全部選取</ButtonFG>
          <ButtonFP2 className={styles.customBtn2} onClick={FunctionModeToggle}>
            取消選取
          </ButtonFP2>
        </div>
      )}

      {/* 搜尋 Modal */}
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

      {/* 添加 DiaryForm Modal
      {showDiaryForm && <DiaryForm onClose={handleCloseDiaryForm} />} */}
    </div>
  );
}
