import React, { useState, useEffect } from 'react';
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

  // 狀態
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 錯誤訊息狀態
  const [nameError, setNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [contentError, setContentError] = useState('');

  // 分類選項
  const categories = [
    { value: 1, label: '全部' },
    { value: 2, label: '潛水教練' },
    { value: 3, label: '氣瓶' },
    { value: 4, label: '裝備' },
    { value: 5, label: '課程' },
    { value: 6, label: '潛點' },
  ];

  // 處理圖片上傳
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxImages = 3;

    if (images.length + files.length > maxImages) {
      toast.error(`最多只能上傳 ${maxImages} 張圖片`);
      return;
    }

    const validFiles = files.filter((file) => {
      if (file.size > 3 * 1024 * 1024) {
        toast.error('圖片大小不能超過 5MB');
        return false;
      }
      return true;
    });

    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  // 清理圖片預覽 URL
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  // 移除圖片
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 處理表單提交
  const handlePublish = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 清空錯誤訊息
    setNameError('');
    setCategoryError('');
    setContentError('');

    // 表單驗證
    let hasError = false;

    if (!name.trim()) {
      setNameError('請輸入標題');
      hasError = true;
    }
    if (!category) {
      setCategoryError('請選擇分類');
      hasError = true;
    }
    if (!content.trim()) {
      setContentError('請輸入內文');
      hasError = true;
    }

    if (hasError) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/blog`, {
        method: 'POST',
        headers: getAuthHeader ? await getAuthHeader() : {},
        body: JSON.stringify({
          title: name.trim(),
          content: content.trim(),
          category,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '發布失敗');
      }

      const data = await response.json();

      if (images.length > 0) {
        const imageFormData = new FormData();
        images.forEach((img) => imageFormData.append('images', img.file));

        const uploadResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_PATH}/api/blog/${data.articleId}/upload`,
          { method: 'POST', body: imageFormData }
        );

        if (!uploadResponse.ok) {
          throw new Error('圖片上傳失敗');
        }
      }

      toast.success('文章發布成功！');
      setName('');
      setContent('');
      setCategory('');
      setImages([]);
      router.push('/blog');
    } catch (error) {
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
        <button type="button" className={styles.closeButton} onClick={handleBack}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>

        <form onSubmit={handlePublish} className={styles.modalContent}>
          {/* 標題 */}
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
            />
            {nameError && <div className={styles.errorText}>{nameError}</div>}
          </div>

          {/* 分類 */}
          <div className={styles.inputGroup}>
            <label htmlFor="category">文章分類</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.select}
              disabled={isSubmitting}
            >
              <option value="">選擇文章分類</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {categoryError && <div className={styles.errorText}>{categoryError}</div>}
          </div>

          {/* 內文 */}
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
            />
            {contentError && <div className={styles.errorText}>{contentError}</div>}
          </div>

          {/* 圖片上傳 */}
          <div className={styles.uploadSection}>
            <div className={styles.imageGrid}>
              {images.map((img, index) => (
                <div key={index} className={styles.imagePreview}>
                  <img src={img.preview} alt={`Preview ${index + 1}`} />
                  <button type="button" onClick={() => handleRemoveImage(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className={styles.uploadLabel}>
                  <FontAwesomeIcon icon={faCamera} />
                  <span>上傳相片（最多5張）</span>
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

          {/* 按鈕 */}
          <div className={styles.buttonSection}>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '發布中...' : '發布'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
