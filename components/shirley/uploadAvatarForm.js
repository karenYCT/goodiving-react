import React, { useState, useEffect } from 'react';
import styles from './uploadAvatarForm.module.css';
import BtnPrimary from '@/components/buttons/btn-fill-primary';
import BtnLight from '@/components/buttons/btn-fill-light';
import { UPLOAD_FILE, AUTH_UPLOAD_AVATAR } from '@/configs/api-path';
import { useUser } from '@/context/user-context';
import { MdUpload } from 'react-icons/md';
import Modal from './modal';
import toast from 'react-hot-toast';
import ImageCropper from './imageCropper';
import { getCroppedImg } from '@/utils/cropImage'; // 自行實作裁剪方法.

export default function UploadAvatarForm({
  isAvatarModalOpen = false,
  closeModal = () => {},
}) {
  const { userData, setUserData } = useUser(); // 用戶資料
  const [preview, setPreview] = useState(
    `${UPLOAD_FILE}${userData.profile_picture}`
  ); // 預覽圖片的 URL
  const [croppedImage, setCroppedImage] = useState(null); // 儲存裁剪後的圖片
  const [isDragging, setIsDragging] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 100, height: 100 }); // 控制圖片的 X 和 Y 位移
  const [zoom, setZoom] = useState(1.1); // 控制裁剪框的大小

  // 檔案改變
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (preview) {
        URL.revokeObjectURL(preview); // 釋放內存
      }
      const previewUrl = URL.createObjectURL(file);
      console.log('Generated preview URL:', previewUrl); // 確認生成的 URL
      setPreview(previewUrl);
      setCroppedImage(null); // 重置 croppedImage
      setZoom(1);
    } else {
      console.warn('No file selected');
    }
  };

  // 點擊div區(上傳區)，觸發input
  const handleUploadClick = (e) => {
    const input = e.currentTarget.querySelector("input[type='file']");
    if (input) {
      input.click();
    }
  };

  // onDrop: 拖動中放置到目標區域時觸發
  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileChange({ target: { files: [file] } });
    }
  };
  //onDragOver: 當文件在放置區域上方拖動時反覆觸發
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const input = e.currentTarget.querySelector("input[type='file']");
  };
  // onDragEnter: 文件首次進入放置區域時觸發
  const handleDragEnter = () => {
    setIsDragging(true);
  };
  // onDragLeave: 文件從放置區域中拖出時觸發
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  // onCropComplete的函式，處理裁剪完成: 回傳裁減範圍、裁減框在圖片中的實際像素範圍
  const handleCropComplete = async (croppedArea, croppedAreaPixels) => {
    if (!preview) {
      return;
    }

    try {
      const croppedImg = await getCroppedImg(preview, croppedAreaPixels); // 使用裁剪函數
      setCroppedImage(croppedImg); // 儲存裁剪後的圖片
    } catch (error) {
      console.error('裁剪圖片失敗:', error);
    }
  };

  // 取消圖片變更(恢復成資料庫的資料)
  const handleCancel = () => {
    setPreview(`${UPLOAD_FILE}${userData.profile_picture}`);
    setZoom(1);
  };

  // 上傳大頭照
  const submitAvatar = async (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    const fd = new FormData();
    if (croppedImage) {
      fd.append('changeavatar', croppedImage);
    }
    fd.append('user_id', userData.user_id);
    try {
      const response = await fetch(AUTH_UPLOAD_AVATAR, {
        method: 'PUT',
        body: fd,
        credentials: 'include',
      });
      const result = await response.json();
      console.log('伺服器回傳的大頭貼路徑:', JSON.stringify(result, null, 4));
      if (result.success) {
        setUserData((prevData) => ({
          ...prevData,
          profile_picture: result.filename,
        }));
        closeModal();
        toast.success('大頭照更新成功');
      }
      // console.log('在更新照片之後，看一下UserData有沒有變', userData);
    } catch (error) {
      console.log(error);
    }
  };

  // 如果關閉整個 MODAL 需要重設畫布
  const handleModalPressX = () => {
    closeModal();
    setPreview(`${UPLOAD_FILE}${userData.profile_picture}`);
    setZoom(1);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (!isAvatarModalOpen) {
    return null;
  }

  return (
    <>
      <Modal closeModal={handleModalPressX}>
        <div className={styles['content']}>
          <h4 className={styles['title']}>更換大頭照</h4>
          <form
            name="changeAvatarFrom"
            onSubmit={(e) => {
              submitAvatar(e);
            }}
            encType="multipart/form-data"
          >
            <div className={styles['picture']}>
              {/* 圖片上傳 */}
              <div
                className={`${styles['upload-area']} ${
                  isDragging ? styles['dragging'] : ''
                }`}
                role="button"
                tabIndex="0"
                onKeyDown={() => {}}
                onClick={handleUploadClick}
                onDrop={(e) => {
                  handleDrop(e);
                }}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                <input
                  type="file"
                  name="changeavatar"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <MdUpload className={styles['upload-icon']} />
                <div className={styles['upload-text']}>
                  <p>點擊選擇圖片或拖曳圖片到這裡</p>
                </div>
                <input type="text" defaultValue={userData.user_id} hidden />
              </div>
              {/* 圖片預覽 */}
              <div className={styles['preview-area']}>
                <div className={styles['image-container']}>
                  {/* <Image
                    src={preview || `${UPLOAD_FILE}${userData.profile_picture}`}
                    alt="示範圖片"
                    fill // 讓圖片填滿容器
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    priority
                  /> */}
                  {preview && (
                    <ImageCropper
                      src={preview}
                      crop={crop}
                      zoom={zoom}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={handleCropComplete}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={styles['btn-area']}>
              <BtnLight onClick={handleCancel}>取消</BtnLight>
              <BtnPrimary type="submit">上傳頭貼</BtnPrimary>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
