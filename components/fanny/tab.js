// Tab.js
import React from 'react';
import Link from 'next/link';
import style from "@/components/fanny/tab";

const Tab = ({ tabItems, activeTab, onSelect }) => {
  return (
    <div>
      {tabItems.map((tabItem, index) => (
        <Link
          key={index}
          href="#"
          className={activeTab === tabItem ? tabStyles['active'] : tabStyles['tab-link']}
          onClick={() => onSelect(tabItem)} // 當用戶點擊時切換 tab
        >
          {tabItem}
        </Link>
      ))}
    </div>
  );
};

export default Tab;
