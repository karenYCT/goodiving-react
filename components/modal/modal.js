import React, { useState } from 'react';
import modal from '@/components/modal/modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  
  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={modal.container}>
        <div className={modal.modal}>
          <button className={modal.closeButton} onClick={handleClose}>
            <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#D3D3D3", fontSize: '24px' }} />
          </button>
          <h4>課程評價</h4>
        </div>
      </div>
    </>
  );
}
