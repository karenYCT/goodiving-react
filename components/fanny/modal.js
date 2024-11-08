import React, { use, useCallback, useState } from 'react';
import styles from '@/components/fanny/modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCamera } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/fanny/btn-fill-primary';
import { useRouter } from 'next/router';

export default function Modal({sendContent}) {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [imageFile,setImageFile] = useState(null); //存圖片
  const [isSubmitting , setIsSubmitting] = useState(false); //發布狀態

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const handleChange = (e) => 
    setContent(e.target.value);

const handleSubmit = useCallback
(async () => {
  if (content && content.trim() !== '') {
    await sendContent(content);
    setContent('');
  }
}, [content , sendContent]);

 
  const categories = [
    { value: 'all', label: '全部' },
    { value: 'instructor', label: '潛水教練' },
    { value: 'tank', label: '氣瓶' },
    { value: 'equipment', label: '裝備' },
    { value: 'course', label: '課程' },
    { value: 'diving-spot', label: '潛點' }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 返回上一頁
  const handleBack = () => {
    router.back(); // 使用 router.back() 返回上一頁
  };

  const handlePublish = (e) => {
    e.preventDefault();

    // 表單驗證
    if (!title || title.trim() === '') {
      window.alert('請輸入標題');
      return;
    }
    if (!category) {
      window.alert('請選擇分類');
      return;
    }
    if (!content || content.trim() === '') {
      window.alert('請輸入內文');
      return;
    }

    try {
      const articleData = {
        title: title.trim(),
        category,
        content: content.trim(),
        image
      };
      
      console.log('發布文章:', articleData);
      // 這裡加入發布 API 呼叫
      
      // 發布成功後返回上一頁
      router.back();
    } catch (error) {
      console.error('發布失敗:', error);
      window.alert('發布失敗，請稍後再試');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        {/* 關閉按鈕現在使用 handleBack */}
        <button 
          type="button"
          className={styles.closeButton} 
          onClick={handleBack}
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>

        <form onSubmit={handlePublish} className={styles.modalContent}>
          {/* 上傳照片區域 */}
          <div className={styles.uploadSection}>
            {image ? (
              <div className={styles.imagePreview}>
                <img src={image} alt="Preview" />
                <button 
                  type="button"
                  className={styles.removeImage}
                  onClick={() => setImage(null)}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </div>
            ) : (
              <label className={styles.uploadLabel}>
                <div className={styles.uploadIcon}>
                  <FontAwesomeIcon icon={faCamera} />
                </div>
                <span>上傳相片</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles.hiddenInput}
                />
              </label>
            )}
          </div>

          {/* 表單區域 */}
          <div className={styles.formSection}>
            {/* 標題輸入 */}
            <div className={styles.inputGroup}>
              <label>標題</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="輸入文章標題（字數上限30字）"
                maxLength={30}
                className={styles.textInput}
              />
            </div>

            {/* 分類選擇 */}
            <div className={styles.inputGroup}>
              <label>文章分類</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.select}
              >
                <option value="">選擇文章分類</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 內文輸入 */}
            <div className={styles.inputGroup}>
              <label>內文</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="輸入文章內容（字數上限600字）"
                maxLength={600}
                className={styles.textarea}
              />
            </div>
          </div>

          {/* 按鈕區域 */}
          <div className={styles.buttonSection}>
            {/* 取消按鈕 */}
            {/* <Button 
              type="button"
              onClick={handleBack}
              className={styles.cancelButton}
            >
              取消
            </Button> */}
            {/* 發布按鈕 */}
            <Button 
              type="submit"
              className={styles.publishButton}
            >
              發布
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}