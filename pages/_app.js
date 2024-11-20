import React from 'react';
import '@/styles/globals.css';
import { AuthContextProvider } from '@/context/auth-context';
import { UserContextProvider } from '@/context/user-context';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon-new.ico" />
        <title>goodiving</title>
      </Head>

      <AuthContextProvider>
        <UserContextProvider>
          {getLayout(<Component {...pageProps} />)}
          <Toaster
            toastOptions={{
              success: {
                style: {
                  border: '2px solid #023e8a',
                  padding: '16px',
                  color: '#023e8a',
                  backgroundColor: '#fff',
                },
                iconTheme: {
                  primary: '#023e8a',
                  secondary: '#fff',
                },
              },
              error: {
                style: {
                  border: '2px solid #023e8a',
                  padding: '16px',
                  color: '#023e8a',
                  backgroundColor: '#fff',
                },
                iconTheme: {
                  primary: '#ff277e',
                  secondary: '#fff',
                },
              },
            }}
            containerStyle={{
              top: '120px',
              zIndex: '10001',
            }}
          />
        </UserContextProvider>
      </AuthContextProvider>
    </>
  );
}
