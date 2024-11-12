import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AddDiaryPage() {
  const router = useRouter();
  
  useEffect(() => {
    // 重定向到主頁面並觸發表單開啟
    router.replace('/diary?page=add');
  }, []);

  return null;
}