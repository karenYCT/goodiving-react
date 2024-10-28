import React, { useState, useEffect } from 'react';
import styles from './modal.module.css';
import { IoCloseCircleOutline } from 'react-icons/io5';

export default function Modal({ children, isOpen, closeModal }) {
  // 使用元件時，需要在父元件上寫:
  // const [isOpen, setIsOpen] = useState(false);
  // const openModal = () => setIsOpen(true);
  // const closeModal = () => setIsOpen(false);
  // <Modal isOpen={isOpen} closeModal={closeModal}>

  if (!isOpen) return null; // 如果是fslse就不渲染任何東西

  return (
    <>
      <div className={styles['overlay']}>
        <div className={styles['modal']}>
          <IoCloseCircleOutline
            className={styles['close-modal']}
            onClick={closeModal}
          />
          {children}
        </div>
      </div>
    </>
  );
}
