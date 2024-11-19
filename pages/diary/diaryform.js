import React, { useState, useEffect } from 'react';
import { API_SERVER } from '@/configs/api-path';
import { useAuth } from '@/context/auth-context';
import { formatDateForSubmit } from '@/utils/date';
import Modallog from '@/components/karen/modal-log';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import ButtonFG from '@/components/buttons/btn-fill-gray2';
import DatePicker from '@/components/karen/date-picker';
import SelectRect from '@/components/karen/select-rect';
import InputComponent from '@/components/karen/input-component';
import Radio from '@/components/karen/input-radio';
import styles from '@/pages/diary/diaryform.module.css';

import Upload from './upload';
import PreviewCarousel from '@/components/karen/imgcarousel-preview';
import toast from 'react-hot-toast';

//下拉式地區選項
const regionData = [
  { id: 1, name: '綠島' },
  { id: 2, name: '蘭嶼' },
  { id: 3, name: '恆春' },
  { id: 4, name: '小琉球' },
  { id: 5, name: '澎湖' },
  { id: 6, name: '東北角' },
];

//能見度radio的選項
const VisiOptions = [
  { label: '極好', value: '1' },
  { label: '普通', value: '2' },
  { label: '差', value: '3' },
];

//隱私設定radio的選項
const PrivacyOptions = [
  { label: '公開', value: '1' },
  { label: '私人', value: '2' },
];

