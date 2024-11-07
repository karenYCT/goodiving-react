import React from 'react';
import '@/styles/globals.css';
import { AuthContextProvider } from '@/context/auth-context';
import { UserContextProvider } from '@/context/user-context';
import { Toaster } from 'react-hot-toast';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthContextProvider>
      <UserContextProvider>
        {getLayout(<Component {...pageProps} />)}
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: '#dcf0fc',
              },
              iconTheme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
          containerStyle={{
            top: '120px',
          }}
        />
      </UserContextProvider>
    </AuthContextProvider>
  );
}
