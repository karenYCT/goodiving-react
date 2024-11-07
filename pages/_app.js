import React, { useState } from 'react';
import '@/styles/globals.css';
import { AuthContextProvider } from '@/context/auth-context';
import { UserContextProvider } from '@/context/user-context';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthContextProvider>
      <UserContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </UserContextProvider>
    </AuthContextProvider>
  );
}
