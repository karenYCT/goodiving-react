import React, { useState, useEffect } from 'react';
import { LESSON_LIST } from '@/configs/api-path';
import Layout from '@/components/layouts/layout';
import styles from './index.module.css';
import SelectEllipse from '@/components/dropdown/select-ellipse';
import SelectEllipse2 from '@/components/dropdown/select-ellipse2';
import DatePicker from '@/components/dropdown/date-picker';
import Button from '@/components/buttons/btn-fill-gray';
import SelectRect from '@/components/dropdown/select-rect';
import InputCheck from '@/components/inputs/input-check';
import Card from '@/components/tzu/card-list';
import Pagination from '@/components/tzu/pagination';
import { useRouter } from 'next/router';

export default function Lesson() {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);

  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 搜尋篩選的狀態
  const [selectedLoc, setSelectedLoc] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const [selectedSort, setSelectedSort] = useState('');

  const [selectedDept, setSelectedDept] = useState([]); // 多選
  const [selectedExp, setSelectedExp] = useState([]); // 單選
  const [selectedGender, setSelectedGender] = useState([]); // 單選，為了配合組件還是用陣列

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

  const sortOptions = [
    { label: '開課日期從近到遠', value: 'date_asc' },
    { label: '開課日期從遠到近', value: 'date_desc' },
    { label: '價格從低到高', value: 'price_asc' },
    { label: '價格從高到低', value: 'price_desc' },
    { label: '教練評價從低到高', value: 'rate_asc' },
    { label: '教練評價從高到低', value: 'rate_desc' },
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

  // 統一處理 URL 查詢參數更新
  // const updateQuery = (newParams) => {
  //   const q = { ...router.query };

  //   // 更新或刪除參數
  //   Object.entries(newParams).forEach(([key, value]) => {
  //     if (value === undefined) {
  //       delete q[key];
  //     } else {
  //       q[key] = value;
  //     }
  //   });

  //   router.push(
  //     {
  //       pathname: router.pathname,
  //       query: q,
  //     },
  //     undefined,
  //     { shallow: true }
  //   );
  // };

  // 處理分頁變更
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const query = { ...router.query, page };
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  // 處理篩選變更時重設頁碼
  const updateQuery = (newParams) => {
    const q = { ...router.query };

    // 更新查詢參數
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined) {
        delete q[key];
      } else {
        q[key] = value;
      }
    });

    // 重設頁碼為 1
    delete q.page;
    setCurrentPage(1);

    router.push(
      {
        pathname: router.pathname,
        query: q,
      },
      undefined,
      { shallow: true }
    );
  };

  // 處理日期選擇
  const handleDateChange = (date) => {
    setSelectedDate(date);
    updateQuery({ date: date ? formatDate(date) : undefined });
  };

  // 格式化日期
  const formatDate = (date) => {
    if (!date) return undefined;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 處理地點選擇
  const handleLocChange = (selectedLabel) => {
    const selectedOption = locOptions.find(
      (option) => option.label === selectedLabel
    );
    setSelectedLoc(selectedOption ? selectedOption.value : '');
    updateQuery({ loc: selectedOption?.value });
  };

  // 處理課程類型選擇
  const handleTypeChange = (selectedLabel) => {
    const selectedOption = typeOptions.find(
      (option) => option.label === selectedLabel
    );
    setSelectedType(selectedOption ? selectedOption.value : '');
    updateQuery({ type: selectedOption?.value });
  };

  // 處理排序選擇
  const handleSortChange = (selectedLabel) => {
    const selectedOption = sortOptions.find(
      (option) => option.label === selectedLabel
    );
    setSelectedSort(selectedOption ? selectedOption.value : '');
    updateQuery({ sort: selectedOption?.value });
  };

  // 處理證照單位選擇（多選）
  const handleDeptChange = (values) => {
    setSelectedDept(values);
    updateQuery({ dept: values.length > 0 ? values : undefined });
  };

  // 處理教練經驗選擇（單選）
  const handleExpChange = (values) => {
    // 永遠只取最後選擇的值
    const newValue = values[values.length - 1];
    setSelectedExp(newValue ? [newValue] : []);
    updateQuery({ exp: newValue });
  };

  // 處理教練性別選擇（單選）
  const handleGenderChange = (values) => {
    // 永遠只取最後選擇的值
    const newValue = values[values.length - 1];
    setSelectedGender(newValue ? [newValue] : []);
    updateQuery({ gender: newValue });
  };

  // 清除搜尋
  const handleClear = () => {
    // 清除狀態
    setSelectedLoc('');
    setSelectedDate('');
    setSelectedType('');

    // 清除 URL 參數
    const q = { ...router.query };
    delete q.loc;
    delete q.date;
    delete q.type;

    // 更新 URL，如果沒有任何參數則顯示乾淨的 URL
    const queryString = new URLSearchParams(q).toString();
    router.push(queryString ? `?${queryString}` : router.pathname);
  };

  const handleClear2 = () => {
    setSelectedSort('');
    setSelectedDept([]);
    setSelectedExp([]);
    setSelectedGender([]);

    // 清除 URL 參數
    const q = { ...router.query };
    delete q.sort;
    delete q.dept;
    delete q.exp;
    delete q.gender;

    // 更新 URL，如果沒有任何參數則顯示乾淨的 URL
    const queryString = new URLSearchParams(q).toString();
    router.push(queryString ? `?${queryString}` : router.pathname);
  };

  useEffect(() => {
    if (router.isReady) {
      // 處理地點
      const locParam = router.query.loc;
      if (locParam) {
        setSelectedLoc(Number(locParam));
      } else {
        setSelectedLoc('');
      }

      // 處理日期
      const dateParam = router.query.date;
      if (dateParam) {
        setSelectedDate(new Date(dateParam));
      } else {
        setSelectedDate('');
      }

      // 處理課程類別
      const typeParam = router.query.type;
      if (typeParam) {
        setSelectedType(Number(typeParam));
      } else {
        setSelectedType('');
      }

      // 處理排序
      const sortParam = router.query.sort;
      if (sortParam) {
        setSelectedSort(sortParam);
      } else {
        setSelectedSort('');
      }

      // 處理證照單位（多選）
      const deptParam = router.query.dept;
      if (deptParam) {
        // 如果是字串，轉為陣列
        const deptArray =
          typeof deptParam === 'string' ? [deptParam] : deptParam;
        setSelectedDept(deptArray);
      } else {
        setSelectedDept([]);
      }

      // 處理經驗值（單選）
      const expParam = router.query.exp;
      if (expParam) {
        setSelectedExp([expParam]); // 因為組件需要陣列，所以包成陣列
      } else {
        setSelectedExp([]);
      }

      // 處理性別（單選）
      const genderParam = router.query.gender;
      if (genderParam) {
        setSelectedGender([genderParam]);
      } else {
        setSelectedGender([]);
      }
    }
  }, [router.isReady, router.query]);

  // fetch 資料
  /*
  useEffect(() => {
    // 確保 router 已經準備好
    if (!router.isReady) return;

    const fetchLessons = async () => {
      try {
        let url = LESSON_LIST;

        // 處理查詢參數
        const query = { ...router.query };

        // 特別處理 dept 參數（因為是陣列）
        if (query.dept && Array.isArray(selectedDept)) {
          // 確保 dept 參數正確格式化
          delete query.dept;
          selectedDept.forEach((dept, index) => {
            query[`dept[${index}]`] = dept;
          });
        }

        // 如果有查詢參數，添加到 URL
        if (Object.keys(query).length > 0) {
          const params = new URLSearchParams();

          // 處理每個查詢參數
          Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
              if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, v));
              } else {
                params.append(key, value);
              }
            }
          });

          const queryString = params.toString();
          if (queryString) {
            url += `?${queryString}`;
          }
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setLessons(data.rows);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessons();
  }, [router.isReady, router.query, selectedDept]); // 添加 selectedDept 作為依賴
  */

  // 更新 fetch 邏輯
  // useEffect(() => {
  //   if (!router.isReady) return;

  //   const fetchLessons = async () => {
  //     try {
  //       // 取得所有查詢參數
  //       const query = { ...router.query };
  //       const page = query.page || 1;

  //       // 構建 URL
  //       let url = `${LESSON_LIST}?page=${page}`;

  //       // 添加其他查詢參數
  //       if (query.type) url += `&type=${query.type}`;
  //       if (query.loc) url += `&loc=${query.loc}`;
  //       if (query.date) url += `&date=${query.date}`;
  //       if (query.dept) {
  //         const deptParams = Array.isArray(query.dept)
  //           ? query.dept.join(',')
  //           : query.dept;
  //         url += `&dept=${deptParams}`;
  //       }
  //       if (query.exp) url += `&exp=${query.exp}`;
  //       if (query.gender) url += `&gender=${query.gender}`;

  //       const response = await fetch(url);

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setLessons(data.rows);
  //       setTotalPages(data.totalPages);
  //       setCurrentPage(Number(page));
  //     } catch (error) {
  //       console.error('Error fetching lessons:', error);
  //     }
  //   };

  //   fetchLessons();
  // }, [router.isReady, router.query]);

  // 更新 fetch 邏輯
  useEffect(() => {
    if (!router.isReady) return;

    const fetchLessons = async () => {
      try {
        // 取得所有查詢參數
        const query = { ...router.query };
        const page = query.page || 1;

        // 構建 URL
        let url = new URL(LESSON_LIST, window.location.origin);
        url.searchParams.set('page', page);

        // 添加其他查詢參數
        if (query.loc) url.searchParams.set('loc', query.loc);
        if (query.date) url.searchParams.set('date', query.date);
        if (query.type) url.searchParams.set('type', query.type);
        if (query.sort) url.searchParams.set('sort', query.sort);
        if (query.dept) {
          const deptParams = Array.isArray(query.dept)
            ? query.dept
            : [query.dept];
          deptParams.forEach((dept) => url.searchParams.append('dept', dept));
        }
        if (query.exp) url.searchParams.set('exp', query.exp);
        if (query.gender) url.searchParams.set('gender', query.gender);

        const response = await fetch(url.toString());

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.rows?.length > 0) {
          setLessons(data.rows);
          setTotalPages(data.totalPages);
          setCurrentPage(Number(page));
        } else {
          setLessons([]);
          setTotalPages(1);
          setCurrentPage(1);
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setLessons([]);
        setTotalPages(1);
        setCurrentPage(1);
      }
    };

    fetchLessons();
  }, [router.isReady, router.query]);

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
                    : ''
                }
                onChange={handleLocChange}
              />
              <DatePicker
                selectedDate={selectedDate}
                setSelectedDate={handleDateChange}
              />
              <SelectEllipse
                options={typeOptions.map((option) => option.label)}
                option={
                  selectedType
                    ? typeOptions.find(
                        (option) => option.value === selectedType
                      )?.label
                    : ''
                }
                onChange={handleTypeChange}
              />
            </div>
            <Button onClick={handleClear}>清除搜尋</Button>
          </div>
          <div className={styles.main}>
            <div className={styles.sidebar}>
              <div className={styles.filter}>
                <h4>排序</h4>
                <SelectRect
                  options={sortOptions.map((option) => option.label)}
                  option={
                    selectedSort
                      ? sortOptions.find(
                          (option) => option.value === selectedSort
                        )?.label
                      : ''
                  }
                  onChange={handleSortChange}
                />
              </div>
              <div className={styles.filter}>
                <h4>篩選</h4>
                <h6>證照單位</h6>
                <div className={styles.options}>
                  <InputCheck
                    name="dept"
                    options={deptOptions}
                    selectedValues={selectedDept}
                    onChange={handleDeptChange}
                  />
                </div>
                <h6>教練經驗</h6>
                <div className={styles.options}>
                  <InputCheck
                    name="exp"
                    options={expOptions}
                    selectedValues={selectedExp}
                    onChange={handleExpChange}
                  />
                </div>
                <h6>教練性別</h6>
                <div className={styles.options}>
                  <InputCheck
                    name="gender"
                    options={genderOptions}
                    selectedValues={selectedGender}
                    onChange={handleGenderChange}
                  />
                </div>
              </div>
              <Button onClick={handleClear2}>清除篩選</Button>
            </div>
            <div className={styles.list}>
              {/* <h4>
                搜尋&nbsp;&quot;
                {`${
                  selectedLoc
                    ? locOptions.find((option) => option.value === selectedLoc)
                        ?.label
                    : ''
                }
                /${selectedDate ? selectedDate : ''}/
                  ${
                    selectedType
                      ? typeOptions.find(
                          (option) => option.value === selectedType
                        )?.label
                      : ''
                  }`}
                &quot;&nbsp;結果
              </h4> */}
              {lessons.length > 0 ? (
                <>
                  {lessons.map((lesson) => (
                    <Card key={lesson.round_id} lesson={lesson} />
                  ))}
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <h4 style={{ textAlign: 'center' }}>無相符搜尋結果</h4>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
