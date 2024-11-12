import React, { useState } from 'react';
import styles from '@/components/fanny/modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCamera } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/fanny/btn-fill-primary';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';

export default function PostModal({ sendName, sendContent, sendCategory }) {
  const router = useRouter();
  const { getAuthHeader } = useAuth();

  // 使用 useState 鉤子創建標題、內容和分類的狀態
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 1, label2: 'all', label: '全部' },
    { value: 2, label2: 'instructor', label: '潛水教練' },
    { value: 3, label2: 'tank', label: '氣瓶' },
    { value: 4, label2: 'equipment', label: '裝備' },
    { value: 5, label2: 'course', label: '課程' },
    { value: 6, label2: 'diving-spot', label: '潛點' },
  ];

  // 處理發布文章
  const handlePublish = async (e) => {
    e.preventDefault();

    try {
      // 傳遞資料給父組件
      if (typeof sendTitle === 'function') {
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
