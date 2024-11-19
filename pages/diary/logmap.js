import React, { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import styles from './logmap.module.css';
import IconFillPrimaryXL from '@/components/icons/icon-fill-primary-xl';
import IconFillPinkXL from '@/components/icons/icon-fill-pink-xl';
import BoatIcon from '@/public/船潛.svg';
import ShoreIcon from '@/public/岸潛.svg';

// 地圖檔案名稱對照表
const MAP_FILES = {
  'GREEN ISLAND': 'greenisland.png',
  'ORCHID ISLAND': 'orchidisland.png',
  HENGCHUN: 'hengchun.png',
  'XIAO LIUQIU': 'xiaoliuqiu.png',
  PENGHU: 'penghu.png',
  'NORTHEAST COAST': 'northeastcoast.png',
  全部: 'greenisland.png',
};

//地圖原始尺寸
const ORIGINAL_WIDTH = 1200;
const ORIGINAL_HEIGHT = 960;

//react-zoom-pan-pinch官方文件用法
export default function Sitemap({
  mapData = {
    diveSites: [],
    region_english: 'GREEN ISLAND', // 修改預設值以符合資料庫
    region_name: '',
  },
  // currentSites = [],
  logs = [],
  onOpenDiaryForm = () => {},
  onSiteClick = () => {},
}) {
  //狀態管理
  const [scale, setScale] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  // 檢查潛點是否有日誌
  const checkHasLogs = (siteId) => {
    if (!Array.isArray(logs) || !siteId) return false;
    return logs.some((log) => log?.site_id === siteId);
  };

  //取得潛點的所有日誌
  const getSiteLogs = (siteId) => {
    if (!Array.isArray(logs) || !siteId) return [];
    return logs.filter((log) => log.site_id === siteId);
  };

  // 處理潛點點擊
  const handleSiteClick = (spot) => {
    if (!spot?.site_id) return;

    if (checkHasLogs(spot.site_id)) {
      const siteLogs = getSiteLogs(spot.site_id);
      onSiteClick(siteLogs, spot.site_name || '未命名潛點');
    }
  };

  //視窗尺寸變動
  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight - 250);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // 計算縮放比例
  useEffect(() => {
    if (windowWidth <= 576) {
      // 計算寬度和高度的縮放比例
      const widthScale = windowWidth / (ORIGINAL_WIDTH * 0.7); // 調整為原始寬度的一半
      const heightScale = windowHeight / (ORIGINAL_HEIGHT * 0.7); // 調整為原始高度的一半

      // 使用較大的縮放比例以確保地圖完整顯示
      const finalScale = Math.max(widthScale, heightScale);
      setScale(finalScale);
    } else {
      setScale(1);
    }
  }, [windowWidth, windowHeight]);

  // 計算座標位置
  const calculateResponsivePosition = (x, y) => {
    if (!windowWidth) return { x, y };

    // 確保座標值為數字
    const numX = Number(x);
    const numY = Number(y);

    if (isNaN(numX) || isNaN(numY)) {
      return { x: 0, y: 0 };
    }

    // 計算縮放後的座標
    return windowWidth <= 576
      ? { x: numX * scale, y: numY * scale }
      : { x: numX, y: numY };
  };

  // 取得地圖檔案名稱函數
  const getMapFileName = (region_english) => {
    if (!region_english) return 'greenisland.png';

    // 直接使用原始的 region_english（不轉小寫）
    const fileName = MAP_FILES[region_english] || 'greenisland.png';

    return fileName;
  };

  const mapFileName = getMapFileName(mapData.region_english);

  console.log('MapData:', mapData);
  console.log('DiveSites:', mapData.diveSites);

  return (
    //包覆地圖的最外層的容器
    <div className={`${styles['mapContainer']}`}>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit={true}
        wheel={{ disabled: true }}
      >
        {/* 放大縮小重設的功能 */}
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className={`${styles['controls']}`}>
              <IconFillPrimaryXL type="zoomin" onClick={() => zoomIn()} />
              <IconFillPrimaryXL type="zoomout" onClick={() => zoomOut()} />
              <IconFillPrimaryXL
                type="reset"
                onClick={() => resetTransform()}
              />
              <IconFillPinkXL
                type="pen"
                onClick={() => {
                  console.log('新增日誌按鈕被點擊');
                  onOpenDiaryForm();
                }}
              />
            </div>

            <TransformComponent>
              {/* 地圖容器和地圖 */}
              <div
                className={`${styles['mapWrapper']}`}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'center center',
                }}
              >
                <img
                  src={`/${mapFileName}`}
                  alt={mapData.region_name || '潛點地圖'}
                  className={`${styles['baseMap']}`}
                  onError={(e) => {
                    e.target.src = '/greenisland.png';
                  }}
                />

                {/* 地圖上的座標位置使用map的方式帶入*/}
                {Array.isArray(mapData.diveSites) &&
                  mapData.diveSites.length > 0 &&
                  mapData.diveSites.map((spot) => {
                    if (!spot?.x_position || !spot?.y_position) {
                      console.log('缺少座標的潛點:', spot);
                      return null;
                    }

                    const pos = calculateResponsivePosition(
                      spot.x_position,
                      spot.y_position
                    );

                    const hasLogs = checkHasLogs(spot.site_id);

                    return (
                      <button
                        key={
                          spot.site_id ||
                          `${spot.x_position}-${spot.y_position}`
                        }
                        className={`${styles['diveSpot']}`}
                        style={{
                          left: `${pos.x}px`,
                          top: `${pos.y}px`,
                        }}
                        onClick={() => handleSiteClick(spot)}
                      >
                        {/* 地圖座標的圖示和地點名稱 */}
                        {spot.type === 'boat' ? (
                          <BoatIcon
                            className={`${styles['spotIcon']} ${
                              hasLogs ? styles['hasLogs'] : ''
                            }`}
                          />
                        ) : (
                          <ShoreIcon
                            className={`${styles['spotIcon']} ${
                              hasLogs ? styles['hasLogs'] : ''
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
