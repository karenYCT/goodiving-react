import React, { useEffect } from 'react';
import { useDragScroll } from '@/hooks/usedragscroll';
import styles from './modal.module.css';
import { IoCloseCircleOutline } from 'react-icons/io5';

export default function Modal({ children, isOpen, closeModal, className }) {
  // 使用元件時，需要在父元件上寫:
  // const [isOpen, setIsOpen] = useState(false);
  // const openModal = () => setIsOpen(true);
  // const closeModal = () => setIsOpen(false);
  // <button onClick={openModal}>登入</button>
  // <Modal isOpen={isOpen} closeModal={closeModal}>
  // if (!isOpen) return null;

const dragScroll = useDragScroll();

  return (
    <>
      <div className={`${styles['overlay']} ${className}`}>
        <div className={`${styles['modal']} ${className}`}>
          <div className={`${styles['modal-header']}`}>
            <IoCloseCircleOutline
              className={styles['close-modal']}
              onClick={closeModal}
            />
          </div>
          <div
            className={`${styles['modal-content']} ${styles.dragScroll}`}
            {...dragScroll}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
