import React, { useState, useEffect } from 'react'
import styles from './upload.module.css';
import ModalUpload from '@/components/karen/modal-upload';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import ButtonFG from '@/components/buttons/btn-fill-gray2';
import UploadImg from '@/components/karen/uploadimg';

export default function Upload(props) {
  return (
    <ModalUpload >
      <div className={styles.functionContainer}>
        <ButtonFG >取消</ButtonFG>
        <ButtonFP2 >確認</ButtonFP2>
      </div>
      <div className={styles.bodyContainer}>
        <UploadImg />
        <UploadImg />
        <UploadImg />
      </div>
    </ModalUpload>
  )
}
