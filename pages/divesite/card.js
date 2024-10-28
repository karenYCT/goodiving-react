import React, { useState, useEffect } from 'react'
import Imgintrocard from '@/components/karen/siteintrocard';
import UpLoadImg from '@/components/karen/uploadimg';

export default function Card({
  onClick = () => {},
  imgUrl = "", 
  imgSize = "", 
  progress = 0 
}) {
  return (
    <>
      <div style={{width: '650px', flexDirection: 'column', gap: '20px'}}>
        <UpLoadImg 
          onClick={onClick}
          img_url={imgUrl}
          img_size={imgSize}
          progress={75}
        />
        <UpLoadImg 
          onClick={onClick}
          img_url={imgUrl}
          img_size={imgSize}
          progress={75}
        />
        <UpLoadImg 
          onClick={onClick}
          img_url={imgUrl}
          img_size={imgSize}
          progress={75}
        />
      </div>
    </>
  )
}
