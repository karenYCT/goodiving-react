import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import RightSide from '@/components/layouts/rightSide';
import layoutStyles from '@/components/layouts/layout.module.css';
import styles from './[pid].module.css';

export default function Lesson(props) {
  return (
    <>
      <Layout>
        <div className={layoutStyles.main}>
          <h1>Lesson</h1>
          <h1>Lesson</h1>
        </div>

        <RightSide>
          <h1>Lesson</h1>
        </RightSide>
      </Layout>
    </>
  );
}
