import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { API_SERVER } from '@/configs/api-path.js';
import DiaryPage from '@/pages/diary/diarypage';

export default function DiaryDetail() {
  const router = useRouter();
  const { log_id } = router.query;
  const [diaryData, setDiaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDiaryData = async () => {
      if (!log_id) return;
      
      try {
        setIsLoading(true);
        // 獲取基本資料
        const response = await fetch(`${API_SERVER}/diary/${log_id}`);
        const data = await response.json();

        // 獲取圖片資料
        const imgResponse = await fetch(`${API_SERVER}/diary/images/${log_id}`);
        const imgData = await imgResponse.json();

        setDiaryData({
          ...data,
          images: imgData,
        });
      } catch (error) {
        console.error('獲取日誌資料錯誤:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiaryData();
  }, [log_id]);

  const handleClose = () => {
    router.push('/diary');
  };

  const handleEdit = () => {
    router.push(`/diary/edit/${log_id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!diaryData) {
    return <div>找不到日誌</div>;
  }

  return (
    <DiaryPage 
      diaryData={diaryData} 
      onClose={handleClose}
      onEdit={handleEdit}
    />
  );
}