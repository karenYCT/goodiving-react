import React, { useState } from 'react';
import styles from '@/components/fanny/modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/buttons/btn-fill-primary';
import Input from '@/components/fanny/input-component';
import Dropdown from '@/components/fanny/select-rect';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState('');

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={handleClose}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: '#D3D3D3', fontSize: '24px' }}
            />
          </button>
          <div className={styles.buttonIcon3}></div>
          <div className={styles.frameParent}>
            <div className={styles.frameWrapper}>
              <div className={styles.iconiconcameraParent}>
                <div className={styles.div}>上傳相片</div>
              </div>
            </div>
            <div className={styles.form}>
              <div className={styles.parent}>
                <div className={styles.div}>標題</div>
                <Input
                  placeholder="標題"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className={styles.parent}>
                <div className={styles.div}>分類</div>
                <Dropdown />
              </div>
              <div className={styles.parent}>
                <div className={styles.div}>內文</div>
                <div className={styles.input2}>
                  <div
                    className={styles.div2}
                  >{`輸入文章內容 ( 字數上限 600 字 )`}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.buttonText}>
            <Button>發佈</Button>
          </div>
        </div>
      </div>
    </>
  );
}
