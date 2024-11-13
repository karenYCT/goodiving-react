// 處理圖片的函數：根據用戶選定的裁剪區域，生成裁剪後的圖片 Blob，這是用於上傳的圖片格式。

export async function getCroppedImg(imageSrc, crop) {
  if (!imageSrc) {
    throw new Error('imageSrc is null or undefined');
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const image = new Image();

  // 設置 CORS 屬性
  image.crossOrigin = 'anonymous';
  image.src = imageSrc;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

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
