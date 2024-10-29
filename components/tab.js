import React, { useState, useEffect } from 'react';
import tabStyles from '/components/tab.module.css';

export default function Tab({ tabItems, activeTab, handleTabClick }) {
  return (
    <>
      <div className={tabStyles['tab-box']}>
        {tabItems.map((tabItem, index) => {
          return (
            <button
              key={index}
              className={
                index === activeTab
                  ? `${tabStyles['tab-link']} ${tabStyles['active']}`
                  : tabStyles['tab-link']
              }
              onClick={() => handleTabClick(index)}
            >
              {tabItem}
            </button>
          );
        })}
        {/* <Link href="#" className={tabStyles['active']}>更新密碼</Link>
        <Link href="#" className={tabStyles['tab-link']}>更新個人資訊</Link> */}
      </div>
    </>
  );
}
