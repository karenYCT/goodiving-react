import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import styles from './imageGallery.module.css';

const ImageGallery = ({ lessonData, apiServer }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 從課程數據創建圖片數組，確保 key 存在且有值
  const images = lessonData
    ? [
        { id: 1, key: 'lesson_img_a' },
        { id: 2, key: 'lesson_img_b' },
        { id: 3, key: 'lesson_img_c' },
        { id: 4, key: 'lesson_img_d' },
        { id: 5, key: 'lesson_img_e' },
      ].filter((img) => lessonData[img.key] && lessonData[img.key].length > 0)
    : [];

  // 自動輪播
  useEffect(() => {
    if (!lessonData || images.length <= 1 || isModalOpen) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(timer);
  }, [images.length, lessonData, isModalOpen]);

  const nextSlide = useCallback(
    (isModal = false) => {
      const setIndex = isModal ? setModalIndex : setCurrentIndex;
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    },
    [images.length]
  );

  const prevSlide = useCallback(
    (isModal = false) => {
      const setIndex = isModal ? setModalIndex : setCurrentIndex;
      setIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    },
    [images.length]
  );

  const handleImageClick = (index) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  // 鍵盤導航
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          prevSlide(true);
          break;
        case 'ArrowRight':
          nextSlide(true);
          break;
        case 'Escape':
          setIsModalOpen(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, nextSlide, prevSlide]);

  // 檢查 lessonData 是否存在且有效
  if (!lessonData) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  // 如果沒有有效的圖片，顯示預設狀態
  if (images.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>No images available</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Gallery */}
      <div className={styles.galleryContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={`${apiServer}/round/${
              lessonData[images[currentIndex].key]
            }.jpg`}
            alt={`lesson-image-${currentIndex + 1}`}
            width={800}
            height={800}
            className={styles.image}
            onClick={() => handleImageClick(currentIndex)}
          />
        </div>

        {/* Navigation Buttons - 只在有多張圖片時顯示 */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => prevSlide(false)}
              className={`${styles.navButton} ${styles.prevButton}`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => nextSlide(false)}
              className={`${styles.navButton} ${styles.nextButton}`}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Dots Indicator - 只在有多張圖片時顯示 */}
        {images.length > 1 && (
          <div className={styles.dotsContainer}>
            {images.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.dotActive : ''
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button
              onClick={() => setIsModalOpen(false)}
              className={styles.closeButton}
            >
              <X size={24} />
            </button>
            {/* Modal Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => prevSlide(true)}
                  className={`${styles.modalNavButton} ${styles.prevButton}`}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => nextSlide(true)}
                  className={`${styles.modalNavButton} ${styles.nextButton}`}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            <Image
              src={`${apiServer}/round/${
                lessonData[images[modalIndex].key]
              }.jpg`}
              alt={`lesson-image-${modalIndex + 1}`}
              width={800}
              height={800}
              className={styles.modalImage}
            />
            {/* Modal Dots Indicator */}
            {images.length > 1 && (
              <div className={styles.modalDotsContainer}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.modalDot} ${
                      index === modalIndex ? styles.modalDotActive : ''
                    }`}
                    onClick={() => setModalIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
