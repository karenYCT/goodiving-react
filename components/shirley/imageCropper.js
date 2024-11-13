// 主要職責是顯示裁剪框並允許用戶調整裁剪範圍
import React from 'react';
import Cropper from 'react-easy-crop';
import styles from './uploadAvatarForm.module.css';
import IconFillPrimarymd from '@/components/shirley/icon-fill-primary-md';

export default function ImageCropper({
  src,
  crop,
  zoom,
  onCropChange,
  onZoomChange,
  onCropComplete,
}) {
  // const onCropComplete = async (croppedArea, croppedAreaPixels) => {
  //   const croppedImage = await getCroppedImg(src, croppedAreaPixels);
  //   setCroppedImage(croppedImage);
  // };

  if (!src) {
    return null; // 如果 src 無效，則不渲染 Cropper
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: 300 }}>
      <Cropper
        image={src}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropComplete}
      />
      <div className={styles['zoom-button-area']}>
        <IconFillPrimarymd
          type="zoomin"
          onClick={() => onZoomChange((prev) => prev + 0.1)}
        />
        <IconFillPrimarymd
          type="zoomout"
          onClick={() => onZoomChange((prev) => prev - 0.1)}
        />
      </div>
    </div>
  );
}
