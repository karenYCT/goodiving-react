import React, { useState, useEffect } from 'react';
import { useDragScroll } from '@/hooks/usedragscroll';
import Search1sm from '@/components/search/search-1-sm';
import IconFillPrimaryMD from '@/components/icons/icon-fill-primary-md';
import ButtonSMFL2 from '@/components/buttons/btnsm-fill-light2';
import SiteIntroCard from '@/components/karen/siteintrocard';
import styles from './main.module.css';
import Navbar from '@/components/layouts/navbar-sm';


export default function Main({
  selectedRegion = '',
  onRegionChange = '',
  regions = [],
  currentSpots = [],
}) {
  const [inputValue, setInputValue] = useState('');
  const [filteredSpots, setFilteredSpots] = useState(currentSpots);
  const dragScroll = useDragScroll();
  // 當 currentSpots 改變時更新 filteredSpots
  useEffect(() => {
    setFilteredSpots(currentSpots);
  }, [currentSpots]);

  const handleSearch = () => {
    if (!inputValue.trim()) {
      setFilteredSpots(currentSpots);
      return;
    }

    const filtered = currentSpots.filter((spot) =>
      spot.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSpots(filtered);
    console.log('送出搜尋', inputValue);
  };

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
            <IconFillPrimaryMD type="slider" />
            <IconFillPrimaryMD type="map" className="block md:hidden"/>
          </div>

          <div className={`${styles['tagContainer']} ${styles.dragScroll}`} {...dragScroll}>
            {regions.map((region) => (
              <ButtonSMFL2
                key={region.id}
                onClick={() => onRegionChange(region.id)}
              >
                {region.name}
              </ButtonSMFL2>
            ))}
          </div>

          {/* 根據選擇的地區動態渲染對應的景點卡片 */}
          <div className={`${styles['cardContainer']}`}>
            {filteredSpots.map(
              (
                spot // 使用 filteredSpots 而不是直接使用 REGION_DATA
              ) => (
                <SiteIntroCard
                  key={spot.id}
                  data={spot}
                  onClick={() => console.log('點擊進入介紹', spot.name)}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
