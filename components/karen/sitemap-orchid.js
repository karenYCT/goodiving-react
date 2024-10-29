import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import styles from './sitemap-orchid.module.css';
import IconFillPrimaryXL from '@/components/icons/icon-fill-primary-xl';
import BoatIcon from '@/public/船潛.svg';
import ShoreIcon from '@/public/岸潛.svg';

// const BoatIcon = '/船潛.svg';
// const ShoreIcon = '/岸潛.svg';

//react-zoom-pan-pinch官方文件用法
export default function DivemapOrchid({ mapData }) {
  const { mapInfo, diveSpots } = mapData;

  return (
    //包覆地圖的最外層的容器
    <div className={`${styles['mapContainer']}`}>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit={true}
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
                {diveSpots.map((spot) => (
                  <div
                    key={spot.id}
                    className={`${styles['diveSpot']}`}
                    style={{
                      left: `${spot.x}px`,
                      top: `${spot.y}px`,
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
                ))}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
