import React, { useState, useEffect } from 'react';
import Siteleft from '@/components/karen/siteleft';
import SiteMap from '@/components/karen/sitemap';

// 假設我們有多個地區的數據
import greenIslandData from '@/data/divesite-greenisland.json';
import orchidIslandData from '@/data/divesite-orchidisland.json';
import xiaoLiuQiuData from '@/data/divesite-xiaoliuqiu.json';

const REGION_DATA = {
  greenisland: greenIslandData.greenisland,      // { mapInfo: {...}, diveSpots: [...] }
  orchidisland: orchidIslandData.orchidisland,   // { mapInfo: {...}, diveSpots: [...] }
  xiaoliuqiu: xiaoLiuQiuData.xiaoliuqiu        // { mapInfo: {...}, diveSpots: [...] }
};

console.log('綠島資料:', greenIslandData.greenisland.diveSpots.length);     // 17
console.log('蘭嶼資料:', orchidIslandData.orchidisland.diveSpots.length);   // 19
console.log('小琉球資料:', xiaoLiuQiuData.xiaoliuqiu.diveSpots.length);    // 17

const REGIONS = [
  { 
    id: 'greenisland', 
    name: '綠島', 
    total: greenIslandData.greenisland.diveSpots.length  // 直接從原始檔案取得數量
  },
  { 
    id: 'orchidisland', 
    name: '蘭嶼', 
    total: orchidIslandData.orchidisland.diveSpots.length
  },
  { 
    id: 'xiaoliuqiu', 
    name: '小琉球', 
    total: xiaoLiuQiuData.xiaoliuqiu.diveSpots.length
  },
  { id: 'northeast', name: '東北角', total: 0 },
  { id: 'hengchun', name: '恆春', total: 0 },
  { id: 'penghu', name: '澎湖', total: 0 }
];

export default function Index() {
  const [selectedRegion, setSelectedRegion] = useState('greenisland');
  const [mapData, setMapData] = useState(REGION_DATA['greenisland']);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    // 確保該地區有數據才更新
    if (REGION_DATA[region]) {
      setMapData(REGION_DATA[region]);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#89A8BC',
        justifyContent: 'space-between',
      }}
    >
      <Siteleft
        selectedRegion={selectedRegion}
        onRegionChange={handleRegionChange}
        regions={REGIONS}
        currentSpots={mapData.diveSpots}
      />
      <SiteMap mapData={mapData} />
    </div>
  );
}
