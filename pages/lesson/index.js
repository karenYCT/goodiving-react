import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import styles from './index.module.css';
import SelectEllipse from '@/components/dropdown/select-ellipse';
import SelectEllipse2 from '@/components/dropdown/select-ellipse2';
import DatePicker from '@/components/dropdown/date-picker';
import Button from '@/components/buttons/btn-icon-right';
import SelectRect from '@/components/dropdown/select-rect';
import InputCheck from '@/components/inputs/input-check';
import Card from '@/components/tzu/card-list';
import Pagination from '@/components/pagination';
import { useRouter } from 'next/router';

export default function Lesson() {
  const router = useRouter();
  // const [isLocSelected, setIsLocSelected] = useState('');
  // const [isDateSelected, setIsDateSelected] = useState('');
  // const [isTypeSelected, setIsTypeSelected] = useState('');
  // const [sortBy, setSortBy] = useState('排序方式');
  // const [selectedDept, setSelectedDept] = useState([]);
  // const [isCheck, setIsCheck] = useState(false);

  // const handleIsCheck = () => {
  //   setIsCheck(!isCheck);
  // };

  const [filters, setFilters] = useState({
    loc: '',
    date: '',
    type: '',
    dept: '',
    exp: '',
    gender: '',
    sort: '',
  });

  // 篩選的狀態
  const [selectedLoc, setSelectedLoc] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedType, setSelectedType] = useState([]);

  const [selectedDept, setSelectedDept] = useState([]);
  const [selectedExp, setSelectedExp] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);

  const [selectedSort, setSelectedSort] = useState('');

  // 篩選選項
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

  const deptOptions = [
    { label: 'PADI', value: '3' },
    { label: 'SSI', value: '4' },
    { label: 'CMAS', value: '1' },
    { label: 'NAUI', value: '2' },
  ];

  const expOptions = [
    { label: '300+', value: '300' },
    { label: '200+', value: '200' },
    { label: '100+', value: '100' },
  ];

  const genderOptions = [
    { label: '男性', value: '男性' },
    { label: '女性', value: '女性' },
  ];

  const sortOptions = [
    { value: 'date_asc', label: '開課日期從近到遠' },
    { value: 'date_desc', label: '開課日期從遠到近' },
    { value: 'price_asc', label: '價格從低到高' },
    { value: 'price_desc', label: '價格從高到低' },
    { value: 'rate_asc', label: '教練評價從低到高' },
    { value: 'rate_desc', label: '教練評價從高到低' },
  ];

  // 更新 URL Query
  useEffect(() => {
    const query = {
      loc: selectedLoc,
      type: selectedType,
      dept: selectedDept.join(','),
      exp: selectedExp.join(','),
      gender: selectedGender.join(','),
      date: selectedDate ? selectedDate.toISOString().split('T')[0] : null,
      sort: selectedSort,
    };

    // 過濾掉空的 query 參數
    Object.keys(query).forEach((key) => query[key] === '' && delete query[key]);

    // 使用 replace 來更新 URL 而不刷新頁面
    router.replace({ pathname: '/lesson', query }, undefined, {
      shallow: true,
    });
  }, [
    selectedLoc,
    selectedType,
    selectedDate,
    selectedDept,
    selectedExp,
    selectedGender,
    selectedSort,
    router,
  ]);

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <div className={styles.searchbar}>
            <div className={styles.search}>
              <SelectEllipse2
                options={locOptions.map((option) => option.label)}
                option={
                  selectedLoc
                    ? locOptions.find((option) => option.value === selectedLoc)
                        ?.label
                    : '依地點搜尋'
                }
                onChange={(selectedLabel) => {
                  const selectedOption = locOptions.find(
                    (option) => option.label === selectedLabel
                  );
                  setSelectedLoc(selectedOption ? selectedOption.value : '');
                }}
              />
              <DatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <SelectEllipse
                options={typeOptions.map((option) => option.label)} // 傳遞字串陣列
                option={
                  selectedType
                    ? typeOptions.find(
                        (option) => option.value === selectedType
                      )?.label
                    : '依課程類別搜尋'
                }
                onChange={(selectedLabel) => {
                  const selectedOption = typeOptions.find(
                    (option) => option.label === selectedLabel
                  );
                  setSelectedType(selectedOption ? selectedOption.value : '');
                }}
              />
            </div>
            <Button>重新搜尋</Button>
          </div>
          <div className={styles.main}>
            <div className={styles.sidebar}>
              <h4>排序</h4>
              <SelectRect
                options={sortOptions.map((option) => option.label)}
                option={
                  sortOptions.find((option) => option.value === selectedSort)
                    ?.label || '選擇排序'
                }
                onChange={(selectedLabel) => {
                  const selectedOption = sortOptions.find(
                    (option) => option.label === selectedLabel
                  );
                  setSelectedSort(selectedOption ? selectedOption.value : '');
                }}
              />
              <h4>篩選</h4>
              <h6>證照單位</h6>
              <div className={styles.options}>
                <InputCheck
                  name="dept"
                  options={deptOptions}
                  selectedValues={selectedDept}
                  onChange={setSelectedDept}
                />
              </div>
              <h6>教練經驗</h6>
              <div className={styles.options}>
                <InputCheck
                  name="exp"
                  options={expOptions}
                  selectedValues={selectedExp}
                  onChange={setSelectedExp}
                />
              </div>
              <h6>教練性別</h6>
              <div className={styles.options}>
                <InputCheck
                  name="gender"
                  options={genderOptions}
                  selectedValues={selectedGender}
                  onChange={setSelectedGender}
                />
              </div>
            </div>
            <div className={styles.list}>
              <h4>
                搜尋&nbsp;
                {/* {isLocSelected || isDateSelected || isTypeSelected} */}
                &nbsp;結果
              </h4>
              <Card />
              <Card />
              <Card />
              <Pagination />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
