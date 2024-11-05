import React, { useState } from 'react';
import styles from '@/components/fanny/modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCamera } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/fanny/btn-fill-primary';


export default function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

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

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePublish = () => {
    if (!title.trim()) {
      alert('請輸入標題');
      return;
    }
    if (!category) {
      alert('請選擇分類');
      return;
    }
    if (!content.trim()) {
      alert('請輸入內文');
      return;
    }

    const articleData = {
      title: title.trim(),
      category,
      content: content.trim(),
      image
    };
    
    console.log('發布文章:', articleData);
    // 這裡可以加入發布 API 呼叫
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={handleClose}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>

        <div className={styles.modalContent}>
          {/* 上傳照片區域 */}
          <div className={styles.uploadSection}>
            {image ? (
              <div className={styles.imagePreview}>
                <img src={image} alt="Preview" />
                <button 
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

          {/* 發布按鈕 */}
          <div className={styles.buttonSection}>
            <Button 
              className={styles.publishButton}
              onClick={handlePublish}
            >
              發布
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}