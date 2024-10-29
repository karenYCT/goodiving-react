import React, { useState } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import Tab from '@/components/tab';
import styles from '@/components/layouts/layout.module.css';
import stylesModify from '@/styles/shirley/modify.module.css';
import Input from '@/components/shirley/input';
import { FaLine } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import BtnPrimary from '@/components/buttons/btn-fill-primary';
import BtnLight from '@/components/buttons/btn-fill-light';

export default function Point() {
  return (
    <Layout>
      <LeftSide>
        <MemberSidebar />
      </LeftSide>
      <div className={styles.main}>
        <p>123點</p>
        <p>123點</p>
        <p>123點</p>
        <p>123點</p>
        <p>123點</p>
        <p>123點</p>
        <p>123點</p>
        <p>123點</p>

        
      </div>
    </Layout>
  );
}
