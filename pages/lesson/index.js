import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import styles from './index.module.css';
import SelectEllipse from '@/components/dropdown/select-ellipse';
import SelectEllipse2 from '@/components/dropdown/select-ellipse2';
import DatePicker from '@/components/dropdown/date-picker';
import Button from '@/components/buttons/btn-icon-right';
import SelectRect from '@/components/dropdown/select-rect';
import Checkbox from '@/components/inputs/input-check';
import Card from '@/components/tzu/card-list';
import Pagination from '@/components/pagination';

export default function Lesson() {
  const [isLocSelected, setIsLocSelected] = useState('');
  const [isDateSelected, setIsDateSelected] = useState('');
  const [isTypeSelected, setIsTypeSelected] = useState('');
  const [sortBy, setSortBy] = useState('排序方式');
  const [selectedDept, setSelectedDept] = useState([]);

  const locOptions = [
    '選擇地點1',
    '選擇地點2',
    '選擇地點3',
    '選擇地點4',
    '選擇地點5',
  ];
  const typeOptions = ['選擇類別1', '選擇類別2'];
  const sortByOptions = [
    '開課時間↓',
    '開課時間↑',
    '教練評價↓',
    '教練評價↑',
    '價格↓',
    '價格↑',
  ];
  const depts = ['PADI', 'SSI', 'CMAS', 'NAUI'];

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <div className={styles.searchbar}>
            <div className={styles.search}>
              <SelectEllipse2
                options={locOptions}
                onChange={setIsLocSelected}
                option={isLocSelected}
              />
              <DatePicker
                selectedDate={isDateSelected}
                setSelectedDate={setIsDateSelected}
              />
              <SelectEllipse
                options={typeOptions}
                onChange={setIsTypeSelected}
                option={isTypeSelected}
              />
            </div>
            <Button>重新搜尋</Button>
          </div>
          <div className={styles.main}>
            <div className={styles.sidebar}>
              <div className={styles.filter}>
                <h4>排序</h4>
                <SelectRect
                  options={sortByOptions}
                  onChange={setSortBy}
                  option={sortBy}
                />
                <h4>篩選</h4>
                <h6>證照單位</h6>
                <Checkbox
                  name="dept"
                  options={depts}
                  selectedValues={selectedDept}
                  onChange={setSelectedDept}
                />
                <h6>教練經驗</h6>
                <h6>教練性別</h6>
              </div>
            </div>
            <div className={styles.list}>
              <h4>
                搜尋&nbsp;
                {isLocSelected || isDateSelected || isTypeSelected}
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
