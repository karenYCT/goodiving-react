import React, { useState } from 'react';
import styles from './Modal.module.css';
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
      <div className={styles.container}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={handleClose}>
            <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#D3D3D3", fontSize: '24px' }} />
          </button>
          <div className={styles.buttonIcon3}>
          <img className={styles.iconiconcancel} alt="" src="" />
        </div>
        <div className={styles.frameParent}>
          <div className={styles.frameWrapper}>
            <div className={styles.iconiconcameraParent}>
              <img className={styles.iconiconcamera} alt="" src="Icon/Icon/camera.svg" />
              <div className={styles.div}>上傳相片</div>
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.parent}>
              <div className={styles.div}>標題</div>
              <div className={styles.input}>
                <div className={styles.div2}>{`輸入文章標題 ( 字數上限 30 字 )`}</div>
              </div>
            </div>
            <div className={styles.parent}>
              <div className={styles.div}>文章分類</div>
              <div className={styles.input1}>
                <div className={styles.div2}>選擇文章分類</div>
                <img className={styles.iconiconarrowdown} alt="" src="Icon/Icon/arrow/down.svg" />
              </div>
            </div>
            <div className={styles.parent}>
              <div className={styles.div}>內文</div>
              <div className={styles.input2}>
                <div className={styles.div2}>{`輸入文章內容 ( 字數上限 600 字 )`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonFunction}>
          <div className={styles.buttonText}>
            <div className={styles.div}>發佈</div>
          </div>
        </div>
  






        </div>
      </div>
        
    </>
  );
}
