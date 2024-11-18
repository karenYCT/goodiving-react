import React, { useState, useEffect } from 'react';
import styles from '@/styles/home.module.css';
import Navbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer2';
import LoginModal from '@/components/shirley/loginModal';
import SelectEllipse2Index from '@/components/dropdown/select-ellipse2-index';
import DatePickerIndex from '@/components/dropdown/date-picker-index';
import SelectEllipseIndex from '@/components/dropdown/select-ellipse-index';
import Button from '@/components/buttons/btnlg-icon-right';
import SelectEllipse2Indexsm from '@/components/dropdown/select-ellipse2-index-sm';
import DatePickerIndexsm from '@/components/dropdown/date-picker-index-sm';
import SelectEllipseIndexsm from '@/components/dropdown/select-ellipse-index-sm';
import Buttonsm from '@/components/buttons/btn-icon-right';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // 搜尋篩選的狀態
  const [selectedLoc, setSelectedLoc] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // 搜尋篩選選項
  const locOptions = [
    { label: '東北角', value: 1 },
    { label: '墾丁', value: 2 },
    { label: '小琉球', value: 3 },
    { label: '綠島', value: 4 },
    { label: '蘭嶼', value: 5 },
  ];

  const typeOptions = [
    { label: '體驗課程', value: 1 },
    { label: '旅遊課程', value: 2 },
    { label: '基礎證照課程', value: 3 },
    { label: '進階證照課程', value: 4 },
    { label: '專業證照課程', value: 5 },
  ];

  // 格式化日期
  const formatDate = (date) => {
    if (!date) return undefined;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 選擇地點
  const getLocValue = (label) => {
    const option = locOptions.find((opt) => opt.label === label);
    return option ? option.value : '';
  };

  // 選擇課程類別
  const getTypeValue = (label) => {
    const option = typeOptions.find((opt) => opt.label === label);
    return option ? option.value : '';
  };

  // 處理搜尋按鈕點擊事件
  const handleSearch = () => {
    const locParam = getLocValue(selectedLoc);
    const dateParam = formatDate(selectedDate);
    const typeParam = getTypeValue(selectedType);

    const queryParams = new URLSearchParams();
    if (locParam) queryParams.set('loc', locParam);
    if (dateParam) queryParams.set('date', dateParam);
    if (typeParam) queryParams.set('type', typeParam);

    // 導航到搜尋結果頁面
    router.push({
      pathname: '/lesson', // 可以改成你想要的結果頁面路徑
      search: queryParams.toString(),
    });
  };

  return (
    <div className={styles.page}>
      <Navbar openModal={openModal} />
      <LoginModal isOpen={isOpen} closeModal={closeModal} />
      <div className={styles.homeImgContainer}>
        <Image
          className={styles.homeImg}
          src="/home-page.jpg"
          alt="home"
          width={1920}
          height={1080}
          sizes="(max-width: 576px) 440px, (max-width: 1024px) 1024px, 1920px"
          priority
        />
        <div className={styles.homeContent}>
          <div className={styles.homeSlogan}>
            <h2>
              解鎖深海自由
              <br />
              和你一起開啟海下冒險
            </h2>
            <div className={styles.homeSloganEN}>
              <h3>&quot;The sea, once it casts its spell,</h3>
              <h3 style={{ width: 'fit-content' }}>
                holds one in its net of wonder forever.&quot;
              </h3>
              <h3 style={{ textAlign: 'right' }}>—Jacques Cousteau</h3>
            </div>
          </div>
          <div className={styles.homeSearch}>
            <div className={styles.desktopOnly}>
              <div className={styles.homeDropdown}>
                <SelectEllipse2Index
                  options={locOptions.map((option) => option.label)}
                  option={selectedLoc}
                  onChange={setSelectedLoc}
                />
                <DatePickerIndex
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
                <SelectEllipseIndex
                  options={typeOptions.map((opt) => opt.label)}
                  option={selectedType}
                  onChange={setSelectedType}
                />
              </div>
              <Button onClick={handleSearch}>搜尋課程</Button>
            </div>
            <div className={styles.mobileOnly}>
              <div className={styles.homeDropdown}>
                <SelectEllipse2Indexsm
                  options={locOptions.map((option) => option.label)}
                  option={selectedLoc}
                  onChange={setSelectedLoc}
                />
                <DatePickerIndexsm
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
                <SelectEllipseIndexsm
                  options={typeOptions.map((opt) => opt.label)}
                  option={selectedType}
                  onChange={setSelectedType}
                />
              </div>
              <Buttonsm onClick={handleSearch}>搜尋課程</Buttonsm>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
