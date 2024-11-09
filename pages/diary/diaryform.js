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
    max_depth: '',
    bottom_time: '',
    water_temp: '',
    visibility: '2',
    log_exp: '',
    privacy: '1',
    images: [],
  });

  const [siteOptions, setSiteOptions] = useState([]);
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
    setFormData((prev) => ({
      ...prev,
      images: images,
    }));
    setShowUpload(false);
  };

  //處理表單提交
  const handleSubmit = async () => {
    try {
      //先上傳圖片
      const imageUrls = await Promise.all(
        formData.images.map(async (image) => {
          const formData = new FormData();
          formData.append('image', image);

          const response = await fetch(`${API_SERVER}/upload`, {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();
          return data.url;
        })
      );

      //提交其他表單內容
      const response = await fetch(`${API_SERVER}/diary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          images: imageUrls,
        }),
      });
      if (!response.ok) {
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
      <Modallog>
        <div className={styles.functionContainer}>
          <ButtonFG onClick={handleSaveDraft}>儲存成草稿</ButtonFG>
          <ButtonFP2 onClick={handleSubmit}>發佈</ButtonFP2>
        </div>
        <div className={styles.container}>
          <div
            className={styles.imgContainer}
            onClick={() => setShowUpload(true)}
          >
            <FaCamera />
            <h5>點擊新增照片</h5>
          </div>

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
          onConfirm={handleImagesConfirm}
          onCancel={() => setShowUpload(false)}
        />
      )}
    </>
  );
}
