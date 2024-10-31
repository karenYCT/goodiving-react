import React, { useState, useEffect } from 'react';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import { FaMapMarkerAlt, FaShareAlt } from 'react-icons/fa';
import { FaHeart, FaRegBookmark } from 'react-icons/fa6';
import styles from './siteintrocard.module.css';
import MiniTag from '../tag/minitag';
import SitepageModal from './sitepage.modal'; 

export default function SiteIntroCard({
  data="",
  onClick = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className={`${styles['container']}`}>
        <div className={`${styles['section1']}`}>
          {/* 放照片的位置 */}
          <div className={`${styles['imgContainer']}`}>
            <img src="/siteimg.JPG" alt="{data.name}" />
          </div>
          <div className={`${styles['itemContainer']}`}>
            {/* 放文字的位置 */}
            <h5>{data.name}潛點名稱</h5>
            <div>
              <span className={`${styles['locationContainer']}`}>
                <FaMapMarkerAlt />
                {data.location}潛點地區
              </span>
              {/* <span>潛點地區</span> */}
            </div>
            <div>
              <span className={`${styles['heartContainer']}`}>
                <span className={`${styles['rating']}`}>4.0</span>
                <FaHeart />
              </span>
            </div>

            <div className={`${styles['tagContainer']}`}>
              {/* 這裡會需要下變數如果是船潛就顯示type="boat"... */}
              <MiniTag type="boat" />
              <MiniTag type="level">簡單</MiniTag>
            </div>
          </div>
        </div>
        {/* 放功能的位置 */}
        <div className={`${styles['rightContainer']}`}>
          <div className={`${styles['functionContainer']}`}>
            <FaRegBookmark /> <FaShareAlt />
          </div>

          <div className={`${styles['buttonWrapper']}`}>
            <ButtonFP2 onClick={openModal}>介紹</ButtonFP2>
          </div>
        </div>
      </div>


      {/* 加入 Modal 組件 */}
      <SitepageModal 
        isOpen={isOpen}
        closeModal={closeModal}
        data={data} // 可以傳入資料給 modal
      />
    </>
  );
}
