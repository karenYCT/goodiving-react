import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { API_SERVER } from '@/configs/api-path';
import EditForm from '@/pages/diary/editform';

export default function DiaryEdit() {
  const router = useRouter();
  const { log_id } = router.query;
  const [editData, setEditData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDiaryData = async () => {
      if (!log_id) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`${API_SERVER}/diary/${log_id}`);
        const data = await response.json();

        const imgResponse = await fetch(`${API_SERVER}/diary/images/${log_id}`);
        const imgData = await imgResponse.json();

        setEditData({
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

  const handleUpdateSuccess = () => {
    router.push('/diary');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!editData) {
    return <div>找不到日誌</div>;
  }

  return (
    <EditForm
      logData={editData}
      onClose={handleClose}
      onUpdateSuccess={handleUpdateSuccess}
    />
  );
}