export default function DiaryForm({ onClose, onSuccess }) {
  console.log('DiaryForm 組件被渲染');
  //表單的狀態
  const { auth, getAuthHeader } = useAuth();
  const [formData, setFormData] = useState({
    date: null,
    region_id: '', // 新增，存放region ID
    region: '', // 顯示用
    site_id: '', // 新增，存放實際的site ID
    site_name: '', // 顯示用
    method_id: '', // 新增，存放實際的method ID
    method: '', // 顯示用
    max_depth: '',
    bottom_time: '',
    water_temp: '',
    visi_id: '', // 改名，對應資料庫欄位
    log_exp: '',
    is_privacy: '1',
    is_draft: '0',
    images: [],
    user_id: auth?.user_id || '',
  });

  const [siteOptions, setSiteOptions] = useState([]);
  const [methodOptions, setMethodOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //上傳照片modal狀態
  const [showUpload, setShowUpload] = useState(false);

  //下拉選單:把區域名稱map出來
  const siteRegions = regionData.map((region) => region.name);

  //依照區域名稱顯示該潛點的名稱
  const LoadSites = async (region) => {
    setIsLoading(true);
    try {
      //先找到區域的ID
      const regionId = regionData.find((r) => r.name === region)?.id;
      if (!regionId) {
        throw new Error('超出服務範圍囉！');
      }
      const respones = await fetch(`${API_SERVER}/diary/sites/${regionId}`);
      if (!respones.ok) {
        throw new Error('沒有獲取到潛點');
      }

      const data = await respones.json();
      console.log('接收到的潛點資料:', data); // 用於除錯
      setSiteOptions(data);
    } catch (error) {
      console.error('載入失敗', error);
      setSiteOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  //監聽區域邊更
  useEffect(() => {
    if (formData.region) {
      LoadSites(formData.region);
    } else {
      setSiteOptions([]);
    }
  }, [formData.region]);

  // 獲取潛水方式
  const loadDivingMethods = async () => {
    try {
      const response = await fetch(`${API_SERVER}/diary/methods`);
      if (!response.ok) {
        throw new Error('Failed to fetch diving methods');
      }
      const data = await response.json();
      setMethodOptions(data);
    } catch (error) {
      console.error('載入潛水方式失敗:', error);
      setMethodOptions([]);
    }
  };

  // 在組件載入時獲取潛水方式
  useEffect(() => {
    loadDivingMethods();
  }, []);

  useEffect(() => {
    if (!auth || !auth.token) {
      console.error('未登入或驗證token無效');
      toast.error('請先登入');
      onClose();
    }
  }, [auth, onClose]);
  //處理輸入的改變

  const handleInputChange = (name, value) => {
    console.log(`Input changed: ${name} = ${value}`); // 用於除錯

    if (name === 'region') {
      const selectedRegion = regionData.find((r) => r.name === value);
      setFormData((prev) => ({
        ...prev,
        region: value,
        region_id: selectedRegion?.id || '',
        // 清空相關聯的潛點資料
        site_id: '',
        site_name: '',
      }));
    } else if (name === 'site_name') {
      const selectedSite = siteOptions.find((site) => site.site_name === value);
      setFormData((prev) => ({
        ...prev,
        site_name: value,
        site_id: selectedSite?.site_id || '',
      }));
    } else if (name === 'method') {
      const selectedMethod = methodOptions.find((m) => m.method_name === value);
      setFormData((prev) => ({
        ...prev,
        method: value,
        method_id: selectedMethod?.method_id || '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // const uploadImages = async (images) => {
  //   if (!images || !Array.isArray(images)) {
  //     return [];
  //   }

  //   const newImages = images.filter((img) => img && img.file);
  //   if (newImages.length === 0) {
  //     return [];
  //   }

  //   const imageFormData = new FormData();
  //   newImages.forEach((img) => {
  //     if (img.file) {
  //       imageFormData.append('images', img.file);
  //     }
  //   });

  //   const headers = getAuthHeader(); // 獲取認證標頭
  //   delete headers.headers['Content-Type']; // 移除 Content-Type，讓瀏覽器自動設置

  //   try {
  //     const uploadResponse = await fetch(`${API_SERVER}/diary/upload`, {
  //       method: 'POST',
  //       headers: headers,
  //       body: imageFormData,
  //     });

  //     if (!uploadResponse.ok) {
  //       const errorData = await uploadResponse.json();
  //       throw new Error(errorData.message || '圖片上傳失敗');
  //     }

  //     const uploadResult = await uploadResponse.json();

  //     if (uploadResult.success && Array.isArray(uploadResult.files)) {
  //       return uploadResult.files.map((img, index) => ({
  //         path: img.filename,
  //         isMain: newImages[index].isMain,
  //       }));
  //     }

  //     return [];
  //   } catch (error) {
  //     console.error('圖片上傳錯誤:', error);
  //     throw error; // 將錯誤往上拋，讓呼叫方處理
  //   }
  // };

  //處理上傳照片完成
  // const handleImagesConfirm = (images) => {
  //   console.log('收到上傳的圖片了:', images);

  //   // 保存完整的圖片資訊，包括預覽URL
  //   const processedImages = images.map((img) => ({
  //     file: img.file,
  //     preview: img.preview,
  //     name: img.file.name,
  //     size: (img.file.size / 1024).toFixed(0) + 'KB',
  //     isMain: img.isMain,
  //   }));
  //   console.log('照片處理中:', processedImages);

  //   setFormData((prev) => ({
  //     ...prev,
  //     images: processedImages,
  //   }));
  //   setShowUpload(false);
  // };

  // const handleImagesConfirm = async (images) => {
  //   // 確保 images 不是 undefined 或 null
  //   if (!images || !Array.isArray(images)) {
  //     setShowUpload(false);
  //     return;
  //   }

  //   console.log('收到上傳的圖片了:', images);

  //   try {
  //     // 上傳圖片
  //     const finalImages = await uploadImages(images);

  //     // 保存完整的圖片資訊，包括預覽URL
  //     const processedImages = images
  //       .map((img, index) => ({
  //         file: img?.file || null,
  //         preview: img?.preview || null,
  //         name: img?.file?.name || '',
  //         size: img?.file ? (img.file.size / 1024).toFixed(0) + 'KB' : '0KB',
  //         isMain: img?.isMain || false,
  //         path: finalImages[index]?.path || null,
  //       }))
  //       .filter((img) => img.file || img.path); // 過濾掉無效的圖片

  //     console.log('照片處理中:', processedImages);

  //     setFormData((prev) => ({
  //       ...prev,
  //       images: processedImages,
  //     }));

  //     setShowUpload(false);
  //   } catch (error) {
  //     console.error('處理圖片時發生錯誤:', error);
  //     toast.error('圖片處理失敗: ' + error.message);
  //   }
  // };
  const uploadImages = async (images) => {
    if (!Array.isArray(images) || images.length === 0) {
      return [];
    }

    // 只處理新上傳的圖片
    const newImages = images.filter((img) => img && img.file instanceof File);
    if (newImages.length === 0) {
      return [];
    }

    // 建立 FormData
    const imageFormData = new FormData();
    newImages.forEach((img) => {
      if (img.file) {
        imageFormData.append('images', img.file);
      }
    });

    try {
      // const headers = getAuthHeader();
      // // 由於使用 FormData，不要設置 Content-Type
      // if (headers.headers) {
      //   delete headers.headers['Content-Type'];
      // }

      const uploadResponse = await fetch(`${API_SERVER}/diary/upload`, {
        method: 'POST',
        headers: {
          Authorization: getAuthHeader().Authorization,
        },
        body: imageFormData,
      });

      // 檢查回應的 Content-Type
      // const contentType = uploadResponse.headers.get('content-type');
      // if (!contentType || !contentType.includes('application/json')) {
      //   throw new Error('伺服器回應格式錯誤');
      // }

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.message || '圖片上傳失敗');
      }

      const uploadResult = await uploadResponse.json();

      if (uploadResult.success && Array.isArray(uploadResult.files)) {
        return uploadResult.files.map((img, index) => ({
          path: img.filename,
          isMain: newImages[index]?.isMain || false,
        }));
      }

      return [];
    } catch (error) {
      console.error('圖片上傳錯誤:', error);
      throw error;
    }
  };

  const handleImagesConfirm = async (images) => {
    try {
      // 確保 images 是有效的陣列
      const validImages = Array.isArray(images) ? images : [];
      console.log('收到的圖片:', validImages);

      // 過濾有效的圖片數據
      const processableImages = validImages.filter(
        (img) => img && (img.file instanceof File || img.path)
      );

      // 如果沒有有效圖片，直接返回
      if (processableImages.length === 0) {
        setFormData((prev) => ({ ...prev, images: [] }));
        setShowUpload(false);
        return;
      }

      // 上傳新圖片
      let finalImages = await uploadImages(processableImages);

      // 組合圖片數據
      const processedImages = processableImages.map((img, index) => {
        return {
          file: null, // 不保存 file 對象
          preview: img.preview || null,
          name: img.file ? img.file.name : 'image',
          size: img.file ? `${Math.round(img.file.size / 1024)}KB` : '0KB',
          isMain: Boolean(img.isMain),
          path: finalImages[index]?.path || img.path, // 使用上傳後的路徑或既有路徑
        };
      });

      console.log('處理後的圖片:', processedImages);

      setFormData((prev) => ({
        ...prev,
        images: processedImages.filter((img) => img.path), // 只保留有效路徑的圖片
      }));

      setShowUpload(false);
    } catch (error) {
      console.error('處理圖片時發生錯誤:', error);
      toast.error('圖片處理失敗: ' + error.message);
      setShowUpload(false);
    }
  };

  // 清理預覽URL
  useEffect(() => {
    return () => {
      formData.images.forEach((image) => {
        if (image.preview && image.preview.startsWith('blob:')) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [formData.images]);

  // 當切換到上傳模式時，確保保留現有圖片資訊
  const handleAddMore = () => {
    setShowUpload(true);
  };

  //處理表單提交
  // const handleSubmit = async () => {
  //   toast.dismiss();

  //   try {
  //     // 驗證必填欄位
  //     const errors = [];
  //     console.log('Checking form data:', formData);

  //     if (!formData.date) {
  //       errors.push('請選擇潛水日期');
  //     }
  //     if (!formData.region) {
  //       errors.push('請選擇潛點區域');
  //     }
  //     if (!formData.site_id) {
  //       errors.push('請選擇潛點名稱');
  //     }

  //     if (errors.length > 0) {
  //       toast.error(errors.join('\n'));
  //       return;
  //     }

  //     const loadingToastId = toast.loading('資料上傳中...', {
  //       position: 'top-center',
  //     });

  //     // 處理圖片資料
  //     // let finalImages = [];
  //     // if (formData.images?.length > 0) {
  //     //   const newImages = formData.images.filter((img) => img.file);

  //     //   if (newImages.length > 0) {
  //     //     const imageFormData = new FormData();
  //     //     newImages.forEach((img) => {
  //     //       imageFormData.append('images', img.file);
  //     //     });

  //     //     const uploadResponse = await fetch(`${API_SERVER}/diary/upload`, {
  //     //       method: 'POST',
  //     //       headers: {
  //     //         Authorization: `Bearer ${auth.token}`, // 添加認證token
  //     //       },
  //     //       body: imageFormData,
  //     //     });

  //     //     if (!uploadResponse.ok) {
  //     //       const errorData = await uploadResponse.json();
  //     //       throw new Error(errorData.message || '圖片上傳失敗');
  //     //     }

  //     //     const uploadResult = await uploadResponse.json();
  //     //     console.log('上傳返回資料:', uploadResult); // 檢查返回的資料結構

  //     //     const uploadedImages = uploadResult.files || []; // 假設後端返回 {files: [...]} 結構
  //     //     finalImages = uploadedImages.map((img, index) => ({
  //     //       path: img.filename,
  //     //       isMain: newImages[index].isMain,
  //     //     }));
  //     //     // const uploadedImages = await uploadResponse.json();
  //     //     // finalImages = uploadedImages.map((img, index) => ({
  //     //     //   path: `${img.filename}`,
  //     //     //   isMain: newImages[index].isMain,
  //     //     // }));
  //     //   }
  //     // }
  //     let finalImages = [];
  //     if (formData.images?.length > 0) {
  //       const newImages = formData.images.filter((img) => img.file);

  //       if (newImages.length > 0) {
  //         const imageFormData = new FormData();
  //         newImages.forEach((img) => {
  //           imageFormData.append('images', img.file);
  //         });

  //         try {
  //           const uploadResponse = await fetch(`${API_SERVER}/diary/upload`, {
  //             method: 'POST',
  //             headers: {
  //               ...getAuthHeader().headers,
  //             },
  //             body: imageFormData,
  //           });

  //           if (!uploadResponse.ok) {
  //             const errorData = await uploadResponse.json();
  //             throw new Error(errorData.message || '圖片上傳失敗');
  //           }

  //           const uploadResult = await uploadResponse.json();

  //           if (uploadResult.success && Array.isArray(uploadResult.files)) {
  //             finalImages = uploadResult.files.map((img, index) => ({
  //               path: img.filename,
  //               isMain: newImages[index].isMain,
  //             }));
  //           } else {
  //             throw new Error('圖片上傳返回格式錯誤');
  //           }
  //         } catch (error) {
  //           console.error('圖片上傳錯誤:', error);
  //           toast.error(`圖片上傳失敗: ${error.message}`);
  //           return;
  //         }
  //       }
  //     }

  //     // 準備日誌的內容數據
  //     const diaryData = {
  //       date: formatDateForSubmit(formData.date),
  //       site_id: formData.site_id,
  //       user_id: formData.user_id,
  //       max_depth: formData.max_depth ?? null,
  //       bottom_time: formData.bottom_time ?? null,
  //       water_temp: formData.water_temp ?? null,
  //       visi_id: formData.visi_id || null,
  //       method_id: formData.method_id || null,
  //       log_exp: formData.log_exp ?? null,
  //       is_privacy: formData.is_privacy === '1',
  //       is_draft: false,
  //       images: finalImages,
  //     };

  //     const diaryResponse = await fetch(`${API_SERVER}/diary/add`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         ...getAuthHeader().headers,
  //       },
  //       body: JSON.stringify(diaryData),
  //     });

  //     if (!diaryResponse.ok) {
  //       const errorData = await diaryResponse.json();
  //       throw new Error(errorData.error?.message || '伺服器錯誤');
  //     }

  //     const result = await diaryResponse.json();
  //     toast.dismiss(loadingToastId);

  //     if (result.success) {
  //       toast.success('發佈成功！', {
  //         duration: 3000,
  //         position: 'top-center',
  //       });
  //       // 告知父組件更新列表
  //       onSuccess?.(result.data);
  //       onClose();
  //     } else {
  //       throw new Error(result.error?.message || '發佈失敗');
  //     }
  //   } catch (error) {
  //     console.error('發佈失敗:', error);
  //     toast.error(`發佈失敗: ${error.message}`, {
  //       duration: 3000,
  //       position: 'top-center',
  //     });
  //   }
  // };

  const handleSubmit = async () => {
    toast.dismiss();

    try {
      // 驗證必填欄位
      const errors = [];
      if (!formData.date) errors.push('請選擇潛水日期');
      if (!formData.region) errors.push('請選擇潛點區域');
      if (!formData.site_id) errors.push('請選擇潛點名稱');

      if (errors.length > 0) {
        toast.error(errors.join('\n'));
        return;
      }

      const loadingToastId = toast.loading('資料上傳中...', {
        position: 'top-center',
      });

      // 準備日誌的內容數據 - 直接使用已處理過的圖片資訊
      const diaryData = {
        date: formatDateForSubmit(formData.date),
        site_id: formData.site_id,
        user_id: formData.user_id,
        max_depth: formData.max_depth ?? null,
        bottom_time: formData.bottom_time ?? null,
        water_temp: formData.water_temp ?? null,
        visi_id: formData.visi_id || null,
        method_id: formData.method_id || null,
        log_exp: formData.log_exp ?? null,
        is_privacy: formData.is_privacy === '1',
        is_draft: false,
        images: formData.images.map((img) => ({
          path: img.path,
          isMain: img.isMain,
        })),
      };

      const diaryResponse = await fetch(`${API_SERVER}/diary/add`, {
        method: 'POST',
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diaryData),
      });

      if (!diaryResponse.ok) {
        const errorData = await diaryResponse.json();
        throw new Error(errorData.error?.message || '伺服器錯誤');
      }

      const result = await diaryResponse.json();
      toast.dismiss(loadingToastId);

      if (result.success) {
        toast.success('發佈成功！', {
          duration: 3000,
          position: 'top-center',
        });
        onSuccess?.(result.data);
        onClose();
      } else {
        throw new Error(result.error?.message || '發佈失敗');
      }
    } catch (error) {
      console.error('發佈失敗:', error);
      toast.error(`發佈失敗: ${error.message}`, {
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  //處理儲存成草稿
  // const handleSaveDraft = async () => {
  //   toast.dismiss(); // 清除之前的提示
  //   try {
  //     // 驗證必填欄位
  //     const errors = [];

  //     if (!formData.date) {
  //       errors.push('請選擇潛水日期');
  //     }
  //     if (!formData.region) {
  //       errors.push('請選擇潛點區域');
  //     }
  //     if (!formData.site_id) {
  //       errors.push('請選擇潛點名稱');
  //     }

  //     if (errors.length > 0) {
  //       toast.error(errors.join('\n'));
  //       return;
  //     }

  //     // 處理圖片資料
  //     let finalImages = [];
  //     if (formData.images?.length > 0) {
  //       const newImages = formData.images.filter((img) => img.file);

  //       if (newImages.length > 0) {
  //         const imageFormData = new FormData();
  //         newImages.forEach((img) => {
  //           imageFormData.append('images', img.file);
  //         });
  //         try {
  //           const uploadResponse = await fetch(`${API_SERVER}/diary/upload`, {
  //             method: 'POST',
  //             headers: {
  //               ...getAuthHeader().headers, // 使用 getAuthHeader
  //             },
  //             body: imageFormData,
  //           });

  //           if (!uploadResponse.ok) {
  //             const errorData = await uploadResponse.json();
  //             throw new Error(errorData.message || '圖片上傳失敗');
  //           }

  //           const uploadResult = await uploadResponse.json();
  //           console.log('圖片上傳結果:', uploadResult); // 用於除錯

  //           if (uploadResult.success && Array.isArray(uploadResult.files)) {
  //             finalImages = uploadResult.files.map((img, index) => ({
  //               path: img.filename,
  //               isMain: newImages[index].isMain,
  //             }));
  //           } else {
  //             throw new Error('圖片上傳返回格式錯誤');
  //           }
  //         } catch (error) {
  //           console.error('圖片上傳錯誤:', error);
  //           toast.error(`圖片上傳失敗: ${error.message}`);
  //           toast.dismiss(loadingToastId);
  //           return;
  //         }
  //       }
  //     }
  //     // 準備草稿資料
  //     const draftData = {
  //       date: formatDateForSubmit(formData.date),
  //       site_id: formData.site_id,
  //       user_id: formData.user_id,
  //       max_depth: formData.max_depth || null,
  //       bottom_time: formData.bottom_time || null,
  //       water_temp: formData.water_temp || null,
  //       visi_id: formData.visi_id || null,
  //       method_id: formData.method_id || null,
  //       log_exp: formData.log_exp || null,
  //       is_privacy: formData.is_privacy === '1',
  //       is_draft: true,
  //       images: finalImages,
  //     };
  //     console.log('準備送出的草稿資料:', draftData); // 用於除錯
  //     const response = await fetch(`${API_SERVER}/diary/add`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         ...getAuthHeader().headers,
  //       },
  //       body: JSON.stringify(draftData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('儲存失敗');
  //     }

  //     toast.success('草稿儲存成功');
  //     onClose();
  //   } catch (error) {
  //     console.error('儲存失敗:', error);
  //     toast.error('儲存失敗: ' + error.message);
  //   }
  // };
  const handleSaveDraft = async () => {
    toast.dismiss();
    try {
      // 驗證必填欄位
      const errors = [];
      if (!formData.date) errors.push('請選擇潛水日期');
      if (!formData.region) errors.push('請選擇潛點區域');
      if (!formData.site_id) errors.push('請選擇潛點名稱');

      if (errors.length > 0) {
        toast.error(errors.join('\n'));
        return;
      }

      // 處理圖片上傳
      let finalImages = [];
      try {
        finalImages = await uploadImages(formData.images);
      } catch (error) {
        toast.error(`圖片上傳失敗: ${error.message}`);
        return;
      }

      // 準備草稿資料
      const draftData = {
        date: formatDateForSubmit(formData.date),
        site_id: formData.site_id,
        user_id: formData.user_id,
        max_depth: formData.max_depth || null,
        bottom_time: formData.bottom_time || null,
        water_temp: formData.water_temp || null,
        visi_id: formData.visi_id || null,
        method_id: formData.method_id || null,
        log_exp: formData.log_exp || null,
        is_privacy: formData.is_privacy === '1',
        is_draft: true,
        images: formData.images.map((img) => ({
          path: img.path,
          isMain: img.isMain,
        })),
      };

      const response = await fetch(`${API_SERVER}/diary/add`, {
        method: 'POST',
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draftData),
      });

      if (!response.ok) {
        throw new Error('儲存失敗');
      }

      toast.success('草稿儲存成功');
      onClose();
    } catch (error) {
      console.error('儲存失敗:', error);
      toast.error('儲存失敗: ' + error.message);
    }
  };

  return (
    <>
      <Modallog closeModal={onClose}>
        <div className={styles.functionContainer}>
          <ButtonFG onClick={handleSaveDraft}>儲存成草稿</ButtonFG>
          <ButtonFP2 onClick={handleSubmit}>發佈</ButtonFP2>
        </div>
        <div className={styles.container}>
          <PreviewCarousel images={formData.images} onAddMore={handleAddMore} />
          <div className={styles.itemContainer}>
            <div className={styles.inputBox}>
              <label htmlFor="date" className={styles.inputLabel}>
                <span>潛水日期：</span>
                <span style={{ color: 'red' }}> *</span>
              </label>
              <DatePicker
                id="date"
                onChange={(value) => handleInputChange('date', value)}
                value={formData.date}
                required
                aria-required="true"
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="region" className={styles.inputLabel}>
                <span>潛點區域：</span>
                <span style={{ color: 'red' }}> *</span>
              </label>
              <SelectRect
                id="region"
                name="region"
                options={siteRegions || []}
                onChange={(value) => handleInputChange('region', value)}
                option={formData.region}
                required
                aria-required="true"
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="site_name" className={styles.inputLabel}>
                <span>潛點名稱：</span>
                <span style={{ color: 'red' }}> *</span>
              </label>
              <SelectRect
                id="site_name"
                name="site_name"
                options={siteOptions.map((site) => site.site_name)}
                onChange={(value) => handleInputChange('site_name', value)}
                option={formData.site_name}
                required
                aria-required="true"
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="method_id" className={styles.inputLabel}>
                <span>潛水方式：</span>
              </label>
              <SelectRect
                id="method_id"
                name="method_id"
                options={methodOptions.map((method) => method.method_name)}
                onChange={(value) => handleInputChange('method', value)}
                option={formData.method}
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="max_depth" className={styles.inputLabel}>
                <span>最大深度：</span>
              </label>
              <InputComponent
                id="max_depth"
                name="max_depth"
                type="number"
                value={formData.max_depth}
                onChange={(value) => handleInputChange('max_depth', value)}
                placeholder="請輸入數字"
              />
              <span className={styles.unitBox}>米</span>
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="bottom_time" className={styles.inputLabel}>
                <span>潛水時間：</span>
              </label>
              <InputComponent
                id="bottom_time"
                name="bottom_time"
                type="number"
                value={formData.bottom_time}
                onChange={(value) => handleInputChange('bottom_time', value)}
                placeholder="請輸入數字"
              />
              <span className={styles.unitBox}>分鐘</span>
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="water_temp" className={styles.inputLabel}>
                <span>水下溫度：</span>
              </label>
              <InputComponent
                id="water_temp"
                name="water_temp"
                type="number"
                value={formData.water_temp}
                onChange={(value) => handleInputChange('water_temp', value)}
                placeholder="請輸入攝氏溫度"
              />
              <span className={styles.unitBox}>度</span>
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="visi_id" className={styles.inputLabel}>
                <span>能見度：</span>
              </label>
              <Radio
                id="visi_id"
                name="visi_id"
                className={styles.radioBox}
                options={VisiOptions}
                selectedRadio={formData.visi_id}
                onChange={(value) => handleInputChange('visi_id', value)}
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="log_exp" className={styles.inputLabel}>
                <span>心得：</span>
              </label>
              <textarea
                id="log_exp"
                className={styles.textarea}
                placeholder="輸入文章內容（字數上限500字）"
                maxLength={500}
                value={formData.log_exp}
                onChange={(e) => handleInputChange('log_exp', e.target.value)}
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="is_privacy" className={styles.inputLabel}>
                <span>隱私設定：</span>
              </label>
              <Radio
                id="is_privacy"
                name="is_privacy"
                className={styles.radioBox}
                options={PrivacyOptions}
                selectedRadio={formData.is_privacy}
                onChange={(value) => handleInputChange('is_privacy', value)}
              />
            </div>
          </div>
        </div>
      </Modallog>
      {showUpload && (
        <Upload
          initialFiles={formData.images}
          onConfirm={handleImagesConfirm}
          onCancel={() => setShowUpload(false)}
          isEdit={false}
        />
      )}
    </>
  );
}
