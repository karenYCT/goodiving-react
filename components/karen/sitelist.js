import React, { useState, useEffect } from 'react';
import { useDragScroll } from '@/hooks/usedragscroll';
import Search1sm from '@/components/search/search-1-sm';
import IconFillPrimaryMD from '@/components/icons/icon-fill-primary-md';
import ButtonSMFL2 from '@/components/buttons/btnsm-fill-light2';
import SiteIntroCard from '@/components/karen/siteintrocard';
import styles from './sitelist.module.css';
import Navbar from '@/components/layouts/navbar-sm';

export default function SiteList({
  selectedRegion = 1,
  onRegionChange = () => {},
  regions = [],
  currentSites = [],
  isMobileMapView = false,
  onViewToggle = () => {},
  isMobile = false,
}) {
  const [inputValue, setInputValue] = useState('');
  const [filteredSites, setFilteredSites] = useState(currentSites);
  const dragScroll = useDragScroll();

  // 當 currentSites 改變時更新 filteredSites
  useEffect(() => {
    setFilteredSites(currentSites);
  }, [currentSites]);

  const handleSearch = () => {
    if (!inputValue.trim()) {
      setFilteredSites(currentSites);
      return;
    }

    const filtered = currentSites.filter((Site) =>
      Site.site_name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSites(filtered);
    console.log('送出搜尋', inputValue);
  };

  // 添加 console.log 來檢查 regions 資料
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

            {isMobile && (
              <>
                <div
                  className={`${styles['iconCircle']} ${
                    !isMobileMapView ? styles.active : ''
                  }`}
                  onClick={onViewToggle}
                  role="presentation"
                >
                  <IconFillPrimaryMD type="slider" />
                </div>
                <div
                  className={`${styles['iconCircle']}  ${
                    isMobileMapView ? styles.active : ''
                  }`}
                  onClick={onViewToggle}
                  role="presentation"
                >
                  <IconFillPrimaryMD type="map" />
                </div>
              </>
            )}
          </div>

          {/* 確保 regions 有資料時才渲染 tagContainer */}
          {Array.isArray(regions) && regions.length > 0 && (
            <div
              className={`${styles['tagContainer']} ${styles.dragScroll}`}
              {...dragScroll}
            >
              {regions.map((region) => (
                <ButtonSMFL2
                  key={region.region_id}
                  onClick={() => onRegionChange(region.region_id)}
                >
                  {region.region_name}
                </ButtonSMFL2>
              ))}
            </div>
          )}

          {/* 根據選擇的地區動態渲染對應的景點卡片 */}
          {(!isMobile || !isMobileMapView) && (
            <div className={`${styles['cardContainer']}`}>
              {filteredSites.map(
                (
                  Site // 使用 filteredSites 而不是直接使用 REGION_DATA
                ) => (
                  <SiteIntroCard
                    key={Site.site_id}
                    data={Site}
                    onClick={() => console.log('點擊進入介紹', Site.site_name)}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
