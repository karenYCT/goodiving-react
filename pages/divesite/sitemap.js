import React, { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import styles from './sitemap.module.css';
import IconFillPrimaryXL from '@/components/icons/icon-fill-primary-xl';
import BoatIcon from '@/public/船潛.svg';
import ShoreIcon from '@/public/岸潛.svg';

// 地圖檔案名稱對照表
const MAP_FILES = {
  'GREEN ISLAND': 'greenisland.png',
  'ORCHID ISLAND': 'orchidisland.png',
  'HENGCHUN': 'hengchun.png',
  'XIAO LIUQIU': 'xiaoliuqiu.png',
  'PENGHU': 'penghu.png',
  'NORTHEAST COAST': 'northeastcoast.png',
  '全部': 'greenisland.png',
};


//地圖原始尺寸
const ORIGINAL_WIDTH = 1200;
const ORIGINAL_HEIGHT = 960;

export default function Sitemap({
  mapData = {
    diveSites: [],
    region_english: 'GREEN ISLAND',
    region_name: '',
  },
  currentSites = [],
  onModalOpen,
}) {
  console.log('地圖資料:', mapData);
  //狀態管理
  const [scale, setScale] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

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
      const widthScale = windowWidth / (ORIGINAL_WIDTH * 0.7);
      const heightScale = windowHeight / (ORIGINAL_HEIGHT * 0.7);
      const finalScale = Math.max(widthScale, heightScale);
      setScale(finalScale);
    } else {
      setScale(1);
    }
  }, [windowWidth, windowHeight]);

  // 計算座標位置
  const calculateResponsivePosition = (x, y) => {
    if (!windowWidth) return { x, y };

    const numX = Number(x);
    const numY = Number(y);

    if (isNaN(numX) || isNaN(numY)) {
      return { x: 0, y: 0 };
    }

    return windowWidth <= 576
      ? { x: numX * scale, y: numY * scale }
      : { x: numX, y: numY };
  };

  // 取得地圖檔案名稱函數
  const getMapFileName = (region_english) => {
    if (!region_english) return 'greenisland.png';
    const fileName = MAP_FILES[region_english] || 'greenisland.png';
    return fileName;
  };

  const mapFileName = getMapFileName(mapData.region_english);

  // 點擊座標事件處理
  const handleSiteClick = (spot) => {
    if (!spot || !onModalOpen) return;
    try {
      // 從 currentSites 中找到完整的潛點資料
      const fullSiteData = currentSites.find(
        (site) => site.site_id === spot.site_id
      );
      if (fullSiteData) {
        onModalOpen(fullSiteData, currentSites);
      } else {
        // 如果找不到完整資料，就使用原始的 spot 資料
        onModalOpen(spot, currentSites);
      }
    } catch (error) {
    }
  };

  return (
    <>
      <div className={styles.mapContainer}>
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit={true}
          wheel={{ disabled: true }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className={styles.controls}>
                <IconFillPrimaryXL type="zoomin" onClick={() => zoomIn()} />
                <IconFillPrimaryXL type="zoomout" onClick={() => zoomOut()} />
                <IconFillPrimaryXL
                  type="reset"
                  onClick={() => resetTransform()}
                />
              </div>

              <TransformComponent>
                <div
                  className={styles.mapWrapper}
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                  }}
                >
                  <img
                    src={`/${mapFileName}`}
                    alt={mapData.region_name || '潛點地圖'}
                    className={styles.baseMap}
                    onError={(e) => {
                      e.target.src = '/greenisland.png';
                    }}
                  />

                  {Array.isArray(mapData.diveSites) &&
                    mapData.diveSites.length > 0 &&
                    mapData.diveSites.map((spot) => {
                      if (!spot?.x_position || !spot?.y_position) {
                        return null;
                      }

                      const pos = calculateResponsivePosition(
                        spot.x_position,
                        spot.y_position
                      );

                      return (
                        <div
                          key={spot.site_id}
                          className={styles.diveSpot}
                          style={{
                            left: `${pos.x}px`,
                            top: `${pos.y}px`,
                          }}
                          onClick={() => handleSiteClick(spot)}
                          role="presentation"
                        >
                          {spot.method_name === '船潛' ? (
                            <BoatIcon className={styles.spotIcon} />
                          ) : (
                            <ShoreIcon className={styles.spotIcon} />
                          )}
                        </div>
                      );
                    })}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </>
  );
}