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

    // 如果選擇了特定地區且不是在搜尋全部
    // if (!isSearchingAll && selectedRegion && selectedRegion !== 'all') {
    //   sourceData = currentSites.filter(
    //     (site) => site.region_id === Number(selectedRegion)
    //   );
    // }

    let results = [...sourceData];

    // 同時處理搜尋和篩選
    results = results.filter((site) => {
      // 搜尋文字匹配
      const searchMatch =
        !searchText.trim() ||
        site.site_name.toLowerCase().includes(searchText.toLowerCase()) ||
        site.method_name.toLowerCase().includes(searchText.toLowerCase()) ||
        site.region_name.toLowerCase().includes(searchText.toLowerCase()) ||
        site.level_name.toLowerCase().includes(searchText.toLowerCase());

      // 篩選條件匹配
      const methodMatch =
        !filters.method || site.method_id === Number(filters.method);
      const levelMatch =
        !filters.level || site.level_id === Number(filters.level);
      return searchMatch && methodMatch && levelMatch;
    });

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
    console.group('地區切換除錯'); // 開始一個除錯群組
    console.log('切換到地區ID:', regionId, typeof regionId);
    console.log('allSites 資料:', {
      總數量: allSites.length,
      資料內容: allSites,
    });

    if (regionId === 'all') {
      setIsSearchingAll(true);
      onRegionChange('all');
      setActiveFilters((prev) => ({ ...prev, region: null }));
      setFilteredSites(allSites);
    } else {
      setIsSearchingAll(false);
      onRegionChange(regionId);
      setActiveFilters((prev) => ({ ...prev, region: regionId }));

      // 從 allSites 中過濾出該地區的潛點
      const regionSites = currentSites.filter(
        (site) => site.region_id === Number(regionId)
      );
      setFilteredSites(regionSites);
    }
    console.groupEnd();
  };

  // 添加監控 props 的 useEffect
  useEffect(() => {
    console.log('Props 更新:', {
      selectedRegion,
      currentSites: currentSites.length,
      allSites: allSites.length,
    });
  }, [selectedRegion, currentSites, allSites]);

  useEffect(() => {
    console.log('filteredSites 更新:', {
      數量: filteredSites.length,
      isSearchingAll,
      selectedRegion,
    });
  }, [filteredSites]);

  // Modal控制
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // 監聽搜尋輸入
  useEffect(() => {
    applyFiltersAndSearch(inputValue, activeFilters);
  }, [inputValue]);

  // 監聽 currentSites 變化的 useEffect 也需要修改
  useEffect(() => {
    console.log('currentSites 變化:', {
      currentSites: currentSites.length,
      isSearchingAll,
      selectedRegion,
    });

    // 只有在不是搜索全部的情況下更新 filteredSites
    if (!isSearchingAll) {
      setFilteredSites(currentSites);
    }
  }, [currentSites, isSearchingAll]);

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
          {Array.isArray(regions) && regions.length > 0 && (
            <div
              className={`${styles.tagContainer} ${styles.dragScroll}`}
              {...dragScroll}
            >
              <ButtonSMFL2
                // className={!selectedRegion ? styles.active : ''}
                className={isSearchingAll ? styles.active : ''}
                onClick={() => handleRegionChange('all')}
              >
                全部
              </ButtonSMFL2>
              {regions.map((region) => (
                <ButtonSMFL2
                  key={region.region_id}
                  // className={
                  //   selectedRegion === region.region_id ? styles.active : ''
                  // }
                  className={
                    !isSearchingAll && selectedRegion === region.region_id
                      ? styles.active
                      : ''
                  }
                  onClick={() => handleRegionChange(region.region_id)}
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
                <div className={styles.noResults}>沒有符合搜尋條件的潛點</div>
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
