import React, { useState } from 'react';
import { useDragScroll } from '@/hooks/usedragscroll';
import Search1sm from '@/components/search/search-1-sm';
import IconFillPrimaryMD from '@/components/icons/icon-fill-primary-md';
import ButtonSMFL2 from '@/components/buttons/btnsm-fill-light2';
import SiteIntroCard from '@/components/karen/siteintrocard';
import { IoCloseCircleOutline } from 'react-icons/io5';
import styles from './sitelist.module.css';
import Navbar from '@/components/layouts/navbar-sm';
import SearchModal from './search';

export default function SiteList({
  currentRegionId,
  onRegionChange,
  allSites = [],
  regions = [],
  methods = [],
  levels = [],
  isMobile = false,
  isMobileMapView = false,
  onViewToggle = () => {},
  onCardClick = () => {},
}) {
  // 統一管理過濾和顯示相關的狀態
  const [displayState, setDisplayState] = useState({
    searchText: '',
    filters: {
      method: null,
      level: null,
    },
    isModalOpen: false,
  });

  const dragScroll = useDragScroll();

  // [新增] 獲取篩選條件名稱的輔助函數
  const getFilterName = (type, id) => {
    if (!id) return null;
    const items = {
      method: methods,
      level: levels,
    };
    const item = items[type]?.find((i) => i[`${type}_id`] === Number(id));
    return item ? item[`${type}_name`] : null;
  };

  // [新增] 移除特定篩選條件的函數
  const removeFilter = (filterType) => {
    setDisplayState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: null,
      },
    }));
  };

  // [新增] 清除搜尋文字的函數
  const clearSearchText = () => {
    setDisplayState((prev) => ({
      ...prev,
      searchText: '',
    }));
  };

  // 過濾邏輯
  const getFilteredSites = () => {
    return allSites.filter((site) => {
      // 地區過濾
      const regionMatch =
        !currentRegionId ||
        site.region_id ===
          (typeof currentRegionId === 'string'
            ? parseInt(currentRegionId)
            : currentRegionId);

      // 搜尋文字匹配
      const searchMatch =
        !displayState.searchText.trim() ||
        [
          site.site_name,
          site.method_name,
          site.region_name,
          site.level_name,
        ].some((text) =>
          text?.toLowerCase().includes(displayState.searchText.toLowerCase())
        );

      // 其他過濾條件匹配
      const methodMatch =
        !displayState.filters.method ||
        site.method_id === Number(displayState.filters.method);
      const levelMatch =
        !displayState.filters.level ||
        site.level_id === Number(displayState.filters.level);

      return regionMatch && searchMatch && methodMatch && levelMatch;
    });
  };

  // 處理搜尋輸入
  const handleSearchInput = (value) => {
    setDisplayState((prev) => ({
      ...prev,
      searchText: value,
    }));
  };

  // 處理篩選條件
  const handleFilters = (newFilters) => {
    setDisplayState((prev) => ({
      ...prev,
      filters: newFilters,
      isModalOpen: false,
    }));
  };

  // 處理清除篩選
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

  // 獲取過濾後的潛點
  const filteredSites = getFilteredSites();

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
          onClick={() => getFilteredSites()}
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
          {(displayState.filters.method || displayState.filters.level) && (
            <div className={styles.filterIndicator} />
          )}
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

      {/* 潛點列表 */}
      {(!isMobile || !isMobileMapView) && (
        <div className={styles.cardContainer}>
          {filteredSites.length > 0 ? (
            filteredSites.map((siteData) => (
              <SiteIntroCard
                key={siteData.site_id}
                data={siteData}
                currentSites={allSites}
                onCardClick={onCardClick}
              />
            ))
          ) : (
            <div className={styles.noResults}>沒有符合搜尋條件的潛點</div>
          )}
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
    </div>
  );
}
