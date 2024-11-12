import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './uploadAvatarForm.module.css';
import BtnPrimary from '@/components/buttons/btn-fill-primary';
import BtnLight from '@/components/buttons/btn-fill-light';
import { UPLOAD_FILE, AUTH_UPLOAD_AVATAR } from '@/configs/api-path';
import { useUser } from '@/context/user-context';
import { MdUpload } from 'react-icons/md';
import Modal from './modal';

export default function UploadAvatarForm({
  isAvatarModalOpen = false,
  closeModal = () => {},
}) {
  const { userData } = useUser(); // 用戶資料
  const [avatar, setAvatar] = useState(userData.profile_picture);
  const [preview, setPreview] = useState(null); // 預覽圖片的 URL

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl); //清除舊的預覽圖 URL，以防止記憶體洩漏
    }
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
      setAvatar(result.filename);
      setPreview(null); // 清除預覽
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
            enctype="multipart/form-data"
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
                    src={preview || `${UPLOAD_FILE}${avatar}`} // 圖片的路徑
                    alt="示範圖片"
                    width={300} // 圖片寬度（px）
                    height={300} // 圖片高度（px）
                    layout="responsive" // 讓圖片自適應容器
                    objectFit="cover" // 保持圖片比例
                  />
                </div>
              </div>
            </div>
            <div className={styles['btn-area']}>
              <BtnLight>取消</BtnLight>
              <BtnPrimary type="submit">上傳頭貼</BtnPrimary>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
