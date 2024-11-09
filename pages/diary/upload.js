import React, { useState, useEffect, useCallback } from 'react';
import styles from './upload.module.css';
import ModalUpload from '@/components/karen/modal-upload';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import ButtonFG from '@/components/buttons/btn-fill-gray2';
import { FaCloudUploadAlt } from 'react-icons/fa';
import IconFillPrimaryXL from '@/components/icons/icon-fill-primary-xl';
import Progressbar from '@/components/karen/progressbar';
import { FaToggleOff, FaToggleOn} from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { set } from 'lodash';

// 輔助函數：格式化文件大小
// const formatFileSize = (bytes) => {
//   if (bytes === 0) return '0 Bytes';
//   const k = 1024;
//   const sizes = ['Bytes', 'KB', 'MB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// };

export default function Upload({
  onComfirm = () => {}, 
  onCancel  = () => {},
}) {

  //狀態：儲存上傳的檔案
  const [uploadedFiles, setUploadedFiles] = useState([]);
  //狀態：主圖的設置
  const [mainImg, setMainImg] = useState(0);

  //處理事件：拖曳經過，防止瀏覽器的默認拖放行為
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  //處理事件：檔案的拖放
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  },[]);

  //處理事件：一般檔案的上傳
  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  }

  //處理事件：檔案限制
  const handleFiles = useCallback((files) => {
    setUploadedFiles(prevFiles =>{
      if (files.length + uploadedFiles.length > 3) {
        toast.error('最多只能上傳3張圖片');
        return;
      }
  
      const newFiles = files.filter((file) => {
        // 檢查檔案類型是否為 jpg 或 png
        const isValidType = ['image/jpeg', 'image/png'].includes(file.type);
        // 檢查檔案大小是否小於等於 5MB
        const isValidSize = file.size <= 5 * 1024 * 1024;
  
        if (!isValidType) {
          toast.error ('檔案類型不支援,請上傳jpg或png檔案');
          return false;
        }
  
        if (!isValidSize){
          toast.error ('檔案大小不能超過5MB');
          return false;
        }
        
        return true;
      }).map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: (file.size / 1024).toFixed(0) + 'KB',
        progress: 0
      }));
    
      if (newFiles.length > 0) {
        toast.success('照片上傳成功');
        return[...prevFiles, ...newFiles];
      }
      return prevFiles;
    });
  },[]);

  const handleDelete = useCallback((index) => {
    setUploadedFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      if (index === mainImg && newFiles.length > 0) {
        setMainImg(0);
      }
      return newFiles;
    });
  }, [mainImg]); // 只有當 mainImg 改變時才需要重新創建函數

  //處理事件：主圖切換
  const toggleMainImg = (index) => {
    setMainImg(index);
  }

  //處理事件：確認上傳處理
  const handleConfirm = () => {
    onComfirm(uploadedFiles.map(file=>({
      file: file.file,
      isMain: mainImg === uploadedFiles.indexOf(file),
    })));
  }

  return (
    <ModalUpload>
      <div className={styles.functionContainer}>
        <ButtonFG onClick={onCancel}>取消</ButtonFG>
        <ButtonFP2 onClick={handleConfirm}>確認</ButtonFP2>
      </div>
      <div className={styles.container}>
        <div 
        className={styles.imgContainer}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        >
          <input
            type="file"
            id='fileInput'
            multiple
            accept=".jpg,.jpeg,.png"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
          <label 
          htmlFor='fileInput' 
          className={styles.labelContainer}
          >
            <FaCloudUploadAlt />
            <p>點擊或拖曳照片至此</p>
            <p className={styles.uploadHint}>
              支援 jpg、png 格式，單張不超過 5MB，最多3張
            </p>
          </label>
        </div>

        <div className={styles.bodyContainer}>
        {uploadedFiles.map((file, index) => (
          <div key={index} className={`${styles['preViewContainer']}`}>
            <div className={`${styles['section1']}`}>
              {/* 放照片的位置 */}
              <div className={`${styles['preImgContainer']}`}>
                <img src={file.preview} alt={file.name} />
              </div>

              <div className={`${styles['itemContainer']}`}>
                {/* 放文字的位置 */}
                <h6>{file.name}</h6>
                <p>{file.size}</p>
                <Progressbar progress={file.progress} />
              </div>
            </div>

            {/* 放功能的位置 */}
            <div className={`${styles['rightContainer']}`}>
              <div className={`${styles['editContainer']}`}>
                <IconFillPrimaryXL
                  type="magicedit"
                  onClick={() => console.log('點擊編輯')}
                />
                <IconFillPrimaryXL
                  type="delete"
                  onClick={() => handleDelete(index)} 
                />
              </div>
              <div 
              className={`${styles['toggle']}`} 
              onClick={() => toggleMainImg(index)}
              >
                <h6>首圖</h6>
                {mainImg === index ? <FaToggleOn /> : <FaToggleOff />}
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </ModalUpload>
  );
}
