import React from 'react';
import Link from 'next/link';
import styles from './tab.module.css';  // 修正樣式引入

const Tab = ({ 
  tabItems = [], 
  activeTab, 
  onSelect,
  className = '' 
}) => {
  // 防止默認的錨點行為
  const handleClick = (e, tabItem) => {
    e.preventDefault();
    onSelect(tabItem);
  };

  return (
    <nav className={`${styles.tabContainer} ${className}`}>
      <div className={styles.tabList}>
        {tabItems.map((tabItem, index) => (
          <Link
            key={index}
            href="#"
            className={`
              ${styles.tabLink} 
              ${activeTab === tabItem ? styles.active : ''}
            `}
            onClick={(e) => handleClick(e, tabItem)}
          >
            <span className={styles.tabContent}>{tabItem}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Tab;