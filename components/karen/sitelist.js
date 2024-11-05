import React, { useState, useEffect } from 'react';
import { useDragScroll } from '@/hooks/usedragscroll';
import Search1sm from '@/components/search/search-1-sm';
import IconFillPrimaryMD from '@/components/icons/icon-fill-primary-md';
import ButtonSMFL2 from '@/components/buttons/btnsm-fill-light2';
import SiteIntroCard from '@/components/karen/siteintrocard';
import styles from './sitelist.module.css';
import Navbar from '@/components/layouts/navbar-sm';

//siteList 組件
export default function SiteList({
  selectedRegion = 1, //當前選擇的地區,tag的css會不一樣
  onRegionChange = () => {}, //地區變更事前處理函數
  regions = [], //地區列表
  currentSites = [], //當前選擇的地區景點
  isMobileMapView = false, //是否為手機地圖的模式
  onViewToggle = () => {}, //切換查看模式
  isMobile = false, //是否為手機裝置
}) {
  //狀態管理
  const [inputValue, setInputValue] = useState(''); //搜尋輸入框的值
  const [filteredSites, setFilteredSites] = useState(currentSites); //過濾後的景點列表
  const dragScroll = useDragScroll(); //滑鼠拖曳功能的hook

  // 當 currentSites 改變時更新 filteredSites,確保過濾後的列表與當前景點列表保持一致
  useEffect(() => {
    setFilteredSites(currentSites);
  }, [currentSites]);

  // 搜尋功能實作
  const handleSearch = () => {
    if (!inputValue.trim()) {
      setFilteredSites(currentSites);
      return;
    }
    //根據景點名稱進行過濾（不區分大小寫）
    const filtered = currentSites.filter((site) =>
      site.site_name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSites(filtered);
    console.log('送出搜尋', inputValue);
  };

  // 開發除錯工具檢查: regions 資料
  useEffect(() => {
    console.log('SiteList received regions:', regions);
  }, [regions]);

  return (
    <>
      <div>
        <div className={`${styles['container']}`}>
          <div>
            <Navbar />
          </div>
          <div className={`${styles['searchContainer']}`}>
            <Search1sm
              className={styles['custom-search']}
              inputValue={inputValue}
              setInputValue={setInputValue}
              onClick={handleSearch}
            />
            <div className={`${styles['iconCircle']} `} role="presentation">
              <IconFillPrimaryMD type="slider" />
            </div>

            {/* 手機版視圖切換 */}

            {isMobile && (
              <>
                <div
                  className={`${styles['iconCircle']}  ${
                    isMobileMapView ? styles.active : ''
                  }`}
                  onClick={onViewToggle}
                  role="presentation"
                >
                  <IconFillPrimaryMD type={isMobileMapView ? 'list' : 'map'} />
                </div>
              </>
            )}
          </div>

          {/* 地區標籤列表：有地區資料時才顯示 */}
          {Array.isArray(regions) && regions.length > 0 && (
            <div
              className={`${styles['tagContainer']} ${styles.dragScroll}`}
              {...dragScroll}
            >
              {regions.map((region) => (
                <ButtonSMFL2
                  className={`${
                    selectedRegion === region.region_id ? styles.active : ''
                  }`}
                  key={region.region_id}
                  onClick={() => onRegionChange(region.region_id)}
                >
                  {region.region_name}
                </ButtonSMFL2>
              ))}
            </div>
          )}

          {/* 景點卡片列表：在不是手機地圖模式下顯示 */}
          {(!isMobile || !isMobileMapView) && (
            <div className={`${styles['cardContainer']}`}>
              {filteredSites.map((siteData) => (
                <SiteIntroCard
                  key={siteData.site_id}
                  data={siteData} // 這裡傳入單個景點的資料
                  currentSites={currentSites}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
