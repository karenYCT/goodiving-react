import { useState } from 'react';
import styles from './index.module.css';
import { FaTh, FaList } from 'react-icons/fa';
import Card1 from '@/components/eden/card1';
import Card2 from '@/components/eden/card2';
import SelectRect from '@/components/dropdown/select-rect';
import Searchsm from '@/components/search/search-sm';
export default function List() {
  const [displayCard, setDisplayCard] = useState('card');
  const [sortBy, setSortBy] = useState('最新商品');
  const [searchValue, setSearchValue] = useState('');

  const categoryList = [
    '商品類別1',
    '商品類別2',
    '商品類別3',
    '商品類別4',
    '商品類別5',
  ];

  const sortByOptions = ['最新商品', '價格由低到高', '價格由高到低'];

  const onClick = () => {
    console.log('送出搜尋');
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h4>商品搜尋</h4>
          <Searchsm
            inputValue={searchValue}
            setInputValue={setSearchValue}
            onClick={onClick}
          />
          <h4>商品類型</h4>
          <div className={styles['category-list']}>
            {categoryList.map((category) => (
              <button key={category} className={styles['category-item']}>
                {category}
              </button>
            ))}
          </div>

          <h4>價格搜尋</h4>
          <input
            type="text"
            placeholder="最小金額"
            className={`${styles.input} ${styles['price-range']}`}
          />
          <input
            type="text"
            placeholder="最大金額"
            className={`${styles.input} ${styles['price-range']}`}
          />
          <h4>排序</h4>
          <SelectRect
            options={sortByOptions}
            onChange={setSortBy}
            option={sortBy}
          />
        </div>

        <div className={styles.list}>
          <div className={styles['header-container']}>
            {searchValue !== '' && (
              <h4>正在搜尋的結果： &quot;{searchValue}&quot;</h4>
            )}
            <div className={styles['btn-container']}>
              <button onClick={() => setDisplayCard('card')}>
                <FaTh />
              </button>
              <button onClick={() => setDisplayCard('row')}>
                <FaList />
              </button>
            </div>
          </div>
          {displayCard === 'card' ? (
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
