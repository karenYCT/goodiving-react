import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import layoutStyles from '@/components/layouts/layout.module.css';
import styles from './index.module.css';

export default function Lesson(props) {
  return (
    <>
      <Layout>
        <LeftSide>
          <h1>Lesson</h1>
        </LeftSide>
        <div className={layoutStyles.main}>
          <h1>Lesson</h1>
          <h1>Lesson</h1>
        </div>
      </Layout>
    </>
  );
}
