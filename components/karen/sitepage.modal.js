import React, { useState, useEffect } from 'react';
import styles from './sitepage.module.css';
import Imgintrocard from './imgintrocard';
import Tab from '../tab';
import ImgcarouselSM from './imgcarousel-sm';
import Logcard from './logcard';
import ButtoniconR from '../buttons/btn-icon-right';
import ImgintrocardXS from './imgintrocard-xs';
import IconRight from '../icons/icon-fill-primary-smright';
import LeftQua from '@/public/leftquatation.svg';
import RightQua from '@/public/rightquatation.svg';
import { useDragScroll } from '@/hooks/usedragscroll';

export default function SitepageModal(props) {

  const dragScroll = useDragScroll();
  return (
    <div className={styles.container}>
      <div className={styles.imgintro}>
        <Imgintrocard />
      </div>

      <div className={styles.tabContainer}>
        <Tab />
      </div>

      <div className={styles.infoContainer}>
        <h5>綠島|鋼鐵礁</h5>
        <p>
          鋼鐵礁位於龜灣與大白沙之間的海域，是一座以鋼鐵建造的人工魚礁。鋼鐵礁一共有四座，長寬各自約為10公尺，潛點的深度範圍自頂部的約21公尺開始，中層為約25公尺，最深處則達31公尺，是一個適合探索不同深度的潛水點。
        </p>
      </div>

      <div className={styles.carouselContainer}>
        <ImgcarouselSM />
      </div>

      <h5>評分</h5>
      <div className={styles.ratingContainer}>
        <h5>卡片待補</h5>
      </div>

      <h5>深藍日誌</h5>
      <div
        className={`${styles.logContainer} ${styles.dragScroll}`}
        {...dragScroll}
      >
        <Logcard />
        <Logcard />
        <Logcard />
        <Logcard />
        
      </div>

      <div className={styles.descContainer}>
        <div className={styles.quotationContainer}>
          <LeftQua className={styles.quotation} />
          <h5>每一段冒險都源於一顆向往自由的心</h5>
          <RightQua className={styles.quotation} />
        </div>
        <p>
          大海呼喚著，來發現它的秘密擁抱它的無邊廣闊，讓靈魂隨波逐流點擊下方按鈕，一起來開啟您與大海的深度探索
        </p>
        <ButtoniconR>立即預定您的深藍假期</ButtoniconR>
      </div>

      <h5>查看綠島更多潛點</h5>
      <div className={styles.moreContainer}>
        <div className={styles.introcard}>
          <ImgintrocardXS />
          <IconRight />
        </div>
      </div>
    </div>
  );
}
