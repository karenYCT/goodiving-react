import React, { useState, useEffect, Children } from 'react';
import styles from '@/components/tag/tag.module.css';
import {
  FaRulerVertical,
  FaStar,
  FaHeart,
  FaTemperatureLow,
  FaRegClock,
  FaFishFins,
} from 'react-icons/fa6';
import BoatIcon from '@/public/船潛.svg';
import ShoreIcon from '@/public/岸潛.svg';

export default function Minitag({
  type = '',
  max_depth = '', // 最大深度資料庫欄位
  level_name = '', // 難易度資料庫欄位
  water_temp = '', // 水溫資料庫欄位
  bottom_time = '', // 潛水時間資料庫欄位
  visi_name = '', // 能見度資料庫欄位
  likes_count = '', // 喜愛度資料庫欄位
  customIcon = '',
  children = '',
}) {
  const tagConfigs = {
    depth: {
      icon: <FaRulerVertical />,
      colorClass: 'tagicon-lakegreen',
      value: max_depth,
      suffix: '米',
    },
    level: {
      icon: <FaStar />,
      colorClass: 'tagicon-yellow',
      value: level_name,
      suffix: '',
    },
    loves: {
      icon: <FaHeart />,
      colorClass: 'tagicon-pink',
      value: likes_count,
      suffix: '',
    },
    boat: {
      icon: <BoatIcon />,
      colorClass: 'tagicon-purple',
      value: '',
      text: '船潛',
    },
    shore: {
      icon: <ShoreIcon />,
      colorClass: 'tagicon-purple',
      value: '',
      text: '岸潛',
    },
    temp: {
      icon: <FaTemperatureLow />,
      colorClass: 'tagicon-blue',
      value: water_temp,
      suffix: '°C',
    },
    time: {
      icon: <FaRegClock />,
      colorClass: 'tagicon-red',
      value: bottom_time,
      suffix: '分鐘',
    },
    visi: {
      icon: <FaFishFins />,
      colorClass: 'tagicon-green',
      value: visi_name,
      suffix: '',
    },
  };

  const config = tagConfigs[type] || {};
  const content = config.text || config.value || children || '';
  const suffix = config.suffix || '';

  return (
    <div className={`${styles['tag-mini']}`}>
      <div
        className={`${styles['tagicon-container']} ${
          styles[config.colorClass]
        }`}
      >
        {customIcon || config.icon}
      </div>
      {content}
      {suffix}
    </div>
  );
}
