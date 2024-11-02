import { useState, useRef, useEffect } from 'react';
import {
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoChevronUp,
  IoChevronDown,
} from 'react-icons/io5';
import styles from './product-image-viewer.module.css';
import Image from 'next/image';

export default function ProductImageViewer({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [thumbnailScroll, setThumbnailScroll] = useState(0);
  const [showThumbnailArrows, setShowThumbnailArrows] = useState(false);
  const zoomedImageRef = useRef(null);
  const thumbnailContainerRef = useRef(null);
  const thumbnailScrollRef = useRef(null);

  useEffect(() => {
    if (thumbnailScrollRef.current && thumbnailContainerRef.current) {
      const showArrows =
        thumbnailScrollRef.current.offsetHeight >
        thumbnailContainerRef.current.offsetHeight;
      setShowThumbnailArrows(showArrows);
    }
  }, [images]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsZoomed(false);
      setPosition({ x: 0, y: 0 });
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleModalClick = () => {
    if (!isZoomed) {
      setIsZoomed(true);
    }
  };

  const handleMouseDown = (e) => {
    if (isZoomed) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomedImageRef.current) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // 計算可拖動範圍
      const image = zoomedImageRef.current;
      const containerWidth = image.parentElement.offsetWidth;
      const containerHeight = image.parentElement.offsetHeight;
      const imageWidth = image.offsetWidth * 3; // 3倍放大
      const imageHeight = image.offsetHeight * 3;

      const maxX = (imageWidth - containerWidth) / 2;
      const maxY = (imageHeight - containerHeight) / 2;

      setPosition({
        x: Math.max(Math.min(newX, maxX), -maxX),
        y: Math.max(Math.min(newY, maxY), -maxY),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleThumbnailScroll = (direction) => {
    const scrollAmount = 85; // 縮圖高度 + gap
    const container = thumbnailContainerRef.current;
    const scroll = thumbnailScrollRef.current;
    const maxScroll = scroll.offsetHeight - container.offsetHeight;

    if (direction === 'up') {
      setThumbnailScroll((prev) => Math.min(0, prev + scrollAmount));
    } else {
      setThumbnailScroll((prev) => Math.max(-maxScroll, prev - scrollAmount));
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return (
    <div className={styles.container}>
      <div className={styles.thumbnailContainer} ref={thumbnailContainerRef}>
        {showThumbnailArrows && (
          <div
            className={`${styles.thumbnailArrow} ${styles.thumbnailArrowUp}`}
            onClick={() => handleThumbnailScroll('up')}
            role="presentation"
          >
            <IoChevronUp size={16} />
          </div>
        )}

        <div
          className={styles.thumbnailScroll}
          ref={thumbnailScrollRef}
          style={{ transform: `translateY(${thumbnailScroll}px)` }}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              className={`${styles.thumbnail} ${
                currentIndex === index ? styles.thumbnailActive : ''
              }`}
              onClick={() => handleThumbnailClick(index)}
              role="presentation"
              width={75}
              height={75}
            />
          ))}
        </div>

        {showThumbnailArrows && (
          <div
            className={`${styles.thumbnailArrow} ${styles.thumbnailArrowDown}`}
            onClick={() => handleThumbnailScroll('down')}
            role="presentation"
          >
            <IoChevronDown size={16} />
          </div>
        )}
      </div>

      <div
        className={styles.mainImageContainer}
        onClick={() => setShowModal(true)}
        role="presentation"
      >
        <Image
          src={images[currentIndex]}
          alt="Product main"
          className={styles.mainImage}
          width={600}
          height={675}
        />

        <div className={styles.arrows}>
          <IoChevronBack
            size={36}
            className={styles.arrow}
            onClick={handlePrev}
          />
          <IoChevronForward
            size={36}
            className={styles.arrow}
            onClick={handleNext}
          />
        </div>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <button
            className={styles.closeButton}
            onClick={() => setShowModal(false)}
          >
            <IoClose size={32} />
          </button>

          {isZoomed ? (
            <div className={styles.zoomedContainer}>
              <Image
                ref={zoomedImageRef}
                src={images[currentIndex]}
                alt="Product zoomed"
                className={styles.modalImageZoomed}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(3)`, // 改為3倍放大
                  transition: isDragging ? 'none' : 'transform 0.3s',
                }}
                onMouseDown={handleMouseDown}
                draggable="false"
                role="presentation"
                width={1000}
                height={1000}
              />
            </div>
          ) : (
            <Image
              src={images[currentIndex]}
              alt="Product modal"
              className={styles.modalImage}
              onClick={handleModalClick}
              role="presentation"
              width={600}
              height={675}
            />
          )}
        </div>
      )}
    </div>
  );
}
