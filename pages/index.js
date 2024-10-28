import Layout from '@/components/layouts/layout';
import React, { useState, useEffect } from 'react';
import styles from '@/components/layouts/layout.module.css'


export default function Home({ children }) {

  return (
    <>
      <Layout>
        <h1>這裡是首頁</h1>
      </Layout>
    </>
  );
}
