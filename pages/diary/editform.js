import React, { useState, useEffect } from 'react';
import { API_SERVER } from '@/configs/api-path';
import { formatDateForSubmit, parseDateString } from '@/utils/date';
import toast from 'react-hot-toast';
import Modallog from '@/components/karen/modal-log';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import ButtonFG from '@/components/buttons/btn-fill-gray2';
import DatePicker from '@/components/karen/date-picker';
import SelectRect from '@/components/karen/select-rect';
import InputComponent from '@/components/karen/input-component';
import Radio from '@/components/karen/input-radio';
import PreviewCarousel from '@/components/karen/imgcarousel-preview';
import Upload from './upload';
import styles from '@/pages/diary/diaryform.module.css';

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

// 下拉選單:把區域名稱map出來
const siteRegions = regionData.map((region) => region.name);

export default function EditForm({ onClose, logData, onUpdateSuccess }) {
  console.log('EditForm 組件被渲染, logData:', logData);

  // =============== State Management ===============
  // 在設定初始狀態時轉換日期格式
  const initialDate = parseDateString(logData?.date);
  const getInitialRegionId = (regionName) => {
    const region = regionData.find(r => r.name === regionName);
    return region ? region.id : null;
  };
  const [formData, setFormData] = useState({
    date: initialDate,
    region_id: getInitialRegionId(logData?.region_name),
    region: logData?.region_name,
    site_id: logData?.site_id ,
    site_name: logData?.site_name,
    method_id: logData?.method_id,
    method: logData?.method_name,
    max_depth: logData?.max_depth ?? null,
    bottom_time: logData?.bottom_time ?? null,
    water_temp: logData?.water_temp ?? null,
    visi_id: logData?.visi_id ? String(logData.visi_id) : null,
    log_exp: logData?.log_exp ?? null,
    is_privacy: logData?.is_privacy ? '1' : '2',
    images:
      logData?.images?.map((img) => ({
        file: null,
        preview: `${API_SERVER}${img.img_url}`,
        path: img.img_url,
        isMain: img.is_main === 1,
      })) || [],
    user_id: logData?.user_id || 1,
  });

  //Data的狀態
  const [siteOptions, setSiteOptions] = useState([]);
  const [methodOptions, setMethodOptions] = useState([]);

  //UI的狀態---上傳照片
  const [showUpload, setShowUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // =============== API路由事件處理 ===============

  //依照區域名稱顯示該潛點的名稱
  const loadSites = async (regionId) => {
    setIsLoading(true);
    try {
      console.log('正在載入區域潛點, region_id:', regionId);

      if (!regionId) {
        throw new Error('超出服務範圍囉！');
      }
      const response = await fetch(`${API_SERVER}/diary/sites/${regionId}`);
      if (!response.ok) {
        throw new Error('沒有獲取到潛點');
      }

      const data = await response.json();
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

  // 更新日誌
  const handleUpdate = async () => {
    toast.dismiss();
    try {

      // 檢查是否有原始數據
      if (!logData) {
        toast.error('無法取得原始資料');
        return;
      }


      // 處理圖片資料
      let finalImages = [];
      if (formData.images && formData.images.length > 0) {
        // 處理新上傳的圖片
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
          finalImages = [
            ...finalImages,
            ...uploadedImages.map((img, index) => ({
              img_url: `/img/${img.filename}`,  // 使用上傳後返回的路徑
              is_main: newImages[index].isMain ? 1 : 0
            }))
          ];
        }

        // 處理既有圖片
        const existingImages = formData.images
          .filter((img) => !img.file && img.path)
          .map((img) => ({
            img_url: img.path,
            is_main: img.isMain ? 1 : 0,
          }));

        finalImages = [...finalImages, ...existingImages];
      }

      console.log('初始資料狀態:', {
        formData: {
          site_id: formData.site_id,
          site_name: formData.site_name,
          region_id: formData.region_id,
          region: formData.region,
          method_id: formData.method_id,
          method_name: formData.method
        },
        logData: {
          site_id: logData.site_id,
          site_name: logData.site_name,
          region_id: logData.region_id,
          region_name: logData.region_name,
          method_id: formData.method_id,
          method_name: formData.method
        }
      });
      // 準備更新的資料
      const updateData = {
        logId: logData.log_id,
        date: formatDateForSubmit(formData.date),
        site_id: formData.site_id || logData.site_id,  
        user_id: formData.user_id,
        max_depth: formData.max_depth ?? null,
        bottom_time: formData.bottom_time ?? null,
        water_temp: formData.water_temp ?? null,
        visi_id: formData.visi_id || null,
        method_id: formData.method_id || null,
        log_exp: formData.log_exp ?? null,
        is_privacy: formData.is_privacy === '1',
        images: finalImages,
      };

      console.log('準備發送的更新資料:', updateData);

      // 發送更新請求
      const response = await fetch(
        `${API_SERVER}/diary/update/${logData.log_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || '更新失敗');
      }

      toast.success('更新成功！');

      // 先觸發更新成功的回調
      if (onUpdateSuccess) {
        onUpdateSuccess();
      } else {
        onClose(); // 如果沒有 onUpdateSuccess，則只關閉表單
      }
    } catch (error) {
      console.error('更新失敗:', error);
      toast.error(`更新失敗: ${error.message}`);
    }
  };

  // =============== Event Handlers ===============
  //處理輸入的改變
  const handleInputChange = (name, value) => {
    console.log(`Input changed: ${name} = ${value}`);
  
    if (name === 'visi_id') {
      setFormData(prev => ({
        ...prev,
        visi_id: String(value)
      }));
      return;
    }
  
    if (name === 'region') {
      const selectedRegion = regionData.find((r) => r.name === value);
      console.log('Selected region:', selectedRegion);
  
      if (selectedRegion) {
        const shouldClearSite = formData.region_id !== selectedRegion.id;
  
        setFormData((prev) => ({
          ...prev,
          region: value,
          region_id: selectedRegion.id,
          ...(shouldClearSite ? {
            site_id: '',
            site_name: ''
          } : {})
        }));
        loadSites(selectedRegion.id);
      }
    } else if (name === 'site_name') {
      console.log('嘗試更改潛點名稱:', siteOptions);
      console.log('當前可用的潛點選項:', siteOptions);
      const selectedSite = siteOptions.find(
        (site) => site.site_name === value
      );
      console.log('找到的潛點:', selectedSite);
      
      if (selectedSite) {
        console.log('正在更新 formData with site:', selectedSite);
        setFormData((prev) => ({
          ...prev,
          site_name: value,
          site_id: selectedSite.site_id,
        }));
      }
    } else if (name === 'method') {
      const selectedMethod = methodOptions.find(
        (method) => method.method_name === value
      );
      if (selectedMethod) {
        setFormData((prev) => ({
          ...prev,
          method: value,
          method_id: selectedMethod.method_id,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value || null,
      }));
    }
  };

  //處理日期變更
  const handleDateChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      date: value,
    }));
  };

  //處理上傳照片完成
  const handleImagesConfirm = (images) => {
    console.log('收到上傳的圖片了:', images);
    setFormData((prev) => ({
      ...prev,
      images: images,
    }));
    setShowUpload(false);
  };
  // =============== Effects ===============
  // 監聽 formData.region_id 的變化

  // useEffect(() => {
  //   const fetchSites = async () => {
  //     if (formData.region_id) {
  //       console.log('Triggering loadSites with region_id:', formData.region_id); // 新增除錯日誌
  //       await loadSites(formData.region_id);
  //     }
  //   };

  //   fetchSites();
  // }, [formData.region_id]);

  useEffect(() => {
    console.log('組件初始載入，logData:', logData);
    const initialRegionId = getInitialRegionId(logData?.region_name);
    console.log('取得的初始 region_id:', initialRegionId);
    
    if (initialRegionId) {
      loadSites(initialRegionId);
    }
    loadDivingMethods();
  }, []);

  useEffect(() => {
    console.log('visi_id 更新:', formData.visi_id);
  }, [formData.visi_id]);


  // =============== Render 渲染 ===============

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
                <span style={{ color: '#ff277e', fontSize: '12px' }}>
                  {' '}
                  *必填
                </span>
              </label>
              <DatePicker
                id="date"
                onChange={handleDateChange} // 使用特別的處理函數
                value={formData.date} // 直接使用 formData 中的日期
                required
                aria-required="true"
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="region" className={styles.inputLabel}>
                <span>潛點區域：</span>
                <span style={{ color: '#ff277e', fontSize: '12px' }}>
                  {' '}
                  *必填
                </span>
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
                <span style={{ color: '#ff277e', fontSize: '12px' }}>
                  {' '}
                  *必填
                </span>
              </label>
              <SelectRect
                id="site_name"
                name="site_name"
                options={siteOptions.map((site) => site.site_name)}
                onChange={(value) => handleInputChange('site_name', value)}
                option={formData.site_name}
                disabled={isLoading} 
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
