import React, { useState, useEffect } from 'react';
import Siteleft from '@/components/karen/main';
import SiteMap from '@/components/karen/sitemap';
import { API_BASE_URL } from '@/configs/api-path';

export default function Index() {
  // 狀態管理
  const [selectedRegion, setSelectedRegion] = useState(1); // 預設顯示第一個地區
  const [regions, setRegions] = useState([]); // 存儲所有地區
  const [mapData, setMapData] = useState({ diveSpots: [] }); // 存儲潛點資料
  const [loading, setLoading] = useState(true);

  // 獲取所有地區資料
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/siteinfo/location`);
        if (!response.ok) throw new Error('獲取地區資料失敗');
        
        const data = await response.json();
        if (data.success) {
          setRegions(data.data);
        }
      } catch (error) {
        console.error('獲取地區資料錯誤:', error);
      }
    };

    fetchRegions();
  }, []);

  // 當選擇的地區改變時，獲取該地區的潛點資料
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/siteinfo/location/${selectedRegion}`);
        if (!response.ok) throw new Error('獲取潛點資料失敗');

        const data = await response.json();
        if (data.success) {
          // 將資料整理成地圖元件需要的格式
          setMapData({
            diveSpots: data.data
          });
        }
      } catch (error) {
        console.error('獲取潛點資料錯誤:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedRegion) {
      fetchLocationData();
    }
  }, [selectedRegion]);

  // 處理地區選擇變更
  const handleRegionChange = (regionId) => {
    setSelectedRegion(regionId);
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
      {loading ? (
        <div>載入中...</div>
      ) : (
        <>
          <Siteleft
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionChange}
            regions={regions}
            currentSpots={mapData.diveSpots}
          />
          <SiteMap mapData={mapData} />
        </>
      )}
    </div>
  );
}