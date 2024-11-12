// 處理圖片的函數：根據用戶選定的裁剪區域，生成裁剪後的圖片 Blob，這是用於上傳的圖片格式。
import React, { useState, useEffect } from 'react';

export async function getCroppedImg(imageSrc, crop) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const image = new Image();
  image.src = imageSrc;

  await new Promise((resolve) => (image.onload = resolve));

  canvas.width = crop.width;
  canvas.height = crop.height;
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/jpeg');
  });
}
