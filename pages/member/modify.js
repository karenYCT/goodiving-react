import React, { useState } from 'react';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import Tab from '@/components/tab';
import styles from '@/components/layouts/layout.module.css';
import stylesModify from './modify.module.css';
import Input from '@/components/shirley/input';
import InputPsd from '@/components/shirley/input-psd';
import { FaLine } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import BtnPrimary from '@/components/buttons/btn-fill-primary';
import BtnLight from '@/components/buttons/btn-fill-light';

export default function Modify() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItemss = ['更新個人資訊', '更新密碼'];

  const cityOptions = [
    { value: '0', label: '請選擇縣市' },
    { value: '1', label: '臺北市' },
    { value: '2', label: '新北市' },
    { value: '3', label: '桃園市' },
    { value: '4', label: '臺中市' },
    { value: '5', label: '臺南市' },
    { value: '6', label: '高雄市' },
    { value: '7', label: '宜蘭縣' },
    { value: '8', label: '新竹縣' },
    { value: '9', label: '苗栗縣' },
    { value: '10', label: '彰化縣' },
    { value: '11', label: '南投縣' },
    { value: '12', label: '雲林縣' },
    { value: '13', label: '嘉義縣' },
    { value: '14', label: '屏東縣' },
    { value: '15', label: '花蓮縣' },
    { value: '16', label: '臺東縣' },
    { value: '17', label: '澎湖縣' },
    { value: '18', label: '基隆市' },
    { value: '19', label: '嘉義市' },
    { value: '20', label: '新竹市' },
    { value: '21', label: '金門縣' },
    { value: '22', label: '連江縣' },
  ];

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

  const [selectedCity, setSelectedCity] = useState(''); // 縣市選擇
  const [selectedDistrict, setSelectedDistrict] = useState(''); // 區域選擇

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict(''); // 重置行政區選擇
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

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
            <div className={stylesModify['input-content']}>
              <div className={stylesModify['input-row']}>
                <div className={stylesModify['input-box']}>
                  <div className={stylesModify['input-label']}>帳號</div>
                  <div className={stylesModify['input-type']}>
                    candy123456@gmail.com
                  </div>
                </div>
                <div className={stylesModify['input-box']}>
                  <div className={stylesModify['input-label']}>會員等級</div>
                  <div className={stylesModify['input-type']}>一般會員</div>
                </div>
              </div>

              <div className={stylesModify['input-row']}>
                <div className={stylesModify['input-box']}>
                  <div className={stylesModify['input-label']}>手機號碼</div>
                  <div className={stylesModify['input-type']}>0921-332-159</div>
                </div>
                <div className={stylesModify['input-box']}>
                  <div className={stylesModify['input-label']}>生日</div>
                  <div className={stylesModify['input-type']}>1945-07-03</div>
                </div>
              </div>

              <div className={stylesModify['input-row']}>
                <div className={stylesModify['input-box2']}>
                  <div className={stylesModify['input-label3']}>常用地址</div>
                  <div className={stylesModify['input-type2']}>
                    <div className={stylesModify.container}>
                      <div className={stylesModify.selectContainer}>
                        <select
                          className={`${stylesModify.selectButton} ${
                            selectedCity ? stylesModify.selected : ''
                          }`}
                          value={selectedCity}
                          onChange={handleCityChange}
                        >
                          {cityOptions.map((city) => (
                            <option key={city.value} value={city.value}>
                              {city.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className={stylesModify.selectContainer}>
                        <select
                          className={`${stylesModify.selectButton} ${
                            selectedDistrict ? stylesModify.selected : ''
                          }`}
                          value={selectedDistrict}
                          onChange={handleDistrictChange}
                          disabled={!selectedCity}
                        >
                          <option value="">請選擇行政區</option>
                          {selectedCity &&
                            arrayDistrict[selectedCity].map(
                              (district, index) => (
                                <option key={index} value={district}>
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
                    name=""
                    placeholder="請輸入道路街名"
                    value=""
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>

            <div className={stylesModify['input-content2']}>
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
            </div>

            <div className={stylesModify['input-content2']}>
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
            </div>

            <div className={stylesModify['third-btn-box3']}>
              <BtnLight>取消</BtnLight>
              <BtnPrimary>確認送出</BtnPrimary>
            </div>
          </>
        ) : (
          <>
            <div className={stylesModify['input-content']}>
              <div className={stylesModify['input-row']}>
                <div className={stylesModify['input-box2']}>
                  <div className={stylesModify['input-label2']}>目前密碼</div>
                  <div className={stylesModify['input-type3']}>
                    <InputPsd
                      name=""
                      type="password"
                      placeholder=""
                      value=""
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>

              <div className={stylesModify['input-row']}>
                <div className={stylesModify['input-box2']}>
                  <div className={stylesModify['input-label2']}>新密碼</div>
                  <div className={stylesModify['input-type3']}>
                    <InputPsd
                      name=""
                      type="password"
                      placeholder=""
                      value=""
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>

              <div className={stylesModify['input-row']}>
                <div className={stylesModify['input-box2']}>
                  <div className={stylesModify['input-label2']}>新密碼確認</div>
                  <div className={stylesModify['input-type3']}>
                    <InputPsd
                      name=""
                      type="password"
                      placeholder=""
                      value=""
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={stylesModify['third-btn-box4']}>
              <BtnLight>重新填寫</BtnLight>
              <BtnPrimary>確認送出</BtnPrimary>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
