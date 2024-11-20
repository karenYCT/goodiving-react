import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import Tab from '@/components/tab';
import Input from '@/components/shirley/input';
import InputPsd from '@/components/shirley/input-psd';
import BtnPrimary from '@/components/buttons/btn-fill-primary';
import BtnLight from '@/components/buttons/btn-fill-light';
import stylesModify from './modify.module.css';
import styles from '@/components/layouts/layout.module.css';
import { useAuth } from '@/context/auth-context';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { AUTH_MODIFY, AUTH_MODIFYPSD } from '@/configs/api-path.js';
import toast from 'react-hot-toast';

export default function Modify() {
  const router = useRouter();
  // 會員登入裝態
  const { auth, openModal, isLoading } = useAuth();
  const { userData, setUserData, isUserContextLoading } = useUser();

  // TAB
  const [activeTab, setActiveTab] = useState(0);
  const tabItemss = ['更新個人資訊', '更新密碼'];
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // 更新個人資料表單
  const [myForm, setMyForm] = useState({
    id: userData.user_id || '',
    name: userData.user_full_name || '',
    phone: userData.user_phone_number || '',
    city: userData.user_city || '',
    district: userData.user_district || '',
    address: userData.user_address || '',
  });

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      setMyForm({
        id: userData.user_id || '',
        name: userData.user_full_name || '',
        phone: userData.user_phone_number || '',
        city: userData.user_city || '',
        district: userData.user_district || '',
        address: userData.user_address || '',
      });
    }
  }, [userData]);

  console.log(
    '看一下modify中的userData狀態:',
    JSON.stringify(userData, null, 4)
  );
  console.log('看一下modify中的myForm狀態:', JSON.stringify(myForm, null, 4));

  // 個人資料表單的錯誤訊息
  const [errorMessage, setErrorMessage] = useState({
    city: '',
    name: '',
    phone: '',
    district: '',
    address: '',
  });

  // 更改表單內容時，同時更改狀態
  const onchange = (e) => {
    const obj = { ...myForm, [e.target.name]: e.target.value || '' };
    // console.log('看一下目前myForm狀態(obj物件)：' + JSON.stringify(obj, null, 2));
    setMyForm(obj);
  };

  console.log('看一下onchange後的myForm', JSON.stringify(myForm, null, 4));

  // ZOD 資料驗證的 Schema: name 及 phone
  const registerSchema = z.object({
    name: z
      .string()
      .min(2, { message: '請輸入正確的中文姓名' })
      .regex(/^[\u4e00-\u9fa5]+$/, { message: '請輸入正確的中文姓名' }),
    phone: z.string().regex(/^09\d{2}-?\d{3}-?\d{3}$/, {
      message: '請輸入正確的手機格式',
    }),
  });

  // onBlur 的資料驗證
  const handleBlur = (field) => {
    const fieldSchema = registerSchema.shape[field];
    // console.log('registerSchema.shape:', registerSchema.shape);

    if (!fieldSchema) {
      return;
    }

    // Log確認是否進入該區塊
    // console.log(`Handling blur for field: ${field}`);

    const result = fieldSchema.safeParse(myForm[field]);
    if (field) {
      setErrorMessage((prev) => ({
        ...prev,
        [field]: result.success ? '' : result.error.issues[0].message,
      }));
    }

    // console.log(
    //   '這應該是剛render完的errorMessage1:',
    //   JSON.stringify(errorMessage, null, 4)
    // );

    // console.log(
    //   '進行onBlure的errorMessage2:',
    //   JSON.stringify(errorMessage, null, 4)
    // );
  };

  // 個人資料表單：按下「確定送出」按鈕
  const sendData = async (e) => {
    e.preventDefault();

    // 創建新的 AbortController
    const controller = new AbortController(); // 取消的控制器
    const signal = controller.signal;

    // 清空錯誤訊息並設置提交狀態
    setErrorMessage({
      city: '',
      name: '',
      phone: '',
      district: '',
      address: '',
    });
    // console.log(
    //   '送出按鈕的errorMessage4:',
    //   JSON.stringify(errorMessage, null, 4)
    // );
    console.log('看一下送出前的myForm狀態:', JSON.stringify(myForm, null, 4));
    const formData = { ...myForm };
    try {
      const response = await fetch(AUTH_MODIFY, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        signal,
      });
      const result = await response.json();
      console.log('伺服器回傳的result', JSON.stringify(result, null, 4));
      if (
        !result.success &&
        result.error &&
        Array.isArray(result.error.issues)
      ) {
        const errs = result.error.issues || '';
        errs.forEach((err) => {
          if (err) {
            const path = err.path[0];
            let zodErrorMessage = err.message;
            setErrorMessage((prev) => ({
              ...prev,
              [path]: zodErrorMessage,
            }));
          }
        });
        console.log(
          '看一下result.error.issues中的myForm狀態:',
          JSON.stringify(result.error.issues, null, 4)
        );
      }
      //
      if (result.affectedRows) {
        toast.success('個人資料更新成功');
        setUserData({
          ...userData,
          user_city: myForm.city,
          user_full_name: myForm.name,
          user_phone_number: myForm.phone,
          user_district: myForm.district,
          user_address: myForm.address,
        });
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('上一次請求已中止');
      } else {
        console.error('資料提交錯誤:', error);
      }
    }
  };

  // 重設個人資料 (恢復到資料庫竹狀態)
  const handleClearModifyData = () => {
    // 重置為資料庫的初始值
    const initialCityIndex = cityOptions.findIndex(
      (city) => city.value === userData.user_city
    );
    const initialDistrict = userData.user_district || '';

    setSelectedCity(initialCityIndex >= 0 ? initialCityIndex : 0);
    setSelectedDistrict(initialDistrict);

    setMyForm({
      id: userData.user_id,
      name: userData.user_full_name || '',
      phone: userData.user_phone_number || '',
      city: userData.user_city || '',
      district: userData.user_district || '',
      address: userData.user_address || '',
    });
    setErrorMessage({
      city: '',
      name: '',
      phone: '',
      district: '',
      address: '',
    });
  };

  // console.log('在modify頁的userData：', JSON.stringify(userData, null, 4));

  // 縣市選擇
  const [selectedCity, setSelectedCity] = useState('');
  // 行政區選擇
  const [selectedDistrict, setSelectedDistrict] = useState('');
  // 縣市資料
  const cityOptions = [
    { value: '請選擇縣市', label: '請選擇縣市' },
    { value: '臺北市', label: '臺北市' },
    { value: '新北市', label: '新北市' },
    { value: '桃園市', label: '桃園市' },
    { value: '臺中市', label: '臺中市' },
    { value: '臺南市', label: '臺南市' },
    { value: '高雄市', label: '高雄市' },
    { value: '宜蘭縣', label: '宜蘭縣' },
    { value: '新竹縣', label: '新竹縣' },
    { value: '苗栗縣', label: '苗栗縣' },
    { value: '彰化縣', label: '彰化縣' },
    { value: '南投縣', label: '南投縣' },
    { value: '雲林縣', label: '雲林縣' },
    { value: '嘉義縣', label: '嘉義縣' },
    { value: '屏東縣', label: '屏東縣' },
    { value: '花蓮縣', label: '花蓮縣' },
    { value: '臺東縣', label: '臺東縣' },
    { value: '澎湖縣', label: '澎湖縣' },
    { value: '基隆市', label: '基隆市' },
    { value: '嘉義市', label: '嘉義市' },
    { value: '新竹市', label: '新竹市' },
    { value: '金門縣', label: '金門縣' },
    { value: '連江縣', label: '連江縣' },
  ];
  // 行政區資料
  const arrayDistrict = [
    [],
    [
      '中正區',
      '大同區',
      '中山區',
      '萬華區',
      '信義區',
      '松山區',
      '大安區',
      '南港區',
      '北投區',
      '內湖區',
      '士林區',
      '文山區',
    ],
    [
      '板橋區',
      '新莊區',
      '泰山區',
      '林口區',
      '淡水區',
      '金山區',
      '八里區',
      '萬里區',
      '石門區',
      '三芝區',
      '瑞芳區',
      '汐止區',
      '平溪區',
      '貢寮區',
      '雙溪區',
      '深坑區',
      '石碇區',
      '新店區',
      '坪林區',
      '烏來區',
      '中和區',
      '永和區',
      '土城區',
      '三峽區',
      '樹林區',
      '鶯歌區',
      '三重區',
      '蘆洲區',
      '五股區',
    ],
    [
      '桃園區',
      '中壢區',
      '平鎮區',
      '八德區',
      '楊梅區',
      '蘆竹區',
      '龜山區',
      '龍潭區',
      '大溪區',
      '大園區',
      '觀音區',
      '新屋區',
      '復興區',
    ],
    [
      '中區',
      '東區',
      '南區',
      '西區',
      '北區',
      '北屯區',
      '西屯區',
      '南屯區',
      '太平區',
      '大里區',
      '霧峰區',
      '烏日區',
      '豐原區',
      '后里區',
      '東勢區',
      '石岡區',
      '新社區',
      '和平區',
      '神岡區',
      '潭子區',
      '大雅區',
      '大肚區',
      '龍井區',
      '沙鹿區',
      '梧棲區',
      '清水區',
      '大甲區',
      '外埔區',
      '大安區',
    ],
    [
      '中西區',
      '東區',
      '南區',
      '北區',
      '安平區',
      '安南區',
      '永康區',
      '歸仁區',
      '新化區',
      '左鎮區',
      '玉井區',
      '楠西區',
      '南化區',
      '仁德區',
      '關廟區',
      '龍崎區',
      '官田區',
      '麻豆區',
      '佳里區',
      '西港區',
      '七股區',
      '將軍區',
      '學甲區',
      '北門區',
      '新營區',
      '後壁區',
      '白河區',
      '東山區',
      '六甲區',
      '下營區',
      '柳營區',
      '鹽水區',
      '善化區',
      '大內區',
      '山上區',
      '新市區',
      '安定區',
    ],
    [
      '楠梓區',
      '左營區',
      '鼓山區',
      '三民區',
      '鹽埕區',
      '前金區',
      '新興區',
      '苓雅區',
      '前鎮區',
      '小港區',
      '旗津區',
      '鳳山區',
      '大寮區',
      '鳥松區',
      '林園區',
      '仁武區',
      '大樹區',
      '大社區',
      '岡山區',
      '路竹區',
      '橋頭區',
      '梓官區',
      '彌陀區',
      '永安區',
      '燕巢區',
      '田寮區',
      '阿蓮區',
      '茄萣區',
      '湖內區',
      '旗山區',
      '美濃區',
      '內門區',
      '杉林區',
      '甲仙區',
      '六龜區',
      '茂林區',
      '桃源區',
      '那瑪夏區',
    ],
    [
      '宜蘭市',
      '羅東鎮',
      '蘇澳鎮',
      '頭城鎮',
      '礁溪鄉',
      '壯圍鄉',
      '員山鄉',
      '冬山鄉',
      '五結鄉',
      '三星鄉',
      '大同鄉',
      '南澳鄉',
    ],
    [
      '竹北市',
      '竹東鎮',
      '新埔鎮',
      '關西鎮',
      '峨眉鄉',
      '寶山鄉',
      '北埔鄉',
      '橫山鄉',
      '芎林鄉',
      '湖口鄉',
      '新豐鄉',
      '尖石鄉',
      '五峰鄉',
    ],
    [
      '苗栗市',
      '通霄鎮',
      '苑裡鎮',
      '竹南鎮',
      '頭份鎮',
      '後龍鎮',
      '卓蘭鎮',
      '西湖鄉',
      '頭屋鄉',
      '公館鄉',
      '銅鑼鄉',
      '三義鄉',
      '造橋鄉',
      '三灣鄉',
      '南庄鄉',
      '大湖鄉',
      '獅潭鄉',
      '泰安鄉',
    ],
    [
      '彰化市',
      '員林鎮',
      '和美鎮',
      '鹿港鎮',
      '溪湖鎮',
      '二林鎮',
      '田中鎮',
      '北斗鎮',
      '花壇鄉',
      '芬園鄉',
      '大村鄉',
      '永靖鄉',
      '伸港鄉',
      '線西鄉',
      '福興鄉',
      '秀水鄉',
      '埔心鄉',
      '埔鹽鄉',
      '大城鄉',
      '芳苑鄉',
      '竹塘鄉',
      '社頭鄉',
      '二水鄉',
      '田尾鄉',
      '埤頭鄉',
      '溪州鄉',
    ],
    [
      '南投市',
      '埔里鎮',
      '草屯鎮',
      '竹山鎮',
      '集集鎮',
      '名間鄉',
      '鹿谷鄉',
      '中寮鄉',
      '魚池鄉',
      '國姓鄉',
      '水里鄉',
      '信義鄉',
      '仁愛鄉',
    ],
    [
      '斗六市',
      '斗南鎮',
      '虎尾鎮',
      '西螺鎮',
      '土庫鎮',
      '北港鎮',
      '莿桐鄉',
      '林內鄉',
      '古坑鄉',
      '大埤鄉',
      '崙背鄉',
      '二崙鄉',
      '麥寮鄉',
      '臺西鄉',
      '東勢鄉',
      '褒忠鄉',
      '四湖鄉',
      '口湖鄉',
      '水林鄉',
      '元長鄉',
    ],
    [
      '太保市',
      '朴子市',
      '布袋鎮',
      '大林鎮',
      '民雄鄉',
      '溪口鄉',
      '新港鄉',
      '六腳鄉',
      '東石鄉',
      '義竹鄉',
      '鹿草鄉',
      '水上鄉',
      '中埔鄉',
      '竹崎鄉',
      '梅山鄉',
      '番路鄉',
      '大埔鄉',
      '阿里山鄉',
    ],
    [
      '屏東市',
      '潮州鎮',
      '東港鎮',
      '恆春鎮',
      '萬丹鄉',
      '長治鄉',
      '麟洛鄉',
      '九如鄉',
      '里港鄉',
      '鹽埔鄉',
      '高樹鄉',
      '萬巒鄉',
      '內埔鄉',
      '竹田鄉',
      '新埤鄉',
      '枋寮鄉',
      '新園鄉',
      '崁頂鄉',
      '林邊鄉',
      '南州鄉',
      '佳冬鄉',
      '琉球鄉',
      '車城鄉',
      '滿州鄉',
      '枋山鄉',
      '霧台鄉',
      '瑪家鄉',
      '泰武鄉',
      '來義鄉',
      '春日鄉',
      '獅子鄉',
      '牡丹鄉',
      '三地門鄉',
    ],
    [
      '花蓮市',
      '鳳林鎮',
      '玉里鎮',
      '新城鄉',
      '吉安鄉',
      '壽豐鄉',
      '秀林鄉',
      '光復鄉',
      '豐濱鄉',
      '瑞穗鄉',
      '萬榮鄉',
      '富里鄉',
      '卓溪鄉',
    ],
    [
      '臺東市',
      '成功鎮',
      '關山鎮',
      '長濱鄉',
      '海端鄉',
      '池上鄉',
      '東河鄉',
      '鹿野鄉',
      '延平鄉',
      '卑南鄉',
      '金峰鄉',
      '大武鄉',
      '達仁鄉',
      '綠島鄉',
      '蘭嶼鄉',
      '太麻里鄉',
    ],
    ['馬公市', '湖西鄉', '白沙鄉', '西嶼鄉', '望安鄉', '七美鄉'],
    ['仁愛區', '中正區', '信義區', '中山區', '安樂區', '暖暖區', '七堵區'],
    ['東區', '西區'],
    ['東區', '北區', '香山區'],
    ['金城鎮', '金湖鎮', '金沙鎮', '金寧鄉', '烈嶼鄉', '烏坵鄉'],
    ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉'],
  ];

  const handleCityChange = (e) => {
    const selectedCityValue = e.target.value;
    const selectedCityIndex = cityOptions.findIndex(
      (city) => city.value === selectedCityValue
    );

    setSelectedCity(selectedCityIndex);
    setSelectedDistrict(''); // 重置行政區選擇
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictValue = e.target.value;

    if (selectedDistrictValue) {
      setSelectedDistrict(selectedDistrictValue);
    }
  };

  // 更新密碼表單
  const [myPasswordForm, setMyPasswordForm] = useState({
    id: userData.user_id,
    oldPassword: '',
    newPassword: '',
    checkNewPassword: '',
  });

  const handleClearPassword = (e) => {
    e.preventDefault();
    setMyPasswordForm({
      oldPassword: '',
      newPassword: '',
      checkNewPassword: '',
    });
    setpasswordError({
      oldPassword: '',
      newPassword: '',
      checkNewPassword: '',
    });
  };

  // 更改密碼表單內容時，同時更改狀態
  const handleChangePassword = (e) => {
    const passwordObj = { ...myPasswordForm, [e.target.name]: e.target.value };
    console.log(
      '看一下目前myPasswordForm狀態(passwordObj)：' +
        JSON.stringify(passwordObj, null, 2)
    );
    setMyPasswordForm(passwordObj);
  };

  // 密碼的錯誤訊息
  const [passwordError, setpasswordError] = useState({
    oldPassword: '',
    newPassword: '',
    checkNewPassword: '',
  });

  // ZOD 資料驗證的 Schema: oldPassword 及 newPassword 及 checkNewPassword
  const passwordSchema = z.object({
    oldPassword: z
      .string()
      .min(8, { message: '密碼須至少8字元，包含英文及數字' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: '密碼須至少8字元，包含英文及數字',
      }),
    newPassword: z
      .string()
      .min(8, { message: '密碼須至少8字元，包含英文及數字' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: '密碼須至少8字元，包含英文及數字',
      }),
    checkNewPassword: z
      .string()
      .min(8, { message: '密碼須至少8字元，包含英文及數字' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: '密碼須至少8字元，包含英文及數字',
      }),
  });

  // 密碼的 onBlur 的資料驗證
  const handlePasswordBlur = (field) => {
    const fieldSchema = passwordSchema.shape[field];
    // console.log('registerSchema.shape:', registerSchema.shape);
    if (!fieldSchema) {
      return;
    }

    const result = fieldSchema.safeParse(myPasswordForm[field]);
    if (field) {
      setpasswordError((prev) => ({
        ...prev,
        [field]: result.success ? '' : result.error.issues[0].message,
      }));
    }

    if (field == 'newPassword' || field == 'checkNewPassword') {
      if (
        myPasswordForm.newPassword &&
        myPasswordForm.checkNewPassword &&
        myPasswordForm.newPassword !== myPasswordForm.checkNewPassword
      ) {
        setpasswordError((prev) => ({
          ...prev,
          newPassword: '確認密碼與密碼不相符',
          checkNewPassword: '確認密碼與密碼不相符',
        }));
        // return;
      }
    }
  };

  // 送出更改密碼表單
  const sendPassword = async (e) => {
    e.preventDefault();
    setpasswordError({
      oldPassword: '',
      newPassword: '',
      checkNewPassword: '',
    });
    const formPasswordData = { ...myPasswordForm };
    try {
      const response = await fetch(AUTH_MODIFYPSD, {
        method: 'PUT',
        body: JSON.stringify(formPasswordData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const result = await response.json();
      console.log(
        '伺服器回傳的Passwordresult',
        JSON.stringify(result, null, 4)
      );
      if (!result.success) {
        const errs = result.error.issues || '';
        errs.forEach((err) => {
          if (err) {
            const path = err.path[0];
            let zodErrorMessage = err.message;
            setpasswordError((prev) => ({
              ...prev,
              [path]: zodErrorMessage,
            }));
          }
        });
        console.log(
          '看一下result.error.issues中的myForm狀態:',
          JSON.stringify(result.error.issues, null, 4)
        );
      }
      if (result.affectedRows) {
        toast.success('密碼更新成功');
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    setMyForm((prevForm) => ({
      ...prevForm,
      city: cityOptions[selectedCity]?.value || '',
      district: selectedDistrict || '',
    }));
  }, [selectedCity, selectedDistrict]);

  // 找到資料庫中的城市和行政區的索引位置
  useEffect(() => {
    const initialCityIndex = cityOptions.findIndex(
      (city) => city.value === userData.user_city
    );
    const initialDistrict = userData.user_district || '';

    setSelectedCity(initialCityIndex >= 0 ? initialCityIndex : 0);
    setSelectedDistrict(initialDistrict);
  }, [userData]);

  // 檢查有沒有登入，如果沒有就轉到首頁
  useEffect(() => {
    if (!isLoading && !auth.token) {
      openModal();
      router.replace('/');
    }
  }, [auth.token, openModal, router, isLoading]);

  // 加載中
  if (isLoading || isUserContextLoading) {
    return <div>Loading...</div>; // 替換為更好的 loading 畫面
  }

  if (!auth.token) {
    return null;
  }

  return (
    <Layout>
      <LeftSide>
        <MemberSidebar />
      </LeftSide>
      <div className={styles.main}>
        <Tab
          tabItems={tabItemss}
          activeTab={activeTab}
          handleTabClick={handleTabClick}
        />

        {activeTab === 0 ? (
          <>
            <form
              name="modifyFrom"
              onSubmit={(e) => {
                sendData(e);
              }}
            >
              <input name="id" type="hidden" value={myForm.id}></input>
              <div className={stylesModify['input-content']}>
                <div className={stylesModify['input-row']}>
                  <div className={stylesModify['input-box1']}>
                    <div className={stylesModify['input-label1']}>帳號</div>
                    <div className={stylesModify['input-type']}>
                      {userData.user_email}
                    </div>
                  </div>
                  <div className={stylesModify['input-box1']}>
                    <div className={stylesModify['input-label1']}>會員等級</div>
                    <div className={stylesModify['input-type']}>一般會員</div>
                  </div>
                </div>
                <div className={stylesModify['input-row']}>
                  <div className={stylesModify['input-box']}>
                    <div className={stylesModify['input-label']}>姓名</div>
                    <div className={stylesModify['input-type']}>
                      <Input
                        name="name"
                        value={myForm.name || ''}
                        onChange={onchange}
                        isError={errorMessage.name}
                        errorMessage={errorMessage.name}
                        onBlur={() => handleBlur('name')}
                      />
                    </div>
                  </div>
                  <div className={stylesModify['input-box1']}>
                    <div className={stylesModify['input-label1']}>性別</div>
                    <div className={stylesModify['input-type']}>
                      {userData.user_sex == 2 ? '女' : '男'}
                    </div>
                  </div>
                </div>

                <div className={stylesModify['input-row']}>
                  <div className={stylesModify['input-box']}>
                    <div className={stylesModify['input-label']}>手機號碼</div>
                    <div className={stylesModify['input-type']}>
                      <Input
                        name="phone"
                        placeholder="請輸入09開頭的10碼數字"
                        value={myForm.phone || ''}
                        onChange={onchange}
                        isError={errorMessage.phone}
                        errorMessage={errorMessage.phone}
                        onBlur={() => handleBlur('phone')}
                      />
                    </div>
                  </div>
                  <div className={stylesModify['input-box1']}>
                    <div className={stylesModify['input-label']}>生日</div>
                    <div className={stylesModify['input-type5']}>
                      {userData.user_birthday}
                    </div>
                  </div>
                </div>

                <div className={stylesModify['input-row']}>
                  <div className={stylesModify['input-box2']}>
                    <div className={stylesModify['input-label3']}>常用地址</div>
                    <div className={stylesModify['input-type2']}>
                      <div className={stylesModify.container}>
                        <div className={stylesModify.selectContainer}>
                          <select
                            name="city"
                            className={`${stylesModify.selectButton} ${
                              selectedCity ? stylesModify.selected : ''
                            }`}
                            value={cityOptions[selectedCity]?.value || ''}
                            onChange={handleCityChange}
                          >
                            {cityOptions.map((city) => (
                              <option key={city.value} value={city.value || ''}>
                                {city.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className={stylesModify.selectContainer}>
                          <select
                            name="district"
                            className={`${stylesModify.selectButton} ${
                              selectedDistrict ? stylesModify.selected : ''
                            }`}
                            value={selectedDistrict || ''}
                            onChange={handleDistrictChange}
                            disabled={selectedCity === 0}
                          >
                            <option value="">請選擇行政區</option>
                            {selectedCity &&
                              arrayDistrict[selectedCity].map(
                                (district, index) => (
                                  <option key={index} value={district || ''}>
                                    {district}
                                  </option>
                                )
                              )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={stylesModify['input-row3']}>
                  <div className={stylesModify['input-type3']}>
                    <Input
                      name="address"
                      value={myForm.address || ''}
                      onChange={onchange}
                      placeholder="請輸入道路街名"
                      isError={errorMessage.address}
                      errorMessage={errorMessage.address}
                      onBlur={() => handleBlur('address')}
                    />
                  </div>
                </div>
              </div>

              {/* <div className={stylesModify['input-content2']}>
                <div className={stylesModify['input-row']}>
                  <div className={stylesModify['input-box3']}>
                    <div className={stylesModify['input-label']}>
                      快速登入設定
                    </div>
                    <div className={stylesModify['input-type4']}>
                      <div className={stylesModify['third-btn-box']}>
                        <FaLine className={stylesModify['third-btn-icon']} />
                        未綁定
                      </div>
                      <div className={stylesModify['third-btn-box']}>
                        <FcGoogle className={stylesModify['third-btn-icon']} />
                        已綁定
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* gormin裝置綁定 */}
              {/* <div className={stylesModify['input-content2']}>
                <div className={stylesModify['input-row']}>
                  <div className={stylesModify['input-box4']}>
                    <div className={stylesModify['input-label']}>裝置綁定</div>
                    <div className={stylesModify['input-type2']}>
                      <div className={stylesModify['third-btn-box2']}>
                        <img
                          src="/garmin-logo-14.png"
                          className={stylesModify['third-btn-icon2']}
                        />
                        未綁定
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className={stylesModify['third-btn-box3']}>
                <BtnLight
                  onClick={(e) => {
                    handleClearModifyData(e);
                  }}
                >
                  取消
                </BtnLight>
                <BtnPrimary type="submit">確認送出</BtnPrimary>
              </div>
            </form>
          </>
        ) : (
          <>
            <form
              name="passwordForm"
              onSubmit={(e) => {
                sendPassword(e);
              }}
            >
              <input name="id" type="hidden" value={myPasswordForm.id}></input>
              <div className={stylesModify['input-content']}>
                <div className={stylesModify['input-row']}>
                  <div className={stylesModify['input-box2']}>
                    <div className={stylesModify['input-label2']}>目前密碼</div>
                    <div className={stylesModify['input-type3']}>
                      <InputPsd
                        name="oldPassword"
                        type="password"
                        value={myPasswordForm.oldPassword || ''}
                        onChange={handleChangePassword}
                        isError={passwordError.oldPassword}
                        errorMessage={passwordError.oldPassword}
                        onBlur={() => handlePasswordBlur('oldPassword')}
                      />
                    </div>
                  </div>
                </div>

                <div className={stylesModify['input-row']}>
                  <div className={stylesModify['input-box2']}>
                    <div className={stylesModify['input-label2']}>新密碼</div>
                    <div className={stylesModify['input-type3']}>
                      <InputPsd
                        name="newPassword"
                        type="password"
                        value={myPasswordForm.newPassword || ''}
                        onChange={handleChangePassword}
                        isError={passwordError.newPassword}
                        errorMessage={passwordError.newPassword}
                        onBlur={() => handlePasswordBlur('newPassword')}
                      />
                    </div>
                  </div>
                </div>

                <div className={stylesModify['input-row']}>
                  <div className={stylesModify['input-box2']}>
                    <div className={stylesModify['input-label2']}>
                      新密碼確認
                    </div>
                    <div className={stylesModify['input-type3']}>
                      <InputPsd
                        name="checkNewPassword"
                        type="password"
                        value={myPasswordForm.checkNewPassword || ''}
                        onChange={handleChangePassword}
                        isError={passwordError.checkNewPassword}
                        errorMessage={passwordError.checkNewPassword}
                        onBlur={() => handlePasswordBlur('checkNewPassword')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={stylesModify['third-btn-box4']}>
                <BtnLight
                  onClick={(e) => {
                    handleClearPassword(e);
                  }}
                >
                  重新填寫
                </BtnLight>
                <BtnPrimary type="submit">確認送出</BtnPrimary>
              </div>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
}
