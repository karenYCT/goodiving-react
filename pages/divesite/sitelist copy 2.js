import React, { useState } from 'react';
import { useDragScroll } from '@/hooks/usedragscroll';
import Search1sm from '@/components/search/search-1-sm';
import IconFillPrimaryMD from '@/components/icons/icon-fill-primary-md';
import ButtonSMFL2 from '@/components/buttons/btnsm-fill-light2';
import SiteIntroCard from '@/components/karen/siteintrocard';
import { IoCloseCircleOutline } from 'react-icons/io5';
import styles from './sitelist.module.css';
import Navbar from '@/components/layouts/navbar-sm';
import SearchModal from '../../components/karen/search';

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
  onModalOpen = () => {},
}) {
  const [displayState, setDisplayState] = useState({
    searchText: '',
    filters: {
      method: null,
      level: null,
    },
    isModalOpen: false,
  });

  const dragScroll = useDragScroll();

  const getFilterName = (type, id) => {
    if (!id) return null;
    const items = {
      method: methods,
      level: levels,
    };
    const item = items[type]?.find((i) => i[`${type}_id`] === Number(id));
    return item ? item[`${type}_name`] : null;
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

  const clearSearchText = () => {
    setDisplayState((prev) => ({
      ...prev,
      searchText: '',
    }));
  };

  const allRegionsWithAll = [
    {
      region_id: 'all',
      region_name: '全部',
      region_english: 'ALL',
      region_englowercase: 'all',
    },
    ...regions,
  ];

  const getFilteredSites = () => {
    if (!Array.isArray(allSites)) {
      return [];
    }

    return allSites.filter((site) => {
      const regionMatch =
        currentRegionId === 'all' ||
        site.region_id === Number(currentRegionId);

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

      const methodMatch =
        !displayState.filters.method ||
        site.method_id === Number(displayState.filters.method);
      const levelMatch =
        !displayState.filters.level ||
        site.level_id === Number(displayState.filters.level);

      return regionMatch && searchMatch && methodMatch && levelMatch;
    });
  };

  const handleSearchInput = (value) => {
    setDisplayState((prev) => ({
      ...prev,
      searchText: value,
    }));
  };

  const handleFilters = (newFilters) => {
    setDisplayState((prev) => ({
      ...prev,
      filters: newFilters,
      isModalOpen: false,
    }));
  };

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

  const filteredSites = getFilteredSites();

  return (
    <div className={styles.container}>
      <div>
        <Navbar />
      </div>

      <div className={styles.searchContainer}>
        <Search1sm
          className={styles['custom-search']}
          inputValue={displayState.searchText}
          setInputValue={handleSearchInput}
          onClick={() => getFilteredSites()}
          placeholder="搜尋潛點名稱、潛水方式..."
        />

        <div
          className={styles.iconCircle}
          role="presentation"
          onClick={() =>
            setDisplayState((prev) => ({ ...prev, isModalOpen: true }))
          }
        >
          <IconFillPrimaryMD type="slider" />
        </div>

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

      <div
        className={`${styles.tagContainer} ${styles.dragScroll}`}
        {...dragScroll}
      >
        {allRegionsWithAll.map((region) => (
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

      {(!isMobile || !isMobileMapView) && (
        <div className={styles.cardContainer}>
          {filteredSites.length > 0 ? (
            filteredSites.map((siteData) => (
              <SiteIntroCard
                key={siteData.site_id}
                data={siteData}
                currentSites={allSites}
                onModalOpen={onModalOpen}
              />
            ))
          ) : (
            <div className={styles.noResults}>沒有符合搜尋條件的潛點</div>
          )}
        </div>
      )}

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