import React, { useState, useEffect } from 'react';
import MiniMethodb from '../tag/mini-methodb';
import MiniLevel from '../tag/mini-level';
import ButtonFP from '@/components/buttons/btn-fill-primary';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import styles from './siteintrocard1.module.css';

export default function Card1(props) {
  return (
    <>
      <div className={`${styles['container']}`}>
        {/* 放照片的位置 */}
        <div className={`${styles['imgContainer']}`}>
            <img src="/example4.jpg" alt="" />
        </div>
          
          <div className={`${styles['itemContainer']}`} >
            {/* 放文字的位置 */}
            <h5>潛點名稱</h5>
            <div>
              <span className={`${styles['locationContainer']}`}>
                <FaMapMarkerAlt />潛點地區
              </span>
              {/* <span>潛點地區</span> */}
            </div>

            <div>
              <span  className={`${styles['heartContainer']}`}>4.0 <FaHeart /></span>
            </div>
            <div className={`${styles['tagContainer']}`} >
              <MiniMethodb />
            
              <MiniLevel>困難</MiniLevel>
        
            </div>
          </div>
        

        {/* 放功能的位置 */}
        <div  className={`${styles['rightContainer']}`}>
          <div className={`${styles['functionContainer']}`}>
          <FaRegBookmark /> <FaShareAlt />
          </div>

          <div className={`${styles['buttonWrapper']}`}><ButtonFP>潛點介紹</ButtonFP> 
          </div>
        </div>
      </div>
    </>
  );
}
