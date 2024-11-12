import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './uploadAvatarForm.module.css';
import BtnPrimary from '@/components/buttons/btn-fill-primary';
import BtnLight from '@/components/buttons/btn-fill-light';
import { UPLOAD_FILE, AUTH_UPLOAD_AVATAR } from '@/configs/api-path';
import { useUser } from '@/context/user-context';
import { MdUpload } from 'react-icons/md';
import Modal from './modal';
import toast from 'react-hot-toast';

export default function UploadAvatarForm({
  isAvatarModalOpen = false,
  closeModal = () => {},
}) {
  const { userData, setUserData } = useUser(); // 用戶資料
  const [preview, setPreview] = useState(null); // 預覽圖片的 URL

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl); //清除舊的預覽圖 URL，以防止記憶體洩漏
    }
  };

  const handleCancel = () => {
    setPreview(null); // 移除預覽
    setUserData((prevData) => ({
      ...prevData,
      profile_picture: userData.profile_picture, // 回到初始圖片
    }));
  };

  const submitAvatar = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('changeavatar', e.target.changeavatar.files[0]); // 僅上傳指定的檔案欄位
    fd.append('user_id', userData.user_id); // 其他必要的欄位

    try {
      const response = await fetch(AUTH_UPLOAD_AVATAR, {
        method: 'PUT',
        body: fd,
        credentials: 'include',
      });
      const result = await response.json();
      console.log('伺服器回傳的大頭貼路徑:', JSON.stringify(result, null, 4));
      if (result.success) {
        setUserData((prevData) => {
          const updatedData = { ...prevData, profile_picture: result.filename };
          closeModal();
          toast.success('大頭照更新成功');
          return updatedData;
        });
      }
      // console.log('在更新照片之後，看一下UserData有沒有變', userData);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isAvatarModalOpen) {
    return null;
  }

  return (
    <>
      <Modal closeModal={closeModal}>
        <div className={styles['content']}>
          <h4>更換大頭照</h4>
          <form
            name="changeAvatarFrom"
            onSubmit={(e) => {
              submitAvatar(e);
            }}
            encType="multipart/form-data"
          >
            <div className={styles['picture']}>
              {/* 圖片上傳 */}
              <div className={styles['upload-area']}>
                <input
                  type="file"
                  name="changeavatar"
                  onChange={handleFileChange}
                />
                <MdUpload />
                <p>選擇檔案或將檔案拖放至這裡</p>
                <input type="text" defaultValue={userData.user_id} hidden />
                <button type="button"></button>
              </div>
              {/* 圖片預覽 */}
              <div className={styles['preview-area']}>
                <div className={styles['image-container']}>
                  <Image
                    src={preview || `${UPLOAD_FILE}${userData.profile_picture}`}
                    alt="示範圖片"
                    fill // 讓圖片填滿容器
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    priority
                  />
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
