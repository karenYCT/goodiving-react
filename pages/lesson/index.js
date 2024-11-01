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
import CheckoutFlow from '@/components/eden/checkout-flow';

export default function Lesson() {
  const [sortBy, setSortBy] = useState('開課時間↓');

  const sortByOptions = ['開課時間↓','開課時間↑','教練評價↓','教練評價↑', '價格↓', '價格↑'];


  return (
    <>
      <Layout>
        <div className={styles.container}>
          <div className={styles.searchbar}>
            <div className={styles.search}>
            <SelectEllipse2 />
            <DatePicker />
            <SelectEllipse />
            </div>
            <Button>重新搜尋</Button>
          </div>
          <div className={styles.main}>
            <div className={styles.sidebar}>
              <h4>排序</h4>
              <SelectRect
                options={sortByOptions}
                onChange={setSortBy}
                option={sortBy}
              />
              <h4>篩選</h4>
              <h6>證照單位</h6>
              <Checkbox />
              <h6>教練經驗</h6>
              <h6>教練性別</h6>
            </div>
            <div className={styles.list}>
              <Card />
              <CheckoutFlow />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
