import React, { useState, useEffect } from 'react';
import Modallog from '@/components/karen/modal-log';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import ButtonFG from '@/components/buttons/btn-fill-gray2';
import { FaCamera } from 'react-icons/fa6';
import DatePicker from '@/components/karen/date-picker';
import SelectRect from '@/components/karen/select-rect';
import InputComponent from '@/components/karen/input-component';
import Radio from '@/components/karen/input-radio';
import styles from '@/pages/diary/diaryform.module.css';
import { API_SERVER } from '@/configs/api-path';
import Upload from './upload';
import PreviewCarousel from '@/components/karen/imgcarousel-preview';
import { Toaster } from 'react-hot-toast';

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

export default function DiaryForm() {
  //表單的狀態
  const [formData, setFormData] = useState({
    date: null,
    region: '',
    site_name: '',
    method: '',
    max_depth: '',
    bottom_time: '',
    water_temp: '',
    visibility: '2',
    log_exp: '',
    is_privacy: '1',
    is_draft: '0',
    images: [],
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
      const options = data.map((site) => site.site_name);
      setSiteOptions(options);
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
      const options = data.map((method) => method.method_name);
      setMethodOptions(options);
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
    if (name === 'date') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
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
    const processedImages = images.map(img => ({
      file: img.file,
      preview: img.preview,
      name: img.file.name,
      size: (img.file.size / 1024).toFixed(0) + 'KB',
      isMain: img.isMain,
    }));
    console.log('照片處理中:', processedImages);

    setFormData(prev => ({
      ...prev,
      images: processedImages,
    }));
    setShowUpload(false);
  };

  // 清理預覽URL
  useEffect(() => {
    return () => {
      formData.images.forEach(image => {
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
    try {
      //先上傳圖片
      const formDataToSend = new FormData();
      
      console.log('準備上傳的圖片數量:', formData.images.length);

      //將圖片都先放進FormData
      formData.images.forEach((image, index) => {
        console.log(`準備上傳第 ${index + 1} 張圖片:`, {
          name: image.file.name,
          size: image.file.size,
          type: image.file.type
        });
        formDataToSend.append('images', image.file);
      });

      console.log('開始發送上傳請求到:', `${API_SERVER}/diary/upload`);
      
      //上傳圖片
      const uploadResponse = await fetch(`${API_SERVER}/diary/upload`, {
        method: 'POST',
        body: formDataToSend,
      });

      console.log('上傳請求狀態:', uploadResponse.status);

      if (!uploadResponse.ok) {
        throw new Error('圖片上傳失敗');
      }
      const uploadImages = await uploadResponse.json();
      console.log('上傳成功的圖片:', uploadImages);

      //準備日誌的內容數據，包括圖片
      const diaryData = {
        ...formData,
        images: uploadImages.map((img, index) => ({
          path: `/uploads/${image.filename}`,
          isMain: formData.images[index].isMain,
        })),
      };

      //提交內容
      const diaryResponse = await fetch(`${API_SERVER}/diary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diaryData),
      });
      if (!diaryResponse.ok) {
        throw new Error('發佈失敗');
      }
      //成功處理
      alert('發佈成功');
    } catch (error) {
      console.error('發佈失敗', error);
      alert('發佈失敗' + error.message);
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
      alert('儲存成功');
    } catch (error) {
      console.error('儲存失敗', error);
      alert('儲存失敗' + error.message);
    }
  };

  return (
    <>
    <Toaster/>
      <Modallog >
        <div className={styles.functionContainer}>
          <ButtonFG onClick={handleSaveDraft}>儲存成草稿</ButtonFG>
          <ButtonFP2 onClick={handleSubmit}>發佈</ButtonFP2>
        </div>
        <div className={styles.container}>
          {/* <div
            className={styles.imgContainer}
            onClick={() => setShowUpload(true)}
          >
            <FaCamera />
            <h5>點擊新增照片</h5>
          </div> */}
          <PreviewCarousel
          images={formData.images}
          onAddMore={(handleAddMore)}
          />
          <div className={styles.itemContainer}>
            <div className={styles.inputBox}>
              <label className={styles.inputLabel}>
                <span>潛水日期：</span>
              </label>
              <DatePicker
                onChange={(value) => handleInputChange('date', value)}
                value={formData.date}
              />
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputLabel}>
                <span>潛點區域：</span>
              </label>
              <SelectRect
                options={siteRegions || []}
                onChange={(value) => handleInputChange('region', value)}
                option={formData.region}
              />
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputLabel}>
                <span>潛點名稱：</span>
              </label>
              <SelectRect
                options={siteOptions}
                onChange={(value) => handleInputChange('site_name', value)}
                option={formData.site_name}
              />
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputLabel}>
                <span>潛水方式：</span>
              </label>
              <SelectRect
                options={methodOptions}
                onChange={(value) => handleInputChange('method', value)}
                option={formData.method}
              />
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputLabel}>
                <span>最大深度：</span>
              </label>
              <InputComponent
                name="max_depth"
                type="number"
                value={formData.max_depth}
                onChange={(value) => handleInputChange('max_depth', value)}
                placeholder="請輸入數字"
              />
              <span className={styles.unitBox}>米</span>
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputLabel}>
                <span>潛水時間：</span>
              </label>
              <InputComponent
                name="bottom_time"
                type="number"
                value={formData.bottom_time}
                onChange={(value) => handleInputChange('bottom_time', value)}
                placeholder="請輸入數字"
              />
              <span className={styles.unitBox}>分鐘</span>
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputLabel}>
                <span>水下溫度：</span>
              </label>
              <InputComponent
                name="water_temp"
                type="number"
                value={formData.water_temp}
                onChange={(value) => handleInputChange('water_temp', value)}
                placeholder="請輸入攝氏溫度"
              />
              <span className={styles.unitBox}>度</span>
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputLabel}>
                <span>能見度：</span>
              </label>
              <Radio
                className={styles.radioBox}
                name="visibility"
                options={VisiOptions}
                selectedRadio={formData.visibility}
                onChange={(value) => handleInputChange('visibility', value)}
              />
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputLabel}>
                <span>心得：</span>
              </label>
              <textarea
                className={styles.textarea}
                placeholder="輸入文章內容（字數上限600字）"
                maxLength={500}
                value={formData.log_exp}
                onChange={(e) => handleInputChange('log_exp', e.target.value)}
              />
            </div>

            <div className={styles.inputBox}>
              <label className={styles.inputLabel}>
                <span>隱私設定：</span>
              </label>
              <Radio
                className={styles.radioBox}
                name="privacy"
                options={PrivacyOptions}
                selectedRadio={formData.privacy}
                onChange={(value) => handleInputChange('privacy', value)}
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
        />
      )}
    </>
  );
}
