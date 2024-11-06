import React, { useState, useEffect } from 'react';
import Layout from '@/components/fanny/layout';
import { useAuth } from '@/context/auth-context';

export default function QuickLogin() {
  const { auth, login, logout } = useAuth();

  console.log('看一下登入的狀態：', auth.user_id);
  console.log('看一下登入的狀態：', JSON.stringify(auth, null, 4));

  return (
    <Layout>
      <div>quick-login</div>
      <button
        onClick={(e) => {
          login('user208@example.com', 'zz123456');
        }}
      >
        登入 user208@example.com
      </button>
      <button onClick={logout}>登出</button>
      <div>你的id是 {auth.user_id}</div>
    </Layout>
  );
}
