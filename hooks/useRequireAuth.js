import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';

function useRequireAuth(redirectPath = '/', requireRedirect = true) {
  const { auth, openModal, closeModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.token) {
      openModal();
    } else {
      closeModal();
    }
  }, [
    auth.token,
    openModal,
    closeModal,
    router,
    redirectPath,
    requireRedirect,
  ]);
  return !!auth.token;
}

export default useRequireAuth;
