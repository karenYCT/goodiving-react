import React, { useState, useEffect } from 'react';
import styles from './btn-online.module.css';
import { FaCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function BtnOnline({ name, url, isOnline }) {
  const router = useRouter();
  const onClick = () => {
    router.push(`./chat?receiverId=${url}`);
  };
  return (
    <>
      <div role="button" className={styles['btn']} onClick={onClick}>
        <FaCircle
          className={isOnline ? styles['circle-light'] : styles['circle-dark']}
        />
        <span>{name}</span>
      </div>
    </>
  );
}
