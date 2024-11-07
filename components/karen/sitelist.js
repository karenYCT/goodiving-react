import React, { useState, useEffect } from 'react';
import { useDragScroll } from '@/hooks/usedragscroll';
import Search1sm from '@/components/search/search-1-sm';
import IconFillPrimaryMD from '@/components/icons/icon-fill-primary-md';
import ButtonSMFL2 from '@/components/buttons/btnsm-fill-light2';
import SiteIntroCard from '@/components/karen/siteintrocard';
import styles from './sitelist.module.css';
import Navbar from '@/components/layouts/navbar-sm';
import SearchModal from './search';

export default function SiteList({
  selectedRegion = '',
  onRegionChange = () => {},
  regions = [],
  methods = [],
  levels = [],
  currentSites = [],
  allSites = [],
  isMobileMapView = false,
  onViewToggle = () => {},
  isMobile = false,
}) {
  // 狀態管理
  const [inputValue, setInputValue] = useState('');
  const [filteredSites, setFilteredSites] = useState(currentSites);
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    region: null,
    method: null,
    level: null,
  });
  const [isSearchingAll, setIsSearchingAll] = useState(false);
  const dragScroll = useDragScroll();

  // 搜尋和篩選邏輯
  const applyFiltersAndSearch = (searchText, filters) => {
    // 決定搜尋來源
    let sourceData = isSearchingAll ? allSites : currentSites;
    let results = [...sourceData];

    // 同時處理搜尋和篩選
    results = results.filter((site) => {
      // 搜尋文字匹配
      const searchMatch = !searchText.trim() || 
        site.site_name.toLowerCase().includes(searchText.toLowerCase()) ||
        site.method_name.toLowerCase().includes(searchText.toLowerCase()) ||
        site.region_name.toLowerCase().includes(searchText.toLowerCase()) ||
        site.level_name.toLowerCase().includes(searchText.toLowerCase());

      // 篩選條件匹配
      const regionMatch = !filters.region || site.region_id === Number(filters.region);
      const methodMatch = !filters.method || site.method_id === Number(filters.method);
      const levelMatch = !filters.level || site.level_id === Number(filters.level);

      return searchMatch && regionMatch && methodMatch && levelMatch;
    });

    // 更新搜尋範圍狀態
    const hasFilters = filters.region || filters.method || filters.level;
    if (searchText.trim() && !hasFilters) {
      setIsSearchingAll(true);
    } else if (!searchText.trim() && !hasFilters) {
      setIsSearchingAll(false);
    }

    setFilteredSites(results);
  };

  // 處理篩選條件變更
  const handleApplyFilters = (filters) => {
    setIsSearchingAll(false);
    setActiveFilters(filters);
    applyFiltersAndSearch(inputValue, filters);
    closeModal();
  };

  // 處理地區切換
  const handleRegionChange = (regionId) => {
    if (regionId === 'all') {
      setIsSearchingAll(true);
      onRegionChange('all');
      setActiveFilters(prev => ({ ...prev, region: null }));
      setFilteredSites(allSites);
    } else {
      setIsSearchingAll(false);
      onRegionChange(regionId);
      setActiveFilters(prev => ({ ...prev, region: regionId }));
      
      // 更新顯示為當前選中地區的潛點
      const regionSites = currentSites.filter(site => 
        site.region_id === Number(regionId)
      );

      setFilteredSites(regionSites);
    }
  };

  // Modal 控制
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // 監聽搜尋輸入
  useEffect(() => {
    applyFiltersAndSearch(inputValue, activeFilters);
  }, [inputValue]);

  // 監聽 currentSites 變化
  useEffect(() => {
    if (!isSearchingAll) {
      setFilteredSites(currentSites);
      applyFiltersAndSearch(inputValue, activeFilters);
    }
  }, [currentSites]);

  return (
    <>
      <div>
        <div className={styles.container}>
          <div>
            <Navbar />
          </div>
          
          {/* 搜尋區塊 */}
          <div className={styles.searchContainer}>
            <Search1sm
              className={styles['custom-search']}
              inputValue={inputValue}
              setInputValue={setInputValue}
              onClick={() => applyFiltersAndSearch(inputValue, activeFilters)}
              placeholder="搜尋潛點名稱、潛水方式..."
            />

            {/* 篩選按鈕 */}
            <div 
              className={styles.iconCircle}
              role="presentation"
              onClick={openModal}
            >
              <IconFillPrimaryMD type="slider" />
              {(activeFilters.method || activeFilters.level) && (
                <div className={styles.filterIndicator} />
              )}
            </div>

            {/* 手機版視圖切換 */}
            {isMobile && (
              <div
                className={`${styles.iconCircle} ${isMobileMapView ? styles.active : ''}`}
                onClick={onViewToggle}
                role="presentation"
              >
                <IconFillPrimaryMD type={isMobileMapView ? 'list' : 'map'} />
              </div>
            )}
          </div>

          {/* 地區標籤列表 */}
          {Array.isArray(regions) && regions.length > 0 && (
            <div
              className={`${styles.tagContainer} ${styles.dragScroll}`}
              {...dragScroll}
            >
              <ButtonSMFL2
                className={isSearchingAll ? styles.active : ''}
                onClick={() => handleRegionChange('all')}
              >
                全部
              </ButtonSMFL2>
              {regions.map((region) => (
                <ButtonSMFL2
                  key={region.region_id}
                  className={
                    !isSearchingAll && selectedRegion === region.region_id 
                      ? styles.active 
                      : ''
                  }
                  onClick={() => onRegionChange(region.region_id)}
                >
                  {region.region_name}
                </ButtonSMFL2>
              ))}
            </div>
          )}

          {/* 景點卡片列表 */}
          {(!isMobile || !isMobileMapView) && (
            <div className={styles.cardContainer}>
              {filteredSites.length > 0 ? (
                filteredSites.map((siteData) => (
                  <SiteIntroCard
                    key={siteData.site_id}
                    data={siteData}
                    currentSites={isSearchingAll ? allSites : currentSites}
                  />
                ))
              ) : (
                <div className={styles.noResults}>
                  沒有符合搜尋條件的潛點
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 篩選 Modal */}
      <SearchModal 
        isOpen={isOpen}
        closeModal={closeModal}
        regions={regions}
        methods={methods}
        levels={levels}
        onApplyFilters={handleApplyFilters}
        selectedRegion={selectedRegion}
        initialFilters={activeFilters}
      />
    </>
  );
}