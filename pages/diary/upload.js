import React, { useState, useEffect, useCallback } from 'react';
import styles from './upload.module.css';
import ModalUpload from '@/components/karen/modal-upload';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import ButtonFG from '@/components/buttons/btn-fill-gray2';
import { FaCloudUploadAlt } from 'react-icons/fa';
import IconFillPrimaryXL from '@/components/icons/icon-fill-primary-xl';
import Progressbar from '@/components/karen/progressbar';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { API_SERVER } from '@/configs/api-path';

export default function Upload({
  onConfirm = () => {},
  onCancel = () => {},
  initialFiles = [], //初始上傳的檔案
  isEdit = false, // 新增編輯模式標記
}) {
  //狀態：儲存上傳的檔案
  const [uploadedFiles, setUploadedFiles] = useState([]);
  //狀態：主圖的設置
  const [mainImg, setMainImg] = useState(0);

  // 初始化檔案
  useEffect(() => {
    if (initialFiles.length > 0) {
      const processedFiles = initialFiles.map((img) => {
        if (img.file) {
          // 處理新上傳的檔案
          return {
            file: img.file,
            preview: URL.createObjectURL(img.file), // 本地檔案用 createObjectURL
            name: img.file.name,
            size: (img.file.size / 1024).toFixed(0) + 'KB',
            progress: 100,
            isMain: img.isMain,
          };
        } else {
          // 處理既有的檔案
          return {
            file: null,
            preview: img.preview,
            name: img.path?.split('/').pop() || 'image',
            size: '0KB',
            progress: 100,
            isMain: img.isMain,
            isExisting: true,
            path: img.path,
          };
        }
      });

      setUploadedFiles(processedFiles);
      const mainIndex = processedFiles.findIndex((img) => img.isMain);
      setMainImg(mainIndex !== -1 ? mainIndex : 0);
    }
  }, [initialFiles]);

  //處理事件：拖曳經過，防止瀏覽器的默認拖放行為
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  //處理事件：檔案的拖放
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  //處理事件：一般檔案的上傳
  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  //處理事件：檔案限制
  const handleFiles = useCallback((files) => {
    setUploadedFiles((prevFiles) => {
      const totalFiles = files.length + prevFiles.length;

      if (totalFiles > 3) {
        toast.error('最多只能上傳3張圖片');
        return prevFiles;
      }

      const newFiles = files
        .filter((file) => {
          // 檢查檔案類型是否為 jpg 或 png
          const isValidType = ['image/jpeg', 'image/png'].includes(file.type);
          // 檢查檔案大小是否小於等於 5MB
          const isValidSize = file.size <= 5 * 1024 * 1024;

          if (!isValidType) {
            toast.error('檔案類型不支援,請上傳jpg或png檔案');
            return false;
          }

          if (!isValidSize) {
            toast.error('檔案大小不能超過5MB');
            return false;
          }

          return true;
        })
        .map((file) => {
          return {
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: (file.size / 1024).toFixed(0) + 'KB',
            progress: 100,
          };
        });

      if (newFiles.length > 0) {
        toast.success('照片上傳成功');
        const updatedFiles = [...prevFiles, ...newFiles];
        // 如果是第一次上傳，設置為主圖
        if (prevFiles.length === 0) {
          setMainImg(0);
        }
        return updatedFiles;
      }
      return prevFiles;
    });
  }, []);

  const handleDelete = useCallback(
    (index) => {
      setUploadedFiles((prev) => {
        const newFiles = prev.filter((_, i) => i !== index);
        // 如果刪除的是主圖，且還有其他圖片，將第一張設為主圖
        if (index === mainImg) {
          setMainImg(newFiles.length > 0 ? 0 : -1);
        }
        // 如果刪除的圖片在主圖之前，需要調整主圖索引
        else if (index < mainImg) {
          setMainImg(mainImg - 1);
        }
        return newFiles;
      });
    },
    [mainImg]
  ); // 只有當 mainImg 改變時才需要重新創建函數

  //處理事件：主圖切換
  const toggleMainImg = (index) => {
    setMainImg(index);
  };

  //處理事件：確認上傳處理
  const handleConfirm = () => {
    if (uploadedFiles.length === 0) {
      toast.error('請上傳至少一張照片');
      return;
    }
    console.log('準備確認的檔案:', uploadedFiles);

    const processedFiles = uploadedFiles.map((file, index) => {
      const isMainImage = index === mainImg;
      if (file.isExisting) {
        return {
          file: null,
          preview: file.preview, // 保持原有的預覽路徑
          path: file.path, // 保持原有的路徑
          isMain: isMainImage,
          is_main: isMainImage ? 1 : 0,
        };
      } else {
        return {
          file: file.file,
          preview: file.preview, // 本地檔案的預覽路徑
          path: null, // 新檔案還沒有伺服器路徑
          isMain: isMainImage,
          is_main: isMainImage ? 1 : 0,
        };
      }
    });

    onConfirm(processedFiles);
  };

  //清理預覽的URL - 只在檔案清除時清理
  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => {
        if (file.preview && file.preview.startsWith('blob:')) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []); // 空依賴陣列，只在卸載時執行

  return (
    <ModalUpload closeModal={onCancel}>
      <div className={styles.functionContainer}>
        <ButtonFG onClick={onCancel}>取消</ButtonFG>
        <ButtonFP2 onClick={handleConfirm}>確認</ButtonFP2>
      </div>
      <div className={styles.container}>
        <div
          className={styles.imgContainer}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="region"
          aria-label="圖片上傳區域"
        >
          <input
            type="file"
            id="fileInput"
            multiple
            accept=".jpg,.jpeg,.png"
            onChange={handleFileInput}
            style={{ display: 'none' }}
            aria-label="選擇圖片上傳"
          />
          <label htmlFor="fileInput" className={styles.labelContainer}>
            <FaCloudUploadAlt />
            <p>點擊或拖曳照片至此</p>
            <p className={styles.uploadHint}>
              {isEdit
                ? '您可以新增、刪除或更改圖片（支援 jpg、png 格式，單張不超過 5MB，最多3張）'
                : '支援 jpg、png 格式，單張不超過 5MB，最多3張'}
            </p>
          </label>
        </div>

        <div className={styles.bodyContainer}>
          {uploadedFiles.map((file, index) => (
            <div key={index} className={`${styles['preViewContainer']}`}>
              <div className={`${styles['section1']}`}>
                {/* 放照片的位置 */}
                <div className={`${styles['preImgContainer']}`}>
                  <img src={file.preview} alt={`預覽圖片：${file.name}`} />
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        console.log('點擊編輯');
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`編輯圖片 ${file.name}`}
                  />
                  <IconFillPrimaryXL
                    type="delete"
                    onClick={() => handleDelete(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleDelete(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`刪除圖片 ${file.name}`}
                  />
                </div>
                <div
                  className={`${styles['toggle']}`}
                  onClick={() => toggleMainImg(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleMainImg(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={mainImg === index}
                  aria-label={`設為首圖 ${file.name}`}
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
