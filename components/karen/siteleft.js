import React, { useState, useEffect } from 'react';
import Search1sm from '@/components/search/search-1-sm';
import IconFillPrimaryMD from '@/components/icons/icon-fill-primary-md';
import TagSecondary from '@/components/tag/tag-secondary';
import SiteIntroCard from '@/components/karen/siteintrocard';
import styles from './siteleft.module.css';

export default function Siteleft() {
  const [inputValue, setInputValue] = useState('');
  const onClick = () => {
    console.log('送出搜尋');
  };

  return (
    <>
      <div>
        <div className={`${styles['container']}`}>
          navbar
          <div className={`${styles['searchContainer']}`}>
            <Search1sm
              className={styles['custom-search']}
              inputValue={inputValue}
              setInputValue={setInputValue}
              onClick={onClick}
            />
            <IconFillPrimaryMD type="slider" />
          </div>
          <div className={`${styles['tagContainer']}`}>
            <TagSecondary>東北角</TagSecondary>
            <TagSecondary>綠島</TagSecondary>
            <TagSecondary>蘭嶼</TagSecondary>
            <TagSecondary>恆春</TagSecondary>
            <TagSecondary>小琉球</TagSecondary>
            <TagSecondary>澎湖</TagSecondary>
          </div>
          <div className={`${styles['cardContainer']}`}>
            <SiteIntroCard onClick={() => console.log('點擊進入介紹')} />
            <SiteIntroCard onClick={() => console.log('點擊進入介紹')} />
            <SiteIntroCard onClick={() => console.log('點擊進入介紹')} />
            <SiteIntroCard onClick={() => console.log('點擊進入介紹')} />
            <SiteIntroCard onClick={() => console.log('點擊進入介紹')} />
          </div>
        </div>
      </div>
    </>
  );
}
