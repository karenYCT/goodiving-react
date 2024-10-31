import React, { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import styles from './sitemap.module.css';
import IconFillPrimaryXL from '@/components/icons/icon-fill-primary-xl';
import BoatIcon from '@/public/船潛.svg';
import ShoreIcon from '@/public/岸潛.svg';

//react-zoom-pan-pinch官方文件用法
export default function Sitemap({ mapData }) {
  const { mapInfo, diveSpots } = mapData;
  const [scale, setScale] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const ORIGINAL_WIDTH = 1200; // 原始地圖寬度

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

  // 計算響應式座標
  const calculateResponsivePosition = (x, y) => {
    if (!windowWidth) return { x, y };

    const scaleFactor = windowWidth <= 576 ? windowWidth / ORIGINAL_WIDTH : 1;
    return {
      x: x * scaleFactor,
      y: y * scaleFactor,
    };
  };

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

              {/* <button onClick={() => resetTransform()}>x</button> */}
            </div>

            <TransformComponent>
              {/* 地圖容器和地圖 */}
              <div className={`${styles['mapWrapper']}`}>
                <img
                  src={mapInfo.imageUrl}
                  alt={mapInfo.name}
                  className={`${styles['baseMap']}`}
                />

                {/* 地圖上的座標位置使用map的方式帶入*/}
                {diveSpots.map((spot) => {
                  const pos = calculateResponsivePosition(spot.x, spot.y);

                  return (
                    <div
                      key={spot.id}
                      className={`${styles['diveSpot']}`}
                      style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                      }}
                    >
                      {/* 地圖座標的圖示和地點名稱 */}
                      {spot.type === 'boat' ? (
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
