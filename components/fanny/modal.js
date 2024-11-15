import React, { useState } from 'react';
import styles from '@/components/fanny/modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCamera, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/fanny/btn-fill-primary';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';


export default function PostModal({ sendName, sendContent, sendCategory }) {
  const router = useRouter();
  const { getAuthHeader } = useAuth();

  // 使用 useState 鉤子創建標題、內容和分類的狀態
  // 使用 useState 鉤子創建標題、內容和分類的狀態
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);

  const categories = [
    { value: 1, label2: 'all', label: '全部' },
    { value: 2, label2: 'instructor', label: '潛水教練' },
    { value: 3, label2: 'tank', label: '氣瓶' },
    { value: 4, label2: 'equipment', label: '裝備' },
    { value: 5, label2: 'course', label: '課程' },
    { value: 6, label2: 'diving-spot', label: '潛點' },
  ];

  // 處理多圖上傳
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxImages = 5; // 最多上傳5張圖片
    
    if (images.length + files.length > maxImages) {
      toast.error(`最多只能上傳${maxImages}張圖片`);
      return;
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB 限制
        toast.error('圖片大小不能超過 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // 移除特定圖片
  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // 處理發布文章
  const handlePublish = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 傳遞資料給父組件
      if (typeof sendName === 'function') {
        await sendName(name);
      }
      if (typeof sendContent === 'function') {
        await sendContent(content);
      }
      if (typeof sendCategory === 'function') {
        await sendCategory(category);
      }

      // 表單驗證
      if (!name.trim()) {
        throw new Error('請輸入標題');
      }
      if (!category) {
        throw new Error('請選擇分類');
      }
      if (!content.trim()) {
        throw new Error('請輸入內文');
      }

      // 重置表單欄位
      setName('');
      setContent('');
      setCategory('');

      // 發送請求
      const formData = new FormData();
      formData.append('title', name.trim());
      formData.append('content', content.trim());
      formData.append('category', category);
      
      // 使用 for...of 循環
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        // 將 base64 轉換回檔案
        const imageFile = await fetch(image)
          .then(res => res.blob())
          .then(blob => new File([blob], `image${i}.jpg`, { type: 'image/jpeg' }));
        
        formData.append('images', imageFile);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/api/blog`,
        {
          method: 'POST',
          headers: await getAuthHeader(),
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '發布失敗');
      }

      // 發布成功
      const data = await response.json();
      console.log('發布成功:', data);

      // 顯示成功的吐司訊息
      toast.success('文章發布成功！');

      // 重定向到文章列表頁
      router.push('/blog');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 返回上一頁
  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleBack}
          aria-label="關閉"
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>

        {/* 上傳照片區域 */}
        <div className={styles.uploadSection}>
          <div className={styles.imageGrid}>
            {images.map((image, index) => (
              <div key={index} className={styles.imagePreview}>
                <img src={image} alt={`Preview ${index + 1}`} />
                <button 
                  type="button"
                  className={styles.removeImage}
                  onClick={() => handleRemoveImage(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
            
            {images.length < 5 && (
              <label className={styles.uploadLabel}>
                <div className={styles.uploadIcon}>
                  <FontAwesomeIcon icon={faCamera} />
                </div>
                <span>上傳相片</span>
                <span className={styles.uploadHint}>最多5張</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles.hiddenInput}
                  multiple
                />
              </label>
            )}
          </div>
        </div>

        <form onSubmit={handlePublish} className={styles.modalContent}>
          {/* 表單區域 */}
          <div className={styles.formSection}>
            {/* 標題輸入 */}
            <div className={styles.inputGroup}>
              <label htmlFor="title">標題</label>
              <input
                id="title"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="輸入文章標題（字數上限30字）"
                maxLength={30}
                className={styles.textInput}
                disabled={isSubmitting}
                required
              />
            </div>

            {/* 分類選擇 */}
            <div className={styles.inputGroup}>
              <label htmlFor="category">文章分類</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.select}
                disabled={isSubmitting}
                required
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
              <label htmlFor="content">內文</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="輸入文章內容（字數上限600字）"
                maxLength={600}
                className={styles.textarea}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          {/* 錯誤訊息 */}
          {error && <div className={styles.error}>{error}</div>}

          {/* 按鈕區域 */}
          <div className={styles.buttonSection}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={styles.publishButton}
            >
              {isSubmitting ? '發布中...' : '發布'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
