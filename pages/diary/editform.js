import React, { useState, useEffect } from 'react';
import Modallog from '@/components/karen/modal-log';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import ButtonFG from '@/components/buttons/btn-fill-gray2';
import DatePicker from '@/components/karen/date-picker';
import SelectRect from '@/components/karen/select-rect';
import InputComponent from '@/components/karen/input-component';
import Radio from '@/components/karen/input-radio';
import styles from '@/pages/diary/diaryform.module.css';
import { API_SERVER } from '@/configs/api-path';
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

export default function EditForm({ onClose, logData }) {
  console.log('EditForm 組件被渲染, logData:', logData);
  // 在設定初始狀態時轉換日期格式
  const initialDate = logData?.date ? new Date(logData.date) : null;
  //表單的狀態
  const [formData, setFormData] = useState({
    date: initialDate,
    region_id: logData?.region_id || '',
    region: logData?.region_name || '',
    site_id: logData?.site_id || '',
    site_name: logData?.site_name || '',
    method_id: logData?.method_id || '',
    method: logData?.method_name || '',
    max_depth: logData?.max_depth || '',
    bottom_time: logData?.bottom_time || '',
    water_temp: logData?.water_temp || '',
    visi_id: String(logData?.visi_id) || '2',
    log_exp: logData?.log_exp || '',
    is_privacy: logData?.is_privacy ? '1' : '2',
    images: logData?.images?.map(img => ({
      file: null, // 原始圖片不需要 file 對象
      preview: `${API_SERVER}${img.img_url}`,
      path: img.img_url,
      isMain: img.is_main === 1
    })) || [],
    user_id: logData?.user_id || 1,
  });

  const [siteOptions, setSiteOptions] = useState([]);
  const [methodOptions, setMethodOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //上傳照片modal狀態
  const [showUpload, setShowUpload] = useState(false);

  // 下拉選單:把區域名稱map出來
  const siteRegions = regionData.map((region) => region.name);

  //依照區域名稱顯示該潛點的名稱
  const LoadSites = async (region) => {
    setIsLoading(true);
    try {
      //先找到區域的ID
      const regionId = formData.region_id;
      console.log('正在載入區域潛點, region_id:', regionId);

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

// 監聽 formData.region_id 的變化
useEffect(() => {
  if (formData.region_id) {
    LoadSites();
  }
}, [formData.region_id]);

// 組件初始載入時也執行一次
useEffect(() => {
  if (formData.region_id) {
    LoadSites();
  }
  loadDivingMethods();
}, []); // 只在組件載入時執行一次


  //處理輸入的改變
  const handleInputChange = (name, value) => {
  console.log(`Input changed: ${name} = ${value}`);
    
    if (name === 'region') {
      // 找到對應的 region_id
      const selectedRegion = regionData.find(r => r.name === value);
      if (selectedRegion) {
        setFormData(prev => ({
          ...prev,
          region: value,
          region_id: selectedRegion.id,
          // 清空相關聯的潛點資料
          site_id: '',
          site_name: ''
        }));
      }
    } else {
      if (name === 'site_name') {
        // 找到對應的 site_id
        const selectedSite = siteOptions.find(site => site.site_name === value);
        setFormData(prev => ({
          ...prev,
          site_name: value,
          site_id: selectedSite?.site_id || ''
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    }
  };
  //處理上傳照片完成
  const handleImagesConfirm = (images) => {
    console.log('收到上傳的圖片了:', images);
    setFormData((prev) => ({
      ...prev,
      images: images
    }));
    setShowUpload(false);
  };
 // 更新日誌
  const handleUpdate = async () => {
  toast.dismiss();
  try {
    // 基本驗證
    if (!formData.date || !formData.region_id || !formData.site_id) {
      toast.error('請填寫必要欄位（日期、區域、潛點）', {
        duration: 2000,
        position: 'top-center',
      });
      return;
    }

    const loadingToastId = toast.loading('更新中...', {
      position: 'top-center',
    });

    // 處理新上傳的圖片
    let finalImages = [...formData.images];
    const newImages = formData.images.filter(img => img.file);
    
    if (newImages.length > 0) {
      const imageFormData = new FormData();
      newImages.forEach(img => {
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
      
      // 合併原有圖片和新上傳的圖片
      finalImages = [
        ...formData.images.filter(img => !img.file), // 保留原有圖片
        ...uploadedImages.map((img, index) => ({
          path: img.img_url,
          isMain: newImages[index].isMain
        }))
      ];
    }

    // 準備更新的資料

    const updateData = {
      date: formData.date.toISOString().split('T')[0], // 轉換成 YYYY-MM-DD 格式
      site_id: formData.site_id,
      user_id: formData.user_id,
      max_depth: formData.max_depth || null,
      bottom_time: formData.bottom_time || null,
      water_temp: formData.water_temp || null,
      visi_id: formData.visi_id,
      method_id: formData.method_id || null,
      log_exp: formData.log_exp,
      is_privacy: formData.is_privacy === '1',
      images: finalImages,
    };

    // 發送更新請求
    const response = await fetch(`${API_SERVER}/diary/update/${logData.log_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || '更新失敗');
    }

    toast.dismiss(loadingToastId);
    toast.success('更新成功！', {
      duration: 2000,
      position: 'top-center',
    });

    onClose();
  } catch (error) {
    console.error('更新失敗:', error);
    toast.error(`更新失敗: ${error.message}`, {
      duration: 3000,
      position: 'top-center',
    });
  }
};

  // 處理日期變更的特別函數
  const handleDateChange = (value) => {
    setFormData(prev => ({
      ...prev,
      date: value // value 已經是 Date 對象，直接使用
    }));
  };
  return (
    <>
      <Modallog closeModal={onClose}>
        <div className={styles.functionContainer}>
        <ButtonFG onClick={onClose}>取消</ButtonFG>
        <ButtonFP2 onClick={handleUpdate}>更新</ButtonFP2>
        </div>
        <div className={styles.container}>
          <PreviewCarousel 
          images={formData.images} 
          onAddMore={() => setShowUpload(true)} 
          />
          <div className={styles.itemContainer}>
            <div className={styles.inputBox}>
              <label htmlFor="date" className={styles.inputLabel}>
                <span>潛水日期：</span>
                <span style={{ color: 'red' }}> *</span>
              </label>
              <DatePicker
                id="date"
                onChange={handleDateChange}  // 使用特別的處理函數
                value={formData.date}  // 直接使用 formData 中的日期
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
          isEdit={true}
        />
      )}
    </>
  );
}
