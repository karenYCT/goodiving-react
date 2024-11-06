import React, { useState, useEffect } from 'react';
import { useDragScroll } from '@/hooks/usedragscroll';
import Search1sm from '@/components/search/search-1-sm';
import IconFillPrimaryMD from '@/components/icons/icon-fill-primary-md';
import ButtonSMFL2 from '@/components/buttons/btnsm-fill-light2';
import SiteIntroCard from '@/components/karen/siteintrocard';
import styles from './sitelist.module.css';
import Navbar from '@/components/layouts/navbar-sm';
import SearchModal from './search';
import { sortBy } from 'lodash';

//siteList 組件
export default function SiteList({
  selectedRegion = '', //當前選擇的地區,tag的css會不一樣
  onRegionChange = () => {}, //地區變更事前處理函數
  regions = [], 
  methods = [],
  levels = [],
  currentSites = [], //當前選擇的地區景點
  allSites = [], // 新增: 所有潛點的資料
  isMobileMapView = false, //是否為手機地圖的模式
  onViewToggle = () => {}, //切換查看模式
  isMobile = false, //是否為手機裝置
}) {

  //狀態管理
  const [inputValue, setInputValue] = useState(''); //搜尋輸入框的值
  const [filteredSites, setFilteredSites] = useState(currentSites); //過濾後的景點列表
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({  //搜尋
    region: null,
    method: null,
    level: null,
  });
  const [isSearchingAll, setIsSearchingAll] = useState(false); // 新增: 追蹤是否在全部潛點中搜尋
  const dragScroll = useDragScroll(); //滑鼠拖曳功能的hook

  // 搜尋和篩選邏輯
  const applyFiltersAndSearch = (searchText, filters) => {
    console.log('Applying filters and search:', { searchText, filters });
    // 決定要搜尋的資料來源
    let sourceData = isSearchingAll ? allSites : currentSites;
    let results = [...sourceData];

    // 同時處理搜尋和篩選
      results = results.filter((site)=>{
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

      const finalMatch = searchMatch && methodMatch && levelMatch;
      
      console.log('Site matching:', {
        siteName: site.site_name,
        searchMatch,
        regionMatch,
        methodMatch,
        levelMatch,
        finalMatch
      });
  
      return finalMatch;
    });

    console.log('Filtered results:', {
    count: results.length,
    first: results[0],
    searchText,
    filters
  });

  setFilteredSites(results);
};
  
  // 設置搜尋範圍
  // 只有在有搜尋文字且沒有任何篩選條件時才切換到全域搜尋
  const hasFilters = filters.region || filters.method || filters.level;
  if (searchText.trim() && !hasFilters) {
    setIsSearchingAll(true);
  } else if (!searchText.trim() && !hasFilters) {
    setIsSearchingAll(false);
  }

  console.log('Search results:', {
    searchText,
    filters,
    resultsCount: results.length,
    isSearchingAll
  });

  setFilteredSites(results);



    // 處理篩選條件變更
    const handleApplyFilters = (filters) => {
      console.log('Applying new filters:', filters);
      // 當套用篩選時，回到當前區域搜尋
      setIsSearchingAll(false);
      setActiveFilters(filters);
      applyFiltersAndSearch(inputValue, filters);
      closeModal();
    };
    
  //監聽搜尋輸入
  useEffect(() => {
    console.log('Search input changed:', inputValue);
    // 只在有搜尋文字且沒有篩選條件時切換到全域搜尋
    const hasFilters = activeFilters.method || activeFilters.level || activeFilters.region;
    if (inputValue.trim() && !hasFilters) {
      setIsSearchingAll(true);
    }
    applyFiltersAndSearch(inputValue, activeFilters);
  }, [inputValue]);
  

  //當 currentSites 改變時更新 filteredSites
  useEffect(()=>{
    if(!isSearchingAll){
      applyFiltersAndSearch(inputValue, activeFilters);
    }
  },[currentSites]);


  // 處理地區切換
  const handleRegionChange = (regionId) => {
    console.log('Region change:', regionId);
    if (regionId === 'all') {
      setIsSearchingAll(true);
      onRegionChange('all');
      setActiveFilters(prev => ({ ...prev, region: null }));
      setFilteredSites(allSites);
    } else {
      setIsSearchingAll(false);
      onRegionChange(regionId);
      setActiveFilters(prev => ({ ...prev, region: regionId }));
    }
  };
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  

  return (
    <>
      <div>
        <div className={`${styles['container']}`}>
          <div>
            <Navbar />
          </div>
          {/* 搜尋區塊 */}
          <div className={`${styles['searchContainer']}`}>
            <Search1sm
              className={styles['custom-search']}
              inputValue={inputValue}
              setInputValue={setInputValue}
              onClick={()=> applyFiltersAndSearch(inputValue, activeFilters)}
              placeholder="搜尋潛點名稱、潛水方式..."
            />

            {/* 篩選按鈕 */}
            <div 
            className={`${styles['iconCircle']} `} 
            role="presentation"
            onClick={openModal} 
            >
              <IconFillPrimaryMD type="slider" />
              {/* 顯示篩選器作用中的提示 */}
              {(activeFilters.method || activeFilters.level) && (
                <div className={styles.filterIndicator}></div>
              )}
            </div>

            {/* 手機版視圖切換 */}
            {isMobile && (
                <div
                  className={`${styles['iconCircle']}  ${
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
              className={`${styles['tagContainer']} ${styles.dragScroll}`}
              {...dragScroll}
            >
              <ButtonSMFL2
                className={`${isSearchingAll ? styles.active : ''}`}
                onClick={() => handleRegionChange('all')}
              >
                全部
              </ButtonSMFL2>
              {regions.map((region) => (
                <ButtonSMFL2
                  className={`${
                    !isSearchingAll && selectedRegion === region.region_id ? styles.active : ''
                  }`}
                  key={region.region_id}
                  onClick={() => onRegionChange(region.region_id)}
                >
                  {region.region_name}
                </ButtonSMFL2>
              ))}
            </div>
          )}

          {/* 景點卡片列表 */}
          {(!isMobile || !isMobileMapView) && (
            <div className={`${styles['cardContainer']}`}>
              {filteredSites.map((siteData) => (
                <SiteIntroCard
                  key={siteData.site_id}
                  data={siteData} // 這裡傳入單個景點的資料
                  currentSites={isSearchingAll ? allSites : currentSites}
                />
              ))}
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
