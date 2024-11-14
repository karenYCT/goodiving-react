import React, { useState, useEffect } from 'react';
import { API_SERVER } from '@/configs/api-path';
import { useAuth } from '@/context/auth-context';
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

export default function DiaryForm({ onClose }) {
  console.log('DiaryForm 組件被渲染');
  //表單的狀態
  const { auth } = useAuth();
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
    user_id: auth?.user_id || 1,
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

  //處理上傳照片完成
  const handleImagesConfirm = (images) => {
    console.log('收到上傳的圖片了:', images);

    // 保存完整的圖片資訊，包括預覽URL
    const processedImages = images.map((img) => ({
      file: img.file,
      preview: img.preview,
      name: img.file.name,
      size: (img.file.size / 1024).toFixed(0) + 'KB',
      isMain: img.isMain,
    }));
    console.log('照片處理中:', processedImages);

    setFormData((prev) => ({
      ...prev,
      images: processedImages,
    }));
    setShowUpload(false);
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
  const handleSubmit = async () => {
    toast.dismiss();

    try {
      // 驗證必填欄位
      const errors = [];
      console.log('Checking form data:', formData); // 除錯用

      // 檢查日期
      if (!formData.date) {
        errors.push('請選擇潛水日期');
        console.log('Missing date'); // 除錯用
      }

      //檢查區域
      if (!formData.region) {
        errors.push('請選擇潛點區域');
        console.log('Missing region'); // 除錯用
      }

      //檢查潛點
      if (!formData.site_id) {
        errors.push('請選擇潛點名稱');
        console.log('Missing site'); // 除錯用
      }

      //如果有錯誤，立即顯示 toast 並返回
      if (errors.length > 0) {
        console.log('Validation errors:', errors); // 除錯用
        // 使用 promise 方式顯示 toast
        toast.error(errors.join('\n'), {
          duration: 4000,
          position: 'top-center',
        });
        return;
      }

      const loadingToastId = toast.loading('資料上傳中...', {
        position: 'top-center',
      });

      //先上傳圖片
      // const formDataToSend = new FormData();

      // console.log('準備上傳的圖片數量:', formData.images.length);

      //將圖片都先放進FormData
      //     formData.images.forEach((image, index) => {
      //       console.log(`準備上傳第 ${index + 1} 張圖片:`, {
      //         name: image.file.name,
      //         size: image.file.size,
      //         type: image.file.type,
      //       });
      //       formDataToSend.append('images', image.file);
      //     });
      //     let uploadImages = [];
      //     if (formData.images.length > 0) {
      //       console.log('開始發送上傳請求到:', `${API_SERVER}/diary/upload`);

      //       //上傳圖片
      //       const uploadResponse = await fetch(`${API_SERVER}/diary/upload`, {
      //         method: 'POST',
      //         body: formDataToSend,
      //       });

      //       console.log('上傳請求狀態:', uploadResponse.status);

      //       if (!uploadResponse.ok) {
      //         throw new Error('圖片上傳失敗');
      //       }
      //       const uploadImages = await uploadResponse.json();
      //       console.log('上傳成功的圖片:', uploadImages);
      //     }

      //     //準備日誌的內容數據，包括圖片
      //     const diaryData = Object.assign(
      //       {},
      //       {
      //         date: formData.date,
      //         site_id: formData.site_id,
      //         user_id: formData.user_id,
      //         max_depth: formData.max_depth || null,
      //         bottom_time: formData.bottom_time || null,
      //         water_temp: formData.water_temp || null,
      //         visi_id: formData.visi_id,
      //         method_id: formData.method_id,
      //         log_exp: formData.log_exp,
      //         is_privacy: formData.is_privacy === '1',
      //         is_draft: false,
      //         images: uploadImages.map((img, index) => ({
      //           // path: `/uploads/${img.filename}`,
      //           path: `${img.filename}`,
      //           isMain: formData.images[index].isMain,
      //         })),
      //       }
      //     );

      //     console.log('準備送出的日誌資料:', diaryData);
      //     //提交內容
      //     const diaryResponse = await fetch(`${API_SERVER}/diary/add`, {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify(diaryData),
      //     });

      //     // 添加狀態碼檢查
      //     console.log('回應狀態碼:', diaryResponse.status);

      //     if (!diaryResponse.ok) {
      //       const errorData = await diaryResponse.json();
      //       console.error('伺服器回應錯誤:', errorData);
      //       throw new Error(errorData.error?.message || '伺服器錯誤');
      //     }

      //     const result = await diaryResponse.json();

      //     // 關閉載入中 toast
      //     toast.dismiss(loadingToastId);

      //     console.log('後端回傳結果:', result); // 加入除錯用

      //     if (result.data && result.data.log_id) {
      //       // 成功提示
      //       toast.success('發佈成功！', {
      //         duration: 3000,
      //         position: 'top-center',
      //       });
      //       // 這裡可以加入成功後的導航或其他操作
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

      // 處理圖片資料
      let finalImages = [];
      if (formData.images && formData.images.length > 0) {
        // 只處理新上傳的圖片
        const newImages = formData.images.filter((img) => img.file);

        if (newImages.length > 0) {
          const imageFormData = new FormData();
          newImages.forEach((img) => {
            imageFormData.append('images', img.file);
          });

          const uploadResponse = await fetch(`${API_SERVER}/diary/upload`, {
            method: 'POST',
            body: imageFormData,
          });

          if (!uploadResponse.ok) {
            throw new Error('圖片上傳失敗');
          }

          const uploadedImages = await uploadResponse.json();
          finalImages = uploadedImages.map((img, index) => ({
            path: `${img.filename}`, // 使用上傳後返回的路徑
            isMain: newImages[index].isMain,
          }));
        }
      }

      //準備日誌的內容數據
      const diaryData = {
        date: formData.date,
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
        images: finalImages,
      };

      console.log('準備送出的日誌資料:', diaryData);

      //提交內容
      const diaryResponse = await fetch(`${API_SERVER}/diary/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diaryData),
      });

      console.log('回應狀態碼:', diaryResponse.status);

      if (!diaryResponse.ok) {
        const errorData = await diaryResponse.json();
        console.error('伺服器回應錯誤:', errorData);
        throw new Error(errorData.error?.message || '伺服器錯誤');
      }

      const result = await diaryResponse.json();
      toast.dismiss(loadingToastId);
      console.log('後端回傳結果:', result);

      if (result.data && result.data.log_id) {
        toast.success('發佈成功！', {
          duration: 3000,
          position: 'top-center',
        });
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
  const handleSaveDraft = async () => {
    try {
      const response = await fetch(`${API_SERVER}/diary/draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          images: [],
        }),
      });
      if (!response.ok) {
        throw new Error('儲存失敗');
      }
      //成功處理
      toast.success('儲存成功');
      onClose();
    } catch (error) {
      console.error('儲存失敗', error);
      toast.error('儲存失敗' + error.message);
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
