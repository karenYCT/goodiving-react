import { useState } from 'react';
import styles from './index.module.css';
import Card1 from '@/components/eden/card1';
import Card2 from '@/components/eden/card2';

export default function List() {
  const [displayCard, setDisplayCard] = useState(true);

  const categoryList = [
    '商品類別1',
    '商品類別2',
    '商品類別3',
    '商品類別4',
    '商品類別5',
  ];

  const brandList = ['品牌1', '品牌2', '品牌3', '品牌4', '品牌5'];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h4>商品類型</h4>
          <div className={styles['category-list']}>
            {categoryList.map((category) => (
              <button key={category} className={styles['category-item']}>
                {category}
              </button>
            ))}
          </div>
          <h4>品牌</h4>
          <div className={styles['brand-list']}>
            {brandList.map((brand) => (
              <div key={brand} className={styles['brand-item']}>
                <input type="checkbox" id={brand} />
                <label htmlFor={brand}>{brand}</label>
              </div>
            ))}
          </div>
          <h4>價格搜尋</h4>
          <input
            type="text"
            placeholder="最小金額"
            className={styles['price-range']}
          />
          <input
            type="text"
            placeholder="最大金額"
            className={styles['price-range']}
          />
        </div>

        <div className={styles.list}>
          <button onClick={() => setDisplayCard(!displayCard)}>點擊按鈕</button>
          {displayCard ? (
            <div className={styles['display-card']}>
              <Card1 />
              <Card1 />
              <Card1 />
              <Card1 />
              <Card1 />
              <Card1 />
            </div>
          ) : (
            <div className={styles['display-row']}>
              <Card2 />
              <Card2 />
              <Card2 />
              <Card2 />
              <Card2 />
              <Card2 />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
