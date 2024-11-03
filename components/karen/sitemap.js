import React, { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import styles from './sitemap.module.css';
import IconFillPrimaryXL from '@/components/icons/icon-fill-primary-xl';
import BoatIcon from '@/public/船潛.svg';
import ShoreIcon from '@/public/岸潛.svg';

//react-zoom-pan-pinch官方文件用法
export default function Sitemap({
  mapData = {
    diveSites: [],
    region_english: '',
    region_name: '',
  },
}) {
  const [scale, setScale] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const ORIGINAL_WIDTH = 1200; // 原始地圖寬度

  // 地圖檔案名稱對照表
  const MAP_FILES = {
    'GREEN ISLAND': 'greenisland.png',
    'ORCHID ISLAND': 'orchidisland.png',
    HENGCHUN: 'hengchun.png',
    'XIAO LIUQIU': 'xiaoliuqiu.png',
    PENGHU: 'penghu.png',
    'NORTHEAST COAST': 'northeastcoast.png',
  };

  // 檢查是否為客戶端
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 計算縮放比例
  useEffect(() => {
    if (windowWidth <= 576) {
      setScale(windowWidth / ORIGINAL_WIDTH);
    } else {
      // 如果是桌面版，維持原始大小
      setScale(1);
    }
  }, [windowWidth]);

  // 修改座標計算方式
  const calculateResponsivePosition = (x, y) => {
    if (!windowWidth) return { x, y };

    // 確保座標值為數字
    const numX = Number(x);
    const numY = Number(y);

    if (isNaN(numX) || isNaN(numY)) {
      console.error('Invalid coordinates:', x, y);
      return { x: 0, y: 0 };
    }

    const scaleFactor = windowWidth <= 576 ? windowWidth / ORIGINAL_WIDTH : 1;

    // 根據原始地圖尺寸進行座標調整
    return {
      x: numX * scale,
      y: numY * scale,
    };
  };

  // 簡化的取得地圖檔案名稱函數
  const getMapFileName = (region_english) => {
    if (!region_english) return 'greenisland.png';

    // 直接使用 region_english 查找對應的檔案名稱
    const mapFile = MAP_FILES[region_english];
    console.log('Region:', region_english, 'Map file:', mapFile); // 除錯用

    return mapFile || 'greenisland.png'; // 預設返回綠島地圖
  };

  const mapFileName = getMapFileName(mapData.region_english);
  // 計算響應式座標
  // const calculateResponsivePosition = (x, y) => {
  //   if (!windowWidth) return { x, y };

  //   const scaleFactor = windowWidth <= 576 ? windowWidth / ORIGINAL_WIDTH : 1;
  //   return {
  //     x: x * scaleFactor,
  //     y: y * scaleFactor,
  //   };
  // };

  // 安全地獲取地圖英文名稱，確保一定有值
  // const mapEnglishName = (
  //   mapData.region_english || 'greenisland'
  // ).toLowerCase();

  // 直接使用檔案名稱，因為檔案就在 public 目錄下

  // const mapFileName = `${(
  //   mapData.region_english || 'greenisland'
  // )}.png`;
  // console.log('Current map file:', mapFileName); // 用於除錯

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
            </div>

            <TransformComponent>
              {/* 地圖容器和地圖 */}
              <div
                className={`${styles['mapWrapper']}`}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
              >
                <img
                  src={`/${mapFileName}`}
                  alt={mapData.region_name || '潛點地圖'}
                  className={styles.baseMap}
                  onError={(e) => {
                    console.error('地圖載入失敗:', mapFileName);
                    e.target.src = '/greenisland.png';
                  }}
                />

                {/* 地圖上的座標位置使用map的方式帶入*/}
                {mapData.diveSites.map((spot) => {
                  // 確保座標存在且是有效值
                  if (!spot.x_position || !spot.y_position) {
                    console.log(
                      'Missing coordinates for spot:',
                      spot.site_name
                    );
                    return null;
                  }

                  const pos = calculateResponsivePosition(
                    spot.x_position,
                    spot.y_position
                  );

                  // 新增座標除錯輸出
                  console.log(
                    `Spot: ${spot.site_name}, Original: (${spot.x_position}, ${spot.y_position}), Calculated: (${pos.x}, ${pos.y})`
                  );

                  return (
                    <div
                      key={spot.site_id}
                      className={`${styles['diveSpot']}`}
                      style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                      }}
                    >
                      {/* 地圖座標的圖示和地點名稱 */}
                      {spot.method_id === 2 ? (
                        <BoatIcon className={styles.spotIcon} />
                      ) : (
                        <ShoreIcon className={styles.spotIcon} />
                      )}
                      {/* <span className={`${styles['spotName']}`}>{spot.name}</span> */}
                    </div>
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
