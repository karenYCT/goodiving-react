import React from 'react';
import '@/styles/globals.css';
import { AuthContextProvider } from '@/context/auth-context';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <AuthContextProvider >
      {getLayout(<Component {...pageProps} />)}
    </AuthContextProvider>
  )
}
