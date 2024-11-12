// 處理圖片上傳和裁剪
import React, { useState, useEffect } from 'react';
import Button from './btn-outline-primary';

export default function ImageCropper(props) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 100, height: 100 });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageSrc(URL.createObjectURL(file)); // 設置圖片來源
  };

  const handleCrop = async () => {
    const croppedBlob = await getCroppedImg(imageSrc, crop); // 調用裁剪函數
    onCropComplete(croppedBlob); // 將裁剪結果傳遞給父組件
  };
  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <camvas />
      <button>確定裁剪</button>
    </>
  );
}
